var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { injectable, Container, inject } from 'inversify';
import 'reflect-metadata';
let ProjectRepositoryImpl = class ProjectRepositoryImpl {
    constructor(path) {
        this.path = path;
    }
    getProjects() {
        return ['Project 1', 'Project 2'];
    }
};
ProjectRepositoryImpl = __decorate([
    injectable(),
    __metadata("design:paramtypes", [String])
], ProjectRepositoryImpl);
const TYPES = {
    ProjectRepository: Symbol.for('ProjectRepository'),
};
let ProjectService = class ProjectService {
    constructor(projectRepository) {
        this._projectRepository = projectRepository;
    }
    getProjects() {
        return this._projectRepository.getProjects();
    }
};
ProjectService = __decorate([
    injectable(),
    __param(0, inject(TYPES.ProjectRepository)),
    __metadata("design:paramtypes", [Object])
], ProjectService);
export { ProjectService };
export function trySetup2() {
    const container = new Container();
    container
        .bind(TYPES.ProjectRepository)
        .toDynamicValue(() => getProjectRepository());
    const projectService = container.resolve(ProjectService);
    console.log(projectService.getProjects()); // Output: ["Project 1", "Project 2"]
}
export function getProjectRepository() {
    return new ProjectRepositoryImpl('path');
}
