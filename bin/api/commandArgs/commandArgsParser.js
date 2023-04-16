export class CommandArgsParser {
    parse(args) {
        const [command, ...commandArgs] = args;
        switch (command) {
            case 'clone':
                if (commandArgs.length < 1) {
                    throw new Error(`Output path is missing for 'clone' command`);
                }
                return { command, outputPath: commandArgs[0] };
            case '--create-project':
                return { command };
            default:
                throw new Error(`Invalid command: ${command}`);
        }
    }
}
