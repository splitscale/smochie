import { Api } from '../../../../api/api.js';
import { Command } from '../../command.js';

export class CreateProjectCommand implements Command {
  async execute(args: string[]) {
    Api.workflows.createProject.start();
  }
}
