import { Api } from '../../../../api/api.js';
import { Command } from '../../command.js';

export class CreateWorkspaceCommand implements Command {
  async execute(args: string[]) {
    Api.workflows.createWorkspace.start();
  }
}
