export class ProjectBuilder {
    constructor(name, repositories) {
        this._name = name;
        this._repositories = repositories;
    }
    get getName() {
        return this._name;
    }
    set setName(value) {
        this._name = value;
    }
    get getRepositories() {
        return this._repositories;
    }
    set setRepositories(value) {
        this._repositories = value;
    }
    toJson() {
        return JSON.stringify({
            name: this._name,
            repositories: this._repositories,
        });
    }
    toString() {
        return `{name: ${this._name}, repositories: [${this._repositories.join(', ')}]}`;
    }
    static fromJson(json) {
        const obj = JSON.parse(json);
        return new ProjectBuilder(obj.name, obj.repositories);
    }
}
