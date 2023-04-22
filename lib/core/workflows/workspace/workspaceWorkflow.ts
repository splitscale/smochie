import { PromptServiceImpl } from '../../../serviceAgent/services/promptServiceImpl.js';
import { WorkspaceServiceImpl } from '../../../serviceAgent/services/workspaceService.js';
import { Workflow } from '../workflow.js';

export class WorkspaceWorkflow implements Workflow {
  private readonly promptService: PromptServiceImpl;
  private readonly workspaceService: WorkspaceServiceImpl;

  constructor(
    promptService: PromptServiceImpl,
    workspaceService: WorkspaceServiceImpl
  ) {
    this.promptService = promptService;
    this.workspaceService = workspaceService;
  }

  async start(): Promise<void> {
    const workspaceName = await this.promptService.promptWorkspaceName();
    this.workspaceService.createWorkspace(workspaceName);
  }
}
