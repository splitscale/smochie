import fs from 'fs/promises';
import { parse, stringify } from 'yaml';
import { Project } from '../../core/project/project.js';
import { ProjectRepository } from '../../core/repositories/projectRepository.js';

export class ProjectRepositoryImpl implements ProjectRepository {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async createProject(project: Project): Promise<void> {
    const projects = await this.getAllProjects();
    const existingProject = projects.find((p) => p.name === project.name);
    if (existingProject) {
      throw new Error(
        `A project with the name '${project.name}' already exists`
      );
    }
    projects.push(project);
    await this.saveProjects(projects);
  }

  async getProjectByName(name: string): Promise<Project> {
    const projects = await this.readProjects();
    const project = projects.find((p) => p.name === name);

    if (project === undefined) {
      throw new Error(`Project with name ${name} not found`);
    }

    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    const projects = await this.readProjects();
    return projects;
  }

  async updateProjectByName(
    name: string,
    updatedProject: Project
  ): Promise<void> {
    const projects = await this.readProjects();

    const index = projects.findIndex((p) => p.name === name);

    if (index === -1) {
      throw new Error(`Project with name ${name} not found`);
    }

    projects[index] = updatedProject;
    await this.saveProjects(projects);
  }

  async deleteProjectByName(name: string): Promise<void> {
    const projects = await this.readProjects();
    const index = projects.findIndex((p) => p.name === name);

    if (index === -1) {
      throw new Error(`Project with name ${name} not found`);
    }

    projects.splice(index, 1);
    await this.saveProjects(projects);
  }

  private async readProjects(): Promise<Project[]> {
    try {
      const data = await fs.readFile(this.filePath);

      console.log(data.toJSON());

      return parse(data.toString()) as Project[];
    } catch (err) {
      console.error(`Failed to load projects: ${err}`);
      process.exit(1);
    }
  }

  private async saveProjects(projects: Project[]): Promise<void> {
    for (const project of projects) {
      const data = stringify(project);

      console.log('Added: ' + data);
      await fs.writeFile(this.filePath, data);
    }
  }
}
