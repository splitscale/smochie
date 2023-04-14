import { CreateProjectInteractor } from '../../../project/create/createProjectInteractor.js';
import { PromptService } from '../../../services/promptService.js';
import { gitChangeLogger } from '../../../util/gitChangeLogger.js';
import { plusSignsLog } from '../../../util/plusSignsLog.js';

export class CreateProject {
  constructor(
    private readonly promptService: PromptService,
    private readonly interactor: CreateProjectInteractor
  ) {}

  async createProject(): Promise<void> {
    const project = await this.promptService.createProject();

    console.log('\x1b[34m%s\x1b[0m', `\n${project.toYamlPreview()}`);

    const confirmed = await this.promptService.confirmSelection(
      `Create project '${project.name}' with ${project.repositories.length} repositories?`
    );

    if (confirmed) {
      await this.interactor.createProject(project);

      plusSignsLog(1, `Project '${project.name}' created successfully`);
    } else {
      console.log('Project creation cancelled.');
    }
  }
}
