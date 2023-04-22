import { cloneProjectWorkflowContainer } from '../configs/workflows/project/clone/cloneProjectWorkflowContainer.config.js';
import { createProjectWorkflowContainer } from '../configs/workflows/project/create/createProjectWorkflowContainer.config.js';
import { createWorkspaceWorkflowContainer } from '../configs/workflows/project/create/createWorkspaceWorkflowContainer.config.js';
import { WorkflowTypes } from '../types/workflowTypes.js';
export class Workflows {
    get createProject() {
        return createProjectWorkflowContainer.get(WorkflowTypes.Workflow);
    }
    get cloneProject() {
        return cloneProjectWorkflowContainer.get(WorkflowTypes.Workflow);
    }
    get createWorkspace() {
        return createWorkspaceWorkflowContainer.get(WorkflowTypes.Workflow);
    }
}
