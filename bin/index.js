import { errorLogger } from './core/util/errorLogger.js';
import { CoreApi } from './api/coreApi.js';
import { CommandArgsParser } from './commandArgs/commandArgsParser.js';
const projectsDir = './data/projects.yml';
const api = new CoreApi();
const argsParser = new CommandArgsParser();
try {
    const args = process.argv.slice(2);
    const { command, outputPath } = argsParser.parse(args);
    switch (command) {
        case 'clone':
            await api.cloneSelectedProjects(outputPath);
            break;
        case '--create-project':
            await api.createNewProject();
            break;
        default:
            throw new Error(`Invalid command: ${command}`);
    }
}
catch (error) {
    errorLogger(error);
}
