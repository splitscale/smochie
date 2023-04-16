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
FilepathVariables.projectsRepository = './data/projects.yml';
FilepathVariables.cloneOutputDir = './cloned-projects';
export { FilepathVariables };
