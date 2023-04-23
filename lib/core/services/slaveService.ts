export interface SlaveService {
  command(
    command: string,
    options?: { excluded?: string[]; included?: string[] }
  ): Promise<void>;

  getAllSubfolders(): Promise<string[]>;
}
