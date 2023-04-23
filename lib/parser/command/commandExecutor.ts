import { CommandFactory } from './commandFactory.js';

export class CommandExecutor {
  static async execute(args: string[]) {
    const [command, ...commandArgs] = args;

    const commandInstance = CommandFactory.createCommand(command);

    await commandInstance.execute(commandArgs);
  }
}
