#!/usr/bin/env node

import { errorLogger } from './core/util/errorLogger.js';
import { CommandArgsParser } from './commandArgs/commandArgsParser.js';

import { Api } from './api/api.js';
import { parseError } from './core/util/parseError.js';
import { FilepathVariables } from './api/variables/filepathVariables.js';
import { readFileSync } from 'fs';

const argsParser = new CommandArgsParser();
const smochieRoot = FilepathVariables.getSmochieDir();

function readUsage(): string {
  return readFileSync(`./${smochieRoot}/usage.txt`, 'utf8');
}

function readPackageJson(): string {
  return readFileSync(`./${smochieRoot}/package.json`, 'utf8');
}

export default async function main() {
  try {
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

    // Set the output path to the current working directory path
    const outputPath = process.cwd();
    FilepathVariables.setCloneOutputDirWithAssertion(outputPath);

    switch (command) {
      case 'clone':
        await Api.workflows.cloneProject.start();
        break;
      case 'create-project':
        await Api.workflows.createProject.start();
        break;
      default:
        throw new Error(`Invalid command: ${command}`);
    }
  } catch (error) {
    console.log(readUsage());
    errorLogger(parseError(error));
  }
}
