export function errorLogger(errorMessage: any): void {
  console.error('\x1b[31m%s\x1b[0m', `\n${errorMessage}\n`);
}
