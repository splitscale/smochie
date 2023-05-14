import { readFileSync } from 'fs';
import { Command } from '../../command.js';
import { FilepathVariables } from '../../../../api/variables/filepathVariables.js';

export class UsageCommand implements Command {
  async execute(args: string[]): Promise<void> {
    console.log(this.displayUsage());
  }

  private displayUsage(): string {
    return readFileSync(FilepathVariables.getSmochieDir('usage.txt'), 'utf8');
  }
}
