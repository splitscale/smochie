import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = resolve(__dirname, '..', '..', 'data');
const smochieDir = resolve(__dirname, '..', '..');

export class FilepathVariables {
  static projectsRepository = path.join(dataDir, 'projects.yml');
  static cloneOutputDir = './';

  static setCloneOutputDir(newPath: string): void {
    if (newPath === '') return;
    this.cloneOutputDir = newPath;
  }

  static setCloneOutputDirWithAssertion(newPath: string | undefined) {
    this.setCloneOutputDir(newPath !== undefined ? newPath : '');
  }

  static getSmochieDir(): string {
    return smochieDir;
  }
}
