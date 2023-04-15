import { plusSignsLog } from '../../../util/plusSignsLog.js';
export class CreateProjectWorkflow {
    constructor(promptService, interactor) {
        this.promptService = promptService;
        this.interactor = interactor;
    }
    async createProject() {
        const project = await this.promptService.createProject();
        console.log('\x1b[34m%s\x1b[0m', `\n${project.toYamlPreview()}`);
        const confirmed = await this.promptService.confirmSelection(`Create project '${project.name}' with ${project.repositories.length} repositories?`);
        if (confirmed) {
            await this.interactor.createProject(project);
            plusSignsLog(1, `'${project.name}' created`);
        }
        else {
            console.log('Project creation cancelled.');
        }
    }
}
