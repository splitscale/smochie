export function errorLogger(errorMessage) {
    console.error('\x1b[31m%s\x1b[0m', `\n${errorMessage}`);
}
