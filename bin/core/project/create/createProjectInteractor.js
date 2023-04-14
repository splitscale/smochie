export class CreateProjectInteractor {
    constructor(repository) {
        this.repository = repository;
    }
    createProject(project) {
        return this.repository.createProject(project);
    }
}
