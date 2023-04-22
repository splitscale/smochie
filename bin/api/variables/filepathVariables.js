import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import os from 'os';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
class FilepathVariables {
    static get projectsRepository() {
        const documentsDir = path.join(os.homedir(), 'Documents');
        const dataDir = path.join(documentsDir, 'smochie', 'data');
        return path.join(dataDir, 'projects.yml');
    }
    static setCloneOutputDir(newPath) {
        if (newPath === '')
            return;
        this.cloneOutputDir = newPath;
    }
    static setCloneOutputDirWithAssertion(newPath) {
        this.setCloneOutputDir(newPath !== undefined ? newPath : '');
    }
    static getSmochieDir(filename) {
        const root = resolve(__dirname, '..', '..', '..');
        return path.join(root, filename);
    }
}
FilepathVariables.cloneOutputDir = './';
export { FilepathVariables };
