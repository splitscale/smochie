import { Container } from 'inversify';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowEntityDependencyEntityConfig } from '../../../../entities/workflows/project/create/projectWorkflowDependencyEntityConfig.js';
const createProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowEntityDependencyEntityConfig();
createProjectWorkflowContainer
    .bind(WorkflowTypes.Workflow)
    .toDynamicValue(() => config.getCreateProjectWorkflow());
export { createProjectWorkflowContainer };
