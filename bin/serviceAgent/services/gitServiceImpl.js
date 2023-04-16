import * as fs from 'fs';
import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node/index.js';
import { exec } from 'child_process';
import { assertValidGitUrl } from '../../core/util/assertValidUrl.js';
export class GitServiceImpl {
    async cloneRepo(repoUrl, localPath) {
        try {
            await git.clone({
                fs,
                http,
                dir: localPath,
                url: repoUrl,
            });
        }
        catch (error) {
            throw new Error(`Failed to clone repository ${repoUrl}: ${error}`);
        }
    }
    async cloneProjects(projects, outputDirectory) {
        for (const project of projects) {
            const name = project.name;
            const repositories = project.repositories;
            for (const repoUrl of repositories) {
                assertValidGitUrl(repoUrl);
                const repositoryName = this.extractRepoNameFromUrl(repoUrl);
                const localPath = `${outputDirectory}/${name}/${repositoryName}`;
                await this.cloneRepo(repoUrl, localPath);
            }
        }
    }
    cloneProjectsUsingCli(projects, outputDirectory) {
        for (const project of projects) {
            const name = project.name;
            const repositories = project.repositories;
            for (const repoUrl of repositories) {
                assertValidGitUrl(repoUrl);
                const repositoryName = this.extractRepoNameFromUrl(repoUrl);
                const localPath = `${outputDirectory}/${name}/${repositoryName}`;
                try {
                    exec(`git clone ${repoUrl} ${localPath}`);
                }
                catch (error) {
                    throw new Error(`Failed to clone repository ${repoUrl}: ${error}`);
                }
            }
        }
    }
    extractRepoNameFromUrl(url) {
        // Extract the repository name from the URL by splitting the string at the last '/' character
        const parts = url.split('/');
        const repoName = parts[parts.length - 1];
        // Remove the '.git' extension from the repository name, if present
        return repoName.replace(/\.git$/, '');
    }
}
