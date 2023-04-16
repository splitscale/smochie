import { inject, injectable } from 'inversify';
import { ProjectRepository } from '../../core/repositories/projectRepository.js';
import { RepositoryTypes } from '../types/repositoryTypes.js';

@injectable()
export class ProjectRepositoryEntity {
  private repository: ProjectRepository;

  constructor(
    @inject(RepositoryTypes.ProjectRepository) repository: ProjectRepository
  ) {
    this.repository = repository;
  }
}
