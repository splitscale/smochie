export function parseError(error: any): string {
  return error instanceof Error ? error.message : `Unknown error: ${error}`;
}
