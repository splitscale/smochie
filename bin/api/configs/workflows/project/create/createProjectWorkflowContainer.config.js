import { Container } from 'inversify';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowEntityDependencyConfig } from '../../../../entities/workflows/project/create/projectWorkflowDependencyEntityConfig.js';
const createProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowEntityDependencyConfig();
createProjectWorkflowContainer
    .bind(WorkflowTypes.Workflow)
    .toDynamicValue(() => config.getCreateProjectWorkflow());
export { createProjectWorkflowContainer };
