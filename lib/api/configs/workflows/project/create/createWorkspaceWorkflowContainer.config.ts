import { Container } from 'inversify';
import { Workflow } from '../../../../../core/workflows/workflow.js';
import { WorkflowTypes } from '../../../../types/workflowTypes.js';
import { WorkspaceWorkflowDependencyEntityConfig } from '../../../../entities/workflows/project/workspaceWorkflowDependencyEntityConfig.js';

const createWorkspaceWorkflowContainer = new Container();
const config = new WorkspaceWorkflowDependencyEntityConfig();

createWorkspaceWorkflowContainer
  .bind<Workflow>(WorkflowTypes.Workflow)
  .toDynamicValue(() => config.getWorkspaceWorkflow());

export { createWorkspaceWorkflowContainer };
