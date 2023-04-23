import { Workflow } from '../../core/workflows/workflow.js';
import { cloneProjectWorkflowContainer } from '../configs/workflows/project/clone/cloneProjectWorkflowContainer.config.js';
import { createProjectWorkflowContainer } from '../configs/workflows/project/create/createProjectWorkflowContainer.config.js';
import { createWorkspaceWorkflowContainer } from '../configs/workflows/project/create/createWorkspaceWorkflowContainer.config.js';
import { slaveWorkflowContainer } from '../configs/workflows/slave/command/commandSlaveWorkflowContainer.config.js';
import { WorkflowTypes } from '../types/workflowTypes.js';

export class Workflows {
  get createProject() {
    return createProjectWorkflowContainer.get<Workflow>(WorkflowTypes.Workflow);
  }

  get cloneProject() {
    return cloneProjectWorkflowContainer.get<Workflow>(WorkflowTypes.Workflow);
  }

  get createWorkspace() {
    return createWorkspaceWorkflowContainer.get<Workflow>(
      WorkflowTypes.Workflow
    );
  }

  get commandSlave() {
    return slaveWorkflowContainer.get<Workflow<[string, boolean, boolean]>>(
      WorkflowTypes.Workflow
    );
  }
}
