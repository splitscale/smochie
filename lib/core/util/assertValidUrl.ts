export function assertValidGitUrl(url: string): void {
  const regex = /^https?:\/\/github\.com\/.+\.git$/;
  if (!regex.test(url)) {
    throw new Error(`Invalid git URL format: '${url}'`);
  }
}
