import fs from 'fs/promises';
import { parse, stringify } from 'yaml';
import { Project } from '../../core/project/project.js';
import { ProjectRepository } from '../../core/repositories/projectRepository.js';
import path from 'path';
import { yellowLogger } from '../../core/util/yellowLogger.js';

export class ProjectRepositoryImpl implements ProjectRepository {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }
  private assertProjectDoesNotExist(name: string, projects: Project[]): void {
    const project = projects.find((project) => project.name === name);

    if (project) {
      throw new Error(`A project with the name '${name}' already exists`);
    }
  }

  async createProject(project: Project): Promise<void> {
    let projects: Project[] = [];

    try {
      projects = await this.getAllProjects();
      this.assertProjectDoesNotExist(project.name, projects);
    } catch (error) {
      yellowLogger('No file found, skipping assertion...');
    }

    projects.push(project);
    await this.saveProjects(projects);
  }

  async getProjectByName(name: string): Promise<Project> {
    const projects = await this.getAllProjects();

    const project = projects.find((p) => p.name === name);

    if (project === undefined) {
      throw new Error(`Project with name ${name} not found`);
    }

    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    let data: Buffer;

    try {
      data = await fs.readFile(path.dirname(this.filePath));
    } catch (error) {
      console.error(`Failed to read projects: ${error}`);
      throw error;
    }

    const parsed = parse(data.toString());

    if (parsed === null || parsed === undefined) {
      throw new Error('Projects is empty');
    }

    return parsed as Project[];
  }

  async updateProjectByName(
    name: string,
    updatedProject: Project
  ): Promise<void> {
    const projects = await this.getAllProjects();

    const index = projects.findIndex((p) => p.name === name);

    if (index === -1) {
      throw new Error(`Project with name ${name} not found`);
    }

    projects[index] = updatedProject;
    await this.saveProjects(projects);
  }

  async deleteProjectByName(name: string): Promise<void> {
    const projects = await this.getAllProjects();
    const index = projects.findIndex((p) => p.name === name);

    if (index === -1) {
      throw new Error(`Project with name ${name} not found`);
    }

    projects.splice(index, 1);
    await this.saveProjects(projects);
  }

  private async saveProjects(projects: Project[]): Promise<void> {
    const data = stringify(projects);
    await fs.mkdir(path.dirname(this.filePath), { recursive: true });
    await fs.writeFile(this.filePath, data);
  }
}
