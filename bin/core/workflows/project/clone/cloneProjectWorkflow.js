import { FilepathVariables } from '../../../../api/variables/filepathVariables.js';
import { errorLogger } from '../../../util/errorLogger.js';
import { parseError } from '../../../util/parseError.js';
import { yellowLogger } from '../../../util/yellowLogger.js';
export class CloneProjectWorkflow {
    constructor(projectRepository, gitService, promptService, outputDirectory) {
        this.projectRepository = projectRepository;
        this.gitService = gitService;
        this.promptService = promptService;
        this.outputDirectory = outputDirectory;
    }
    async start() {
        let selectedProjects = [];
        try {
            const allProjects = await this.projectRepository.getAllProjects();
            selectedProjects = await this.promptService.selectProjects(allProjects);
            if (selectedProjects.length === 0) {
                console.log('Aborting cloning process: No projects selected.');
                return;
            }
            const confirmed = await this.promptService.confirmSelection(`Are you sure you want to clone ${selectedProjects.length} projects and their dependencies?`);
            if (!confirmed) {
                console.log('Aborting cloning process.');
                return;
            }
            yellowLogger(`Cloning project/s to: ${FilepathVariables.cloneOutputDir}`);
            await this.gitService.cloneProjects(selectedProjects, this.outputDirectory);
            console.log('Cloning completed.');
        }
        catch (error) {
            errorLogger('Failed to clone projects: ' + parseError(error));
            this.cloneProjectsUsingCli(selectedProjects);
        }
    }
    cloneProjectsUsingCli(selectedProjects) {
        try {
            console.log('Trying to clone projects using the Git CLI...');
            this.gitService.cloneProjectsUsingCli(selectedProjects, this.outputDirectory);
            console.log('Cloning completed using the Git CLI.');
        }
        catch (error) {
            errorLogger('Failed to clone projects using Git CLI: ' + parseError(error));
        }
    }
}
