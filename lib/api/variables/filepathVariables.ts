import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export class FilepathVariables {
  static get projectsRepository() {
    const documentsDir = path.join(os.homedir(), 'Documents');
    const dataDir = path.join(documentsDir, 'smochie', 'data');
    return path.join(dataDir, 'projects.yml');
  }

  static currentDir = './';

  static setCurrentDir(newPath: string): void {
    if (newPath === '') return;
    this.currentDir = newPath;
  }

  static setCloneOutputDirWithAssertion(newPath: string | undefined) {
    this.setCurrentDir(newPath !== undefined ? newPath : '');
  }

  static getSmochieDir(filename: string): string {
    const root = resolve(__dirname, '..', '..', '..');
    return path.join(root, filename);
  }
}
