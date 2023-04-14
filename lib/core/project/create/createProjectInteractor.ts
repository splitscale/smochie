import { ProjectRepository } from '../../repositories/projectRepository.js';
import { Project } from '../project.js';

export class CreateProjectConfigInteractor {
  private repository: ProjectRepository;

  constructor(repository: ProjectRepository) {
    this.repository = repository;
  }

  createProjectsConfig(project: Project) {
    return this.repository.createProject(project);
  }
}
