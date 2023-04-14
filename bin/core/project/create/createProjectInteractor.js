export class CreateProjectConfigInteractor {
    constructor(repository) {
        this.repository = repository;
    }
    createProjectsConfig(project) {
        return this.repository.createProject(project);
    }
}
