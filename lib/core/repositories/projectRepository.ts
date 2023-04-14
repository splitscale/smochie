import { Project } from '../project/project.js';

export interface ProjectRepository {
  createProject(project: Project): Promise<Project>;
  getProjectByName(name: string): Promise<Project | undefined>;
  getAllProjects(): Promise<Project[]>;
  updateProjectByName(
    name: string,
    updates: Partial<Project>
  ): Promise<Project | undefined>;
  deleteProjectByName(name: string): Promise<boolean>;
}
