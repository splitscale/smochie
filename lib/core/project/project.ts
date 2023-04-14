export class Project {
  name: string;
  repositories: string[];

  constructor(name: string, repositories: string[]) {
    this.name = name;
    this.repositories = repositories;
  }

  toJson(): string {
    return JSON.stringify({
      name: this.name,
      repositories: this.repositories,
    });
  }

  toString(): string {
    return `{name: ${this.name}, repositories: [${this.repositories.join(
      ', '
    )}]}`;
  }

  toYamlPreview(): string {
    const repositoriesYaml = this.repositories
      .map((repo) => `  - ${repo}`)
      .join('\n');

    return `name: ${this.name}\n repositories:\n${repositoriesYaml}\n`;
  }

  static fromJson(json: string): Project {
    const obj = JSON.parse(json);
    return new Project(obj.name, obj.repositories);
  }
}
