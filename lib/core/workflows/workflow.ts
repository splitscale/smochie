export interface Workflow<T extends any[] = []> {
  start(...args: T): Promise<void>;
}
