export class CreateProject {
    constructor(promptService, projectRepository) {
        this.promptService = promptService;
        this.projectRepository = projectRepository;
    }
    async createProject() {
        const project = await this.promptService.createProject();
        const confirmed = await this.promptService.confirmSelection(`Create project '${project.name}' with ${project.repositories.length} repositories?`);
        if (confirmed) {
            await this.projectRepository.createProject(project);
            console.log(`Project '${project.name}' created successfully.`);
        }
        else {
            console.log('Project creation cancelled.');
        }
    }
}
