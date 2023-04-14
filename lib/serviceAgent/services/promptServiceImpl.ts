import inquirer from 'inquirer';
import { Project } from '../../core/project/project.js';
import { PromptService } from '../../core/services/promptService.js';

export class PromptServiceImpl implements PromptService {
  async selectProjects(projects: Project[]): Promise<Project[]> {
    const choices = projects.map((project) => ({
      name: project.name,
      value: project,
    }));
    const { selectedProjects } = await inquirer.prompt([
      {
        type: 'checkbox',
        message: 'Select projects to clone:',
        name: 'selectedProjects',
        choices,
      },
    ]);
    return selectedProjects;
  }

  async confirmSelection(message: string): Promise<boolean> {
    const { confirmed } = await inquirer.prompt([
      {
        type: 'confirm',
        message,
        name: 'confirmed',
      },
    ]);
    return confirmed;
  }
}
