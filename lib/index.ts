import fs from 'fs/promises';
import { stringify } from 'yaml';

import { Project } from './core/project/project.js';
import { ProjectRepositoryImpl } from './dataAccess/repositories/projectRepositoryImpl.js';
import { PromptServiceImpl } from './serviceAgent/services/promptServiceImpl.js';
import { GitServiceImpl } from './serviceAgent/services/gitServiceImpl.js';
import { CreateProjectInteractor } from './core/project/create/createProjectInteractor.js';
import { CloneProject } from './core/workflows/project/clone/cloneProject.js';
import { CreateProject } from './core/workflows/project/create/createProject.js';
import { errorLogger } from './core/util/errorLogger.js';

function processArgs() {
  const args = process.argv.slice(2);

  const command = args[0];

  switch (command) {
    case 'clone':
      const outputPath = args[1];
      return { command, outputPath };
    case '--create-project':
      return { command };
    default:
      throw new Error(`Invalid command: ${command}`);
  }
}

async function main() {
  try {
    const { command, outputPath } = processArgs();

    const projectRepository = new ProjectRepositoryImpl('./data/projects.yml');
    const promptService = new PromptServiceImpl();
    const gitService = new GitServiceImpl();
    const createProject = new CreateProjectInteractor(projectRepository);

    const projectCloner = new CloneProject(
      projectRepository,
      gitService,
      promptService
    );
    const projectCreator = new CreateProject(promptService, createProject);

    switch (command) {
      case 'clone':
        await projectCloner.cloneSelectedProjects(outputPath);
        break;
      case '--create-project':
        await projectCreator.createProject();
        break;
      default:
        throw new Error(`Invalid command: ${command}`);
    }
  } catch (error) {
    errorLogger(error);
  }
}

main();
