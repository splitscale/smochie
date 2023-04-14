import { ProjectRepository } from '../../repositories/projectRepository.js';
import { Project } from '../project.js';

export class CreateProjectInteractor {
  private repository: ProjectRepository;

  constructor(repository: ProjectRepository) {
    this.repository = repository;
  }

  createProject(project: Project) {
    return this.repository.createProject(project);
  }
}
