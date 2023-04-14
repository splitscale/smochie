import { ProjectRepositoryImpl } from './dataAccess/repositories/projectRepositoryImpl.js';
import { PromptServiceImpl } from './serviceAgent/services/promptServiceImpl.js';
import { GitServiceImpl } from './serviceAgent/services/gitServiceImpl.js';
import { CloneProject } from './core/workflows/project/clone/cloneProject.js';
import { CreateProject } from './core/workflows/project/create/createProject.js';
import { CreateProjectInteractor } from './core/project/create/createProjectInteractor.js';
import { errorLogger } from './core/util/errorLogger.js';
async function main() {
    const projectRepository = new ProjectRepositoryImpl('./data/projects.yml');
    const promptService = new PromptServiceImpl();
    const gitService = new GitServiceImpl();
    const createProject = new CreateProjectInteractor(projectRepository);
    const projectCloner = new CloneProject(projectRepository, gitService, promptService);
    const projectCreator = new CreateProject(promptService, createProject);
    try {
        // await projectCloner.cloneSelectedProjects('./cloned-projects');
        await projectCreator.createProject();
    }
    catch (error) {
        errorLogger(error);
    }
}
main();
