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

  static fromJson(json: string): Project {
    const obj = JSON.parse(json);
    return new Project(obj.name, obj.repositories);
  }
}
