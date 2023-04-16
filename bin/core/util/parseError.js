export function parseError(error) {
    return error instanceof Error ? error.message : `Unknown error: ${error}`;
}
