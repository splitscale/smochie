import { stringify } from 'yaml';
import { Project } from './core/project/project.js';
import fs from 'fs/promises';
async function main() {
    // const projectRepository = new ProjectRepositoryImpl('./data/projects.yml');
    // const promptService = new PromptServiceImpl();
    // const gitService = new GitServiceImpl();
    // const projectCloner = new CloneProject(
    //   projectRepository,
    //   gitService,
    //   promptService
    // );
    // const projectCreator = new CreateProject(promptService, projectRepository);
    // try {
    //   // await projectCloner.cloneSelectedProjects('./cloned-projects');
    //   await projectCreator.createProject();
    // } catch (error) {
    //   console.error(error);
    // }
    const projects = [];
    projects.push(new Project('project1', ['repo1', 'repo2']));
    projects.push(new Project('project2', ['repo1', 'repo2']));
    await saveProjects(projects);
}
async function saveProjects(projects) {
    const data = stringify(projects);
    const plusSigns = '+'.repeat(Math.min(projects.length, 10));
    console.log(data);
    console.log('\x1b[33;1m%s\x1b[0m', `Changes: ${projects.length} ${plusSigns}`);
    await fs.writeFile('./data/projects-debug.yml', data);
}
main();
