import { Project } from './project.js';

class ProjectBuilder implements Project {
  private _name: string;
  private _repositories: string[];

  constructor(name: string, repositories: string[]) {
    this._name = name;
    this._repositories = repositories;
  }

  get name(): string {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get repositories(): string[] {
    return this._repositories;
  }

  set repositories(value: string[]) {
    this._repositories = value;
  }
}
