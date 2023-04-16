import { Container } from 'inversify';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { ProjectWorkflowEntityDependencyConfig } from '../../../../entities/workflows/project/create/projectWorkflowEntityDependencyConfig.js';
const projectWorkflowContainer = new Container();
const projectConfig = new ProjectWorkflowEntityDependencyConfig();
projectWorkflowContainer
    .bind(WorkflowTypes.Workflow)
    .toDynamicValue(() => projectConfig.getCreateProjectWorkflow());
export { projectWorkflowContainer };
