import { ProjectRepository } from '../../../repositories/projectRepository.js';
import { PromptService } from '../../../services/promptService.js';

export class CreateProject {
  constructor(
    private readonly promptService: PromptService,
    private readonly projectRepository: ProjectRepository
  ) {}

  async createProject(): Promise<void> {
    const project = await this.promptService.createProject();
    const confirmed = await this.promptService.confirmSelection(
      `Create project '${project.name}' with ${project.repositories.length} repositories?`
    );

    if (confirmed) {
      await this.projectRepository.createProject(project);
      console.log(`Project '${project.name}' created successfully.`);
    } else {
      console.log('Project creation cancelled.');
    }
  }
}
