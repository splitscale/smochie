import { CreateProjectInteractor } from '../../../project/create/createProjectInteractor.js';
import { PromptService } from '../../../services/promptService.js';
import { blueLogger } from '../../../util/blueLogger.js';
import { errorLogger } from '../../../util/errorLogger.js';
import { parseError } from '../../../util/parseError.js';
import { plusSignsLog } from '../../../util/plusSignsLog.js';
import { Workflow } from '../../workflow.js';

export class CreateProjectWorkflow implements Workflow {
  constructor(
    private readonly promptService: PromptService,
    private readonly interactor: CreateProjectInteractor
  ) {}

  async start(): Promise<void> {
    try {
      const project = await this.promptService.createProject();

      blueLogger(`\n${project.toYamlPreview()}`);

      const confirmed = await this.promptService.confirmSelection(
        `Create project '${project.name}' with ${project.repositories.length} repositories?`
      );

      if (!confirmed) {
        console.log('Aborting project creation process.');
        return;
      }

      await this.interactor.createProject(project);
      plusSignsLog(1, `'${project.name}' created`);
    } catch (error) {
      errorLogger('Failed to create project: ' + parseError(error));
    }
  }
}
