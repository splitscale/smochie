import { ProjectRepositoryImpl } from './dataAccess/repositories/projectRepositoryImpl.js';
import { PromptServiceImpl } from './serviceAgent/services/promptServiceImpl.js';
import { GitServiceImpl } from './serviceAgent/services/gitServiceImpl.js';
import { ProjectCloner } from './core/workflows/project/projectCloner.js';
async function main() {
    const projectRepository = new ProjectRepositoryImpl('./data/projects.yml');
    const promptService = new PromptServiceImpl();
    const gitService = new GitServiceImpl();
    const projectCloner = new ProjectCloner(projectRepository, gitService, promptService);
    try {
        await projectCloner.cloneSelectedProjects('./cloned-projects');
    }
    catch (error) {
        console.error(error);
    }
}
main();
