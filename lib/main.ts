import { errorLogger } from './core/util/errorLogger.js';
import { CommandArgsParser } from './commandArgs/commandArgsParser.js';

import { Api } from './api/api.js';
import { parseError } from './core/util/parseError.js';
import { FilepathVariables } from './api/variables/filepathVariables.js';

const argsParser = new CommandArgsParser();

export default async function main() {
  try {
    const args = process.argv.slice(2);
    const { command, outputPath } = argsParser.parse(args);

    FilepathVariables.setCloneOutputDirWithAssertion(outputPath);

    switch (command) {
      case 'clone':
        await Api.workflows.cloneProject.start();
        break;
      case '--create-project':
        await Api.workflows.createProject.start();
        break;
      default:
        throw new Error(`Invalid command: ${command}`);
    }
  } catch (error) {
    errorLogger(parseError(error));
  }
}