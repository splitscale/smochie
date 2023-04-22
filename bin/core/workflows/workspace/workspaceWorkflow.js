export class WorkspaceWorkflow {
    constructor(promptService, workspaceService) {
        this.promptService = promptService;
        this.workspaceService = workspaceService;
    }
    async start() {
        const workspaceName = await this.promptService.promptWorkspaceName();
        this.workspaceService.createWorkspace(workspaceName);
    }
}
