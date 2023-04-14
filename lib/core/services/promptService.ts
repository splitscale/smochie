import { Project } from '../project/project.js';

export interface PromptService {
  /**
   * Prompts the user to select the projects they want to clone.
   * @param projects - The list of available projects.
   * @returns A promise that resolves to the list of selected projects.
   */
  selectProjects(projects: Project[]): Promise<Project[]>;

  /**
   * Prompts the user to confirm a selection.
   * @param message - The message to display in the confirmation prompt.
   * @returns A promise that resolves to `true` if the user confirms the selection, and `false` otherwise.
   */
  confirmSelection(message: string): Promise<boolean>;

  /**
   * Prompts the user to create a new project.
   * @returns A promise that resolves to the new project.
   */
  createProject(): Promise<Project>;
}
