import { Project } from '../project/project.js';

export interface PromptService {
  selectProjects(projects: Project[]): Promise<Project[]>;
  confirmSelection(message: string): Promise<boolean>;
}
