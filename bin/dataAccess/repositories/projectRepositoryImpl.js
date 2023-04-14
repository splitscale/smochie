import fs from 'fs/promises';
import { parse, stringify } from 'yaml';
export class ProjectRepositoryImpl {
    constructor(filePath) {
        this.filePath = filePath;
    }
    assertProjectDoesNotExist(name, projects) {
        const project = projects.find((project) => project.name === name);
        if (project) {
            throw `A project with the name '${name}' already exists`;
        }
    }
    async createProject(project) {
        const projects = await this.getAllProjects();
        this.assertProjectDoesNotExist(project.name, projects);
        projects.push(project);
        await this.saveProjects(projects);
    }
    async getProjectByName(name) {
        const projects = await this.getAllProjects();
        const project = projects.find((p) => p.name === name);
        if (project === undefined) {
            throw new Error(`Project with name ${name} not found`);
        }
        return project;
    }
    async getAllProjects() {
        let data;
        try {
            data = await fs.readFile(this.filePath);
        }
        catch (error) {
            console.error(`Failed to read projects: ${error}`);
            throw error;
        }
        const parsed = parse(data.toString());
        if (parsed === null || parsed === undefined) {
            throw new Error('Projects is empty');
        }
        return parsed;
    }
    async updateProjectByName(name, updatedProject) {
        const projects = await this.getAllProjects();
        const index = projects.findIndex((p) => p.name === name);
        if (index === -1) {
            throw new Error(`Project with name ${name} not found`);
        }
        projects[index] = updatedProject;
        await this.saveProjects(projects);
    }
    async deleteProjectByName(name) {
        const projects = await this.getAllProjects();
        const index = projects.findIndex((p) => p.name === name);
        if (index === -1) {
            throw new Error(`Project with name ${name} not found`);
        }
        projects.splice(index, 1);
        await this.saveProjects(projects);
    }
    async saveProjects(projects) {
        const data = stringify(projects);
        await fs.writeFile(this.filePath, data);
    }
}
