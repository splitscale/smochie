import { CloneCommand } from './clone/cloneCommand.js';
import { Command } from './command.js';
import { CreateProjectCommand } from './create/project/createProjectCommand.js';
import { CreateWorkspaceCommand } from './create/workspace/createWorkspaceCommand.js';
import { SlaveCommand } from './slave/slaveCommand.js';
import { UsageCommand } from './utils/usage/usageCommand.js';
import { VersionCommand } from './utils/version/versionCommand.js';

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

  static createUtilCommand(flag: string): Command {
    switch (flag) {
      case '-h':
      case '--help':
        return new UsageCommand();
      case '-v':
      case '--version':
        return new VersionCommand();
      default:
        throw new Error('Not a util flag');
    }
  }
}
