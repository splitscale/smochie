import { readFileSync } from 'fs';
import { Command } from '../../command.js';
import { FilepathVariables } from '../../../../api/variables/filepathVariables.js';

export class VersionCommand implements Command {
  async execute(args: string[]): Promise<void> {
    const packageJson = this.readPackageJson();
    const version = JSON.parse(packageJson).version;
    const name = JSON.parse(packageJson).name;

    console.log(`${name} Version: ${version}`);
  }

  readPackageJson(): string {
    return readFileSync(
      FilepathVariables.getSmochieDir('package.json'),
      'utf8'
    );
  }
}
