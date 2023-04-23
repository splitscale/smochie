import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { SlaveService } from '../../core/services/slaveService.js';
import { yellowLogger } from '../../core/util/yellowLogger.js';

export class SlaveServiceImpl implements SlaveService {
  private readonly readdirAsync = promisify(fs.readdir);
  private readonly statAsync = promisify(fs.stat);

  constructor(private readonly rootFolder: string) {}

  public async command(
    command: string,
    options: {
      excluded?: string[];
      included?: string[];
    } = {}
  ): Promise<void> {
    try {
      const { excluded, included } = options;
      let subfolders: string[] = [];

      if (included) {
        subfolders = await this.getSubfoldersByFilter(included, true);
      }

      if (excluded) {
        subfolders = await this.getSubfoldersByFilter(excluded, false);
      }

      if (excluded === undefined && included === undefined) {
        subfolders = await this.getAllSubfolders();
      }

      const promises = subfolders.map(async (subfolder) => {
        await this.executeCommand(command, subfolder);
      });

      await Promise.all(promises);
      console.log(`Command execution finished.`);
    } catch (error) {
      throw new Error(`Error executing command '${command}': ${error}`);
    }
  }

  async getAllSubfolders(): Promise<string[]> {
    const files = await this.readdirAsync(this.rootFolder);
    const subfolders = [];

    for (const file of files) {
      const filePath = path.join(this.rootFolder, file);
      const stat = await this.statAsync(filePath);

      if (stat.isDirectory()) {
        subfolders.push(filePath);
      }
    }

    return subfolders;
  }

  private async getSubfoldersByFilter(
    folders: string[],
    include: boolean
  ): Promise<string[]> {
    const filepaths: string[] = await this.getAllSubfolders();
    const subfolders: string[] = [];

    for (const filepath of filepaths) {
      if (include) {
        if (folders.indexOf(filepath) !== -1) {
          subfolders.push(filepath);
        }
      } else {
        if (folders.indexOf(filepath) === -1) {
          subfolders.push(filepath);
        }
      }
    }

    return subfolders;
  }

  private async executeCommand(command: string, folder: string): Promise<void> {
    yellowLogger(`Executing command in folder '${path.basename(folder)}'...`);

    return new Promise((resolve, reject) => {
      const child = exec(`cd ${folder} && ${command}`);

      child.stdout?.pipe(process.stdout);
      child.stderr?.pipe(process.stderr);

      child.on('exit', (code) => {
        if (code === 0) {
          yellowLogger(`\n Executed successfully. \n`);
          resolve();
        } else {
          reject(`Error executing command '${command}' in folder '${folder}'.`);
        }
      });
    });
  }
}
