// import 'reflect-metadata';
// import { Container, injectable } from 'inversify';
// import { ProjectRepositoryImpl } from '../dataAccess/repositories/projectRepositoryImpl.js';
// import { PromptServiceImpl } from '../serviceAgent/services/promptServiceImpl.js';
// import { GitServiceImpl } from '../serviceAgent/services/gitServiceImpl.js';
// import { CreateProjectInteractor } from '../core/project/create/createProjectInteractor.js';
// import { CloneProjectWorkflow } from '../core/workflows/project/clone/cloneProjectWorkflow.js';
// import { CreateProjectWorkflow } from '../core/workflows/project/create/createProjectWorkflow.js';

// @injectable()
// export class CoreApi {
//   private projectRepository: ProjectRepositoryImpl;
//   private promptService: PromptServiceImpl;
//   private gitService: GitServiceImpl;
//   private createProject: CreateProjectInteractor;
//   private container: Container;

//   constructor(container: Container) {
//     this.container = container;
//     this.projectRepository = this.container.get(ProjectRepositoryImpl);
//     this.promptService = this.container.get(PromptServiceImpl);
//     this.gitService = this.container.get(GitServiceImpl);
//     this.createProject = this.container.get(CreateProjectInteractor);
//   }

//   async cloneSelectedProjects(outputPath: string) {
//     const projectClonerWorkflow = this.container.get(CloneProjectWorkflow);
//     await projectClonerWorkflow.cloneSelectedProjects(outputPath);
//   }

//   async createNewProject() {
//     const projectCreatorWorkflow = this.container.get(CreateProjectWorkflow);
//     await projectCreatorWorkflow.createProject();
//   }
// }

// const container = new Container();
// container.bind<ProjectRepositoryImpl>(ProjectRepositoryImpl).toSelf();
// container.bind<PromptServiceImpl>(PromptServiceImpl).toSelf();
// container.bind<GitServiceImpl>(GitServiceImpl).toSelf();
// container.bind<CreateProjectInteractor>(CreateProjectInteractor).toSelf();
// container.bind<CloneProjectWorkflow>(CloneProjectWorkflow).toSelf();
// container.bind<CreateProjectWorkflow>(CreateProjectWorkflow).toSelf();

// export { container };
