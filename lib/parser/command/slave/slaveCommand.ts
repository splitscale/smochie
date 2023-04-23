import { Api } from '../../../api/api.js';
import { Command } from '../command.js';
import { SlaveArgs } from './slaveArgs.js';

export class SlaveCommand implements Command {
  async execute(args: string[]) {
    console.log(`Executing 'slave' command`);

    const { command, isSpecifying, isOmitting } = this.parseArgs(args);

    Api.workflows.commandSlave.start(
      command.join(' ').toString(),
      isSpecifying,
      isOmitting
    );
  }

  private parseArgs(args: string[]): SlaveArgs {
    let isSpecifying = false;
    let isOmitting = false;
    const command: string[] = [];

    for (const arg of args) {
      switch (arg) {
        case '-s':
          isSpecifying = true;
          break;
        case '--select':
          isSpecifying = true;
          break;
        case '-o':
          isOmitting = true;
          break;
        case '--omit':
          isOmitting = true;
          break;
        default:
          command.push(arg);
          break;
      }
    }

    return { isSpecifying, isOmitting, command };
  }
}
