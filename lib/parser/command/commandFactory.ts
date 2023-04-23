import { CloneCommand } from './clone/cloneCommand.js';
import { Command } from './command.js';
import { CreateProjectCommand } from './create/project/createProjectCommand.js';
import { CreateWorkspaceCommand } from './create/workspace/createWorkspaceCommand.js';
import { SlaveCommand } from './slave/slaveCommand.js';

export class CommandFactory {
  static createCommand(command: string): Command {
    switch (command) {
      case 'clone':
        return new CloneCommand();
      case 'create-project':
        return new CreateProjectCommand();
      case 'create-workspace':
        return new CreateWorkspaceCommand();
      case 'slave':
        return new SlaveCommand();
      default:
        throw new Error(`Invalid command: ${command}`);
    }
  }
}
