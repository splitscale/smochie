import { Project } from '../project/project.js';

/**
 * Defines the interface for a Git service that can be used to clone repositories.
 */
export interface GitService {
  /**
   * Clones the repositories for each project to the specified output directory using the isomorphic-git library.
   * Throws an error if there is a problem cloning any of the repositories.
   * @param projects The list of projects to clone.
   * @param outputDirectory The directory to clone the repositories to.
   */
  cloneProjects(projects: Project[], outputDirectory: string): Promise<void>;

  /**
   * Clones the repositories for each project to the specified output directory using the Git CLI.
   * Throws an error if there is a problem cloning any of the repositories.
   * @param projects The list of projects to clone.
   * @param outputDirectory The directory to clone the repositories to.
   */
  cloneProjectsUsingCli(projects: Project[], outputDirectory: string): void;
}
