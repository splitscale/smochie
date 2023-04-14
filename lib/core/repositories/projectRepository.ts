import { Project } from '../project/project.js';

export interface ProjectRepository {
  createProject(project: Project): Promise<void>;
  getProjectByName(name: string): Promise<Project>;
  getAllProjects(): Promise<Project[]>;
  updateProjectByName(name: string, updates: Partial<Project>): Promise<void>;
  deleteProjectByName(name: string): Promise<void>;
}
