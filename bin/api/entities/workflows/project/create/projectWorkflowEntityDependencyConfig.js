import { CreateProjectInteractor } from '../../../../../core/project/create/createProjectInteractor.js';
import { CreateProjectWorkflow } from '../../../../../core/workflows/project/create/createProjectWorkflow.js';
import { ProjectRepositoryImpl } from '../../../../../dataAccess/repositories/projectRepositoryImpl.js';
import { PromptServiceImpl } from '../../../../../serviceAgent/services/promptServiceImpl.js';
import { PROJECTS_REPOSITORY_FILEPATH } from '../../../../configs/variables/pathsVariables.js';
export class ProjectWorkflowEntityDependencyConfig {
    getPromptService() {
        return new PromptServiceImpl();
    }
    getProjectRepository() {
        return new ProjectRepositoryImpl(PROJECTS_REPOSITORY_FILEPATH);
    }
    getCreateProjectInteractor() {
        return new CreateProjectInteractor(this.getProjectRepository());
    }
    getCreateProjectWorkflow() {
        return new CreateProjectWorkflow(this.getPromptService(), this.getCreateProjectInteractor());
    }
}
