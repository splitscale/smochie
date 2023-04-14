import fs from 'fs/promises';
import { parse } from 'yaml';
export class ProjectRepositoryImpl {
    constructor(filePath) {
        this.filePath = filePath;
    }
    async createProject(project) {
        const projects = await this.getAllProjects();
        const existingProject = projects.find((p) => p.name === project.name);
        if (existingProject) {
            throw new Error(`A project with the name '${project.name}' already exists`);
        }
        projects.push(project);
        await this.saveProjects(projects);
        return project;
    }
    async getProjectByName(name) {
        const projects = await this.getAllProjects();
        return projects.find((p) => p.name === name);
    }
    async getAllProjects() {
        try {
            const data = await fs.readFile(this.filePath);
            return parse(data.toString());
        }
        catch (err) {
            console.error(`Failed to load projects: ${err}`);
            process.exit(1);
        }
    }
    async updateProjectByName(name, updates) {
        const projects = await this.getAllProjects();
        const projectIndex = projects.findIndex((p) => p.name === name);
        if (projectIndex === -1) {
            return undefined;
        }
        const updatedProject = Object.assign(Object.assign({}, projects[projectIndex]), updates);
        projects[projectIndex] = updatedProject;
        await this.saveProjects(projects);
        return updatedProject;
    }
    async deleteProjectByName(name) {
        const projects = await this.getAllProjects();
        const projectIndex = projects.findIndex((p) => p.name === name);
        if (projectIndex === -1) {
            return false;
        }
        projects.splice(projectIndex, 1);
        await this.saveProjects(projects);
        return true;
    }
    async saveProjects(projects) {
        const data = projects.map((p) => JSON.stringify(p)).join('\n');
        await fs.writeFile(this.filePath, data);
    }
}
