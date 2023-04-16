import { assertValidGitUrl } from './assertValidUrl.js';

export async function validateRepositories(
  repositories: string[]
): Promise<void> {
  for (const repository of repositories) {
    assertValidGitUrl(repository);
  }
}
