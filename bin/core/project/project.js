export class Project {
    constructor(name, repositories) {
        this.name = name;
        this.repositories = repositories;
    }
    toJson() {
        return JSON.stringify({
            name: this.name,
            repositories: this.repositories,
        });
    }
    toString() {
        return `{name: ${this.name}, repositories: [${this.repositories.join(', ')}]}`;
    }
    toYamlPreview() {
        const repositoriesYaml = this.repositories
            .map((repo) => `  - ${repo}`)
            .join('\n');
        return `name: ${this.name}\n repositories:\n${repositoriesYaml}\n`;
    }
    static fromJson(json) {
        const obj = JSON.parse(json);
        return new Project(obj.name, obj.repositories);
    }
}
