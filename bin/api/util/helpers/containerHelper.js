import { Container } from 'inversify';
export class ContainerHelper {
    constructor() {
        this.container = new Container();
    }
    bindTo(type, implementation) {
        this.container.bind(type).to(implementation);
    }
    bindToDynamicValue(type, value) {
        this.container.bind(type).toDynamicValue(() => value);
    }
    resolve(type) {
        return this.container.resolve(type);
    }
}
