import path, { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dataDir = resolve(__dirname, '..', '..', 'data');
class FilepathVariables {
    static setCloneOutputDir(newPath) {
        if (newPath === '')
            return;
        this.cloneOutputDir = newPath;
    }
    static setCloneOutputDirWithAssertion(newPath) {
        this.setCloneOutputDir(newPath !== undefined ? newPath : '');
    }
}
FilepathVariables.projectsRepository = path.join(dataDir, 'projects.yml');
FilepathVariables.cloneOutputDir = './';
export { FilepathVariables };
