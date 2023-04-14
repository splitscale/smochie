import fs from 'fs/promises';
import { parse } from 'yaml';
import { Project } from '../../core/project/project.js';
import { ProjectRepository } from '../../core/repositories/projectRepository.js';

export class ProjectRepositoryImpl implements ProjectRepository {
  private filePath: string;

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async createProject(project: Project): Promise<Project> {
    const projects = await this.getAllProjects();
    const existingProject = projects.find((p) => p.name === project.name);
    if (existingProject) {
      throw new Error(
        `A project with the name '${project.name}' already exists`
      );
    }
    projects.push(project);
    await this.saveProjects(projects);
    return project;
  }

  async getProjectByName(name: string): Promise<Project | undefined> {
    const projects = await this.getAllProjects();
    return projects.find((p) => p.name === name);
  }

  async getAllProjects(): Promise<Project[]> {
    try {
      const data = await fs.readFile(this.filePath);
      return parse(data.toString()) as Project[];
    } catch (err) {
      console.error(`Failed to load projects: ${err}`);
      process.exit(1);
    }
  }

  async updateProjectByName(
    name: string,
    updates: Partial<Project>
  ): Promise<Project | undefined> {
    const projects = await this.getAllProjects();
    const projectIndex = projects.findIndex((p) => p.name === name);
    if (projectIndex === -1) {
      return undefined;
    }
    const updatedProject = { ...projects[projectIndex], ...updates };
    projects[projectIndex] = updatedProject;
    await this.saveProjects(projects);
    return updatedProject;
  }

  async deleteProjectByName(name: string): Promise<boolean> {
    const projects = await this.getAllProjects();
    const projectIndex = projects.findIndex((p) => p.name === name);
    if (projectIndex === -1) {
      return false;
    }
    projects.splice(projectIndex, 1);
    await this.saveProjects(projects);
    return true;
  }

  private async saveProjects(projects: Project[]): Promise<void> {
    const data = projects.map((p) => JSON.stringify(p)).join('\n');
    await fs.writeFile(this.filePath, data);
  }
}
