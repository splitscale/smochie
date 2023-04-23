import { WorkspaceWorkflow } from '../../../../core/workflows/workspace/workspaceWorkflow.js';
import { PromptServiceImpl } from '../../../../serviceAgent/services/promptServiceImpl.js';
import { WorkspaceServiceImpl } from '../../../../serviceAgent/services/workspaceService.js';
import { FilepathVariables } from '../../../variables/filepathVariables.js';

export class WorkspaceWorkflowDependencyEntityConfig {
  getPromptService() {
    return new PromptServiceImpl();
  }

  getWorkspaceService() {
    return new WorkspaceServiceImpl(FilepathVariables.currentDir);
  }

  getWorkspaceWorkflow() {
    return new WorkspaceWorkflow(
      this.getPromptService(),
      this.getWorkspaceService()
    );
  }
}
