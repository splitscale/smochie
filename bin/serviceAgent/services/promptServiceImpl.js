import inquirer from 'inquirer';
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
}
