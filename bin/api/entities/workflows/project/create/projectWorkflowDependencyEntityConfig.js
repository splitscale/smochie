import { CreateProjectInteractor } from '../../../../../core/project/create/createProjectInteractor.js';
import { CloneProjectWorkflow } from '../../../../../core/workflows/project/clone/cloneProjectWorkflow.js';
import { CreateProjectWorkflow } from '../../../../../core/workflows/project/create/createProjectWorkflow.js';
import { ProjectRepositoryImpl } from '../../../../../dataAccess/repositories/projectRepositoryImpl.js';
import { GitServiceImpl } from '../../../../../serviceAgent/services/gitServiceImpl.js';
import { PromptServiceImpl } from '../../../../../serviceAgent/services/promptServiceImpl.js';
import { FilepathVariables } from '../../../../variables/filepathVariables.js';
export class ProjectWorkflowEntityDependencyConfig {
    getPromptService() {
        return new PromptServiceImpl();
    }
    getProjectRepository() {
        return new ProjectRepositoryImpl(FilepathVariables.projectsRepository);
    }
    getCreateProjectInteractor() {
        return new CreateProjectInteractor(this.getProjectRepository());
    }
    getGitService() {
        return new GitServiceImpl();
    }
    getCreateProjectWorkflow() {
        return new CreateProjectWorkflow(this.getPromptService(), this.getCreateProjectInteractor());
    }
    getCloneProjectWorkflow() {
        return new CloneProjectWorkflow(this.getProjectRepository(), this.getGitService(), this.getPromptService(), FilepathVariables.cloneOutputDir);
    }
}
