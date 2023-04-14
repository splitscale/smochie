class ProjectBuilder {
    constructor(name, repositories) {
        this._name = name;
        this._repositories = repositories;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    get repositories() {
        return this._repositories;
    }
    set repositories(value) {
        this._repositories = value;
    }
}
export {};
