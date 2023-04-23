import { Api } from '../../../api/api.js';
import { FilepathVariables } from '../../../api/variables/filepathVariables.js';
import { Command } from '../command.js';

export class CloneCommand implements Command {
  async execute(args: string[]) {
    const outputPath = this.getOutputPath(args);

    if (!outputPath) {
      throw new Error(`Output path is missing for 'clone' command`);
    }

    console.log(`Executing 'clone' command with output path: ${outputPath}`);

    Api.workflows.cloneProject.start();
  }

  private getOutputPath(args: string[]) {
    let outputPath;

    if (args.length === 0) {
      // If no arguments are passed, use the current working directory as the output path
      outputPath = FilepathVariables.currentDir;
    } else {
      // Look for the --path or -p flags
      for (let i = 0; i < args.length; i++) {
        const arg = args[i];
        if (arg === '--path' || arg === '-p') {
          if (i + 1 >= args.length) {
            throw new Error(`Output path is missing after '${arg}' flag`);
          }
          outputPath = args[i + 1];
          break;
        }
      }
    }

    return outputPath;
  }
}
