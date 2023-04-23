import { readFileSync } from 'fs';
import { Command } from '../../command.js';
import { FilepathVariables } from '../../../../api/variables/filepathVariables.js';

export class UsageCommand implements Command {
  async execute(args: string[]): Promise<void> {
    console.log(this.readUsage());
  }

  private readUsage(): string {
    return readFileSync(FilepathVariables.getSmochieDir('usage.txt'), 'utf8');
  }
}
