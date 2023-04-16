export class FilepathVariables {
  static projectsRepository = './data/projects.yml';
  static cloneOutputDir = './cloned-projects';

  static setCloneOutputDir(newPath: string): void {
    if (newPath === '') return;
    this.cloneOutputDir = newPath;
  }

  static setCloneOutputDirWithAssertion(newPath: string | undefined) {
    this.setCloneOutputDir(newPath !== undefined ? newPath : '');
  }
}
