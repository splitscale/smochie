import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';

interface ProjectRepository {
  getProjects(): string[];
}

function ProjectRepositoryImpl(path: string): ProjectRepository {
  return {
    getProjects: () => ['Project 1', 'Project 2'],
  };
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

  container
    .bind<ProjectRepository>(TYPES.ProjectRepository)
    .toDynamicValue(() => {
      return ProjectRepositoryImpl('path');
    });

  const projectService = container.resolve<ProjectService>(ProjectService);

  console.log(projectService.getProjects()); // Output: ["Project 1", "Project 2"]
}
