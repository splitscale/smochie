import { Container } from 'inversify';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowEntityDependencyConfig } from '../../../../entities/workflows/project/create/projectWorkflowDependencyEntityConfig.js';
const cloneProjectWorkflowContainer = new Container();
const config = new ProjectWorkflowEntityDependencyConfig();
cloneProjectWorkflowContainer
    .bind(WorkflowTypes.Workflow)
    .toDynamicValue(() => config.getCloneProjectWorkflow());
export { cloneProjectWorkflowContainer };
