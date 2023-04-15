var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import 'reflect-metadata';
import { Container, injectable } from 'inversify';
import { ProjectRepositoryImpl } from '../dataAccess/repositories/projectRepositoryImpl.js';
import { PromptServiceImpl } from '../serviceAgent/services/promptServiceImpl.js';
import { GitServiceImpl } from '../serviceAgent/services/gitServiceImpl.js';
import { CreateProjectInteractor } from '../core/project/create/createProjectInteractor.js';
import { CloneProjectWorkflow } from '../core/workflows/project/clone/cloneProjectWorkflow.js';
import { CreateProjectWorkflow } from '../core/workflows/project/create/createProjectWorkflow.js';
let CoreApi = class CoreApi {
    constructor(container) {
        this.container = container;
        this.projectRepository = this.container.get(ProjectRepositoryImpl);
        this.promptService = this.container.get(PromptServiceImpl);
        this.gitService = this.container.get(GitServiceImpl);
        this.createProject = this.container.get(CreateProjectInteractor);
    }
    async cloneSelectedProjects(outputPath) {
        const projectClonerWorkflow = this.container.get(CloneProjectWorkflow);
        await projectClonerWorkflow.cloneSelectedProjects(outputPath);
    }
    async createNewProject() {
        const projectCreatorWorkflow = this.container.get(CreateProjectWorkflow);
        await projectCreatorWorkflow.createProject();
    }
};
CoreApi = __decorate([
    injectable(),
    __metadata("design:paramtypes", [Container])
], CoreApi);
export { CoreApi };
const container = new Container();
container.bind(ProjectRepositoryImpl).toSelf();
container.bind(PromptServiceImpl).toSelf();
container.bind(GitServiceImpl).toSelf();
container.bind(CreateProjectInteractor).toSelf();
container.bind(CloneProjectWorkflow).toSelf();
container.bind(CreateProjectWorkflow).toSelf();
export { container };
