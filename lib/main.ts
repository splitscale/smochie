#!/usr/bin/env node

import { errorLogger } from './core/util/errorLogger.js';
import { CommandArgsParser } from './parser/command/commandArgsParser.js';
import { parseError } from './core/util/parseError.js';
import { FilepathVariables } from './api/variables/filepathVariables.js';
import { SystemDirParser } from './parser/path/systemDirParser.js';
import { Api } from './api/api.js';
import { readFileSync } from 'fs';

const argsParser = new CommandArgsParser();

function readUsage(): string {
  return readFileSync(FilepathVariables.getSmochieDir('usage.txt'), 'utf8');
}

function readPackageJson(): string {
  return readFileSync(FilepathVariables.getSmochieDir('package.json'), 'utf8');
}

export default async function main() {
  try {
    // Set the output path to the current working directory path
    const outputPath = process.cwd();
    FilepathVariables.setCloneOutputDirWithAssertion(
      SystemDirParser.format(outputPath)
    );

    const args = process.argv.slice(2);

    if (args.includes('-h') || args.includes('--help')) {
      console.log(readUsage());
      return;
    }

    if (args.includes('-v') || args.includes('--version')) {
      const packageJson = readPackageJson();
      const version = JSON.parse(packageJson).version;
      const name = JSON.parse(packageJson).name;

      console.log(`${name}, Version: ${version}`);
      return;
    }

    const { command } = argsParser.parse(args);

    switch (command) {
      case 'clone':
        await Api.workflows.cloneProject.start();
        break;
      case 'create-project':
        await Api.workflows.createProject.start();
        break;
      case 'create-workspace':
        await Api.workflows.createWorkspace.start();
        break;
      default:
        throw new Error(`Invalid command: ${command}`);
    }
  } catch (error) {
    console.log(readUsage());
    errorLogger(parseError(error));
  }
}
