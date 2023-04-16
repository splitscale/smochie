import { FilepathVariables } from '../../../../api/variables/filepathVariables.js';
import { Project } from '../../../project/project.js';
import { ProjectRepository } from '../../../repositories/projectRepository.js';
import { GitService } from '../../../services/gitService.js';
import { PromptService } from '../../../services/promptService.js';
import { errorLogger } from '../../../util/errorLogger.js';
import { parseError } from '../../../util/parseError.js';
import { yellowLogger } from '../../../util/yellowLogger.js';
import { Workflow } from '../../workflow.js';

export class CloneProjectWorkflow implements Workflow {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly gitService: GitService,
    private readonly promptService: PromptService,
    private readonly outputDirectory: string
  ) {}

  async start(): Promise<void> {
    let selectedProjects: Project[] = [];
    let allProjects: Project[] = [];

    try {
      allProjects = await this.projectRepository.getAllProjects();
    } catch (error) {
      errorLogger('Aborting cloning process...');
      yellowLogger('PLease create a project first!\n');

      yellowLogger('Try running the following command\n');
      yellowLogger(`smochie create project\n`);
      process.exit(0);
    }

    try {
      selectedProjects = await this.promptService.selectProjects(allProjects);

      if (selectedProjects.length === 0) {
        console.log('Aborting cloning process: No projects selected.');
        return;
      }

      const confirmed = await this.promptService.confirmSelection(
        `Are you sure you want to clone ${selectedProjects.length} projects and their dependencies?`
      );

      if (!confirmed) {
        console.log('Aborting cloning process.');
        return;
      }

      yellowLogger(`Cloning project/s to: ${FilepathVariables.cloneOutputDir}`);

      await this.gitService.cloneProjects(
        selectedProjects,
        this.outputDirectory
      );

      console.log('Cloning completed.');
    } catch (error) {
      errorLogger('Failed to clone projects: ' + parseError(error));

      this.cloneProjectsUsingCli(selectedProjects);
    }
  }

  private cloneProjectsUsingCli(selectedProjects: Project[]) {
    try {
      console.log('Trying to clone projects using the Git CLI...');

      this.gitService.cloneProjectsUsingCli(
        selectedProjects,
        this.outputDirectory
      );

      console.log('Cloning completed using the Git CLI.');
    } catch (error) {
      errorLogger(
        'Failed to clone projects using Git CLI: ' + parseError(error)
      );
    }
  }
}
