import inquirer from 'inquirer';
import { Project } from '../../core/project/project.js';
export class PromptServiceImpl {
    async selectProjects(projects) {
        const choices = projects.map((project) => ({
            name: project.name,
            value: project,
        }));
        const { selectedProjects } = await inquirer.prompt([
            {
                type: 'checkbox',
                message: 'Select projects to clone:',
                name: 'selectedProjects',
                choices,
            },
        ]);
        return selectedProjects;
    }
    async confirmSelection(message) {
        const { confirmed } = await inquirer.prompt([
            {
                type: 'confirm',
                message,
                name: 'confirmed',
            },
        ]);
        return confirmed;
    }
    async createProject() {
        const name = await this.requestName();
        const repositories = await this.requestRepositories();
        return new Project(name, repositories);
    }
    async requestName() {
        const { name } = await inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the name of the project:',
                name: 'name',
            },
        ]);
        return name;
    }
    async requestRepositories(repositories = []) {
        const repository = await inquirer.prompt([
            {
                type: 'input',
                message: 'Enter the URL of a repository to add to the project (submit an empty string to exit):',
                name: 'repository',
            },
        ]);
        if (repository === '') {
            return repositories;
        }
        return this.requestRepositories([...repositories, repository]);
    }
}
