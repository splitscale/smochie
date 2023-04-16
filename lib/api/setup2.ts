import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';

interface ProjectRepository {
  getProjects(): string[];
}

class ProjectRepositoryImpl implements ProjectRepository {
  constructor(private path: string) {}

  public getProjects(): string[] {
    return ['Project 1', 'Project 2', 'Project 3'];
  }
}

const TYPES = {
  ProjectRepository: Symbol.for('ProjectRepository'),
};

@injectable()
export class ProjectService {
  private _projectRepository: ProjectRepository;

  public constructor(
    @inject(TYPES.ProjectRepository) projectRepository: ProjectRepository
  ) {
    this._projectRepository = projectRepository;
  }

  public getProjects(): string[] {
    return this._projectRepository.getProjects();
  }
}

export function trySetup2() {
  const container = new Container();
  const config = new ProjectServiceConfig();

  container
    .bind<ProjectRepository>(TYPES.ProjectRepository)
    .toDynamicValue(() => config.getProjectRepository());

  const projectService = container.resolve<ProjectService>(ProjectService);

  console.log(projectService.getProjects()); // Output: ["Project 1", "Project 2"]
}

class ProjectServiceConfig {
  getProjectRepository(): ProjectRepository {
    return new ProjectRepositoryImpl('path');
  }
}
