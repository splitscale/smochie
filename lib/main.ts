#!/usr/bin/env node

import { errorLogger } from './core/util/errorLogger.js';
import { parseError } from './core/util/parseError.js';
import { FilepathVariables } from './api/variables/filepathVariables.js';
import { SystemDirParser } from './parser/path/systemDirParser.js';
import { CommandExecutor } from './parser/command/commandExecutor.js';
import { UtilCommandExecutor } from './parser/command/utilCommandExecutor.js';

export default async function main() {
  // Set the output path to the current working directory path
  const rootDir = process.cwd();
  const args = process.argv.slice(2);
  const util = new UtilCommandExecutor(args);

  try {
    util.execute();

    FilepathVariables.setCloneOutputDirWithAssertion(
      SystemDirParser.format(rootDir)
    );

    CommandExecutor.execute(args);
  } catch (error) {
    util.execute();
    errorLogger(parseError(error));
  }
}
