import { assertValidGitUrl } from './assertValidUrl.js';
export async function validateRepositories(repositories) {
    for (const repository of repositories) {
        assertValidGitUrl(repository);
    }
}
