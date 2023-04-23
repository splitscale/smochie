import { CommandFactory } from './commandFactory.js';

export class UtilCommandExecutor {
  constructor(private readonly args: string[]) {}
  async execute() {
    const [command, ...commandArgs] = this.args;

    const commandInstance = CommandFactory.createUtilCommand(command);

    await commandInstance.execute(commandArgs);
    process.exit(0);
  }
}
