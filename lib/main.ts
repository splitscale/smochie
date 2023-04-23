#!/usr/bin/env node

import { errorLogger } from './core/util/errorLogger.js';
import { parseError } from './core/util/parseError.js';
import { FilepathVariables } from './api/variables/filepathVariables.js';
import { SystemDirParser } from './parser/path/systemDirParser.js';
import { Api } from './api/api.js';
import { readFileSync } from 'fs';
import { CommandExecutor } from './parser/command/commandExecutor.js';

function readUsage(): string {
  return readFileSync(FilepathVariables.getSmochieDir('usage.txt'), 'utf8');
}

function readPackageJson(): string {
  return readFileSync(FilepathVariables.getSmochieDir('package.json'), 'utf8');
}

export default async function main() {
  try {
    // Set the output path to the current working directory path
    const rootDir = process.cwd();
    FilepathVariables.setCloneOutputDirWithAssertion(
      SystemDirParser.format(rootDir)
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

    CommandExecutor.execute(args);
  } catch (error) {
    console.log(readUsage());
    errorLogger(parseError(error));
  }
}
