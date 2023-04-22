import { Container } from 'inversify';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { WorkspaceWorkflowDependencyEntityConfig } from '../../../../entities/workflows/project/create/workspaceWorkflowDependencyEntityConfig.js';
const createWorkspaceWorkflowContainer = new Container();
const config = new WorkspaceWorkflowDependencyEntityConfig();
createWorkspaceWorkflowContainer
    .bind(WorkflowTypes.Workflow)
    .toDynamicValue(() => config.getWorkspaceWorkflow());
export { createWorkspaceWorkflowContainer };
