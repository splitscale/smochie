import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

import { WorkspaceService } from '../../core/services/workspaceService.js';
import { parseError } from '../../core/util/parseError.js';
import { Folder } from '../../core/folder/folder.js';

export class WorkspaceServiceImpl implements WorkspaceService {
  constructor(private readonly currentPath: string) {}

  public createWorkspace(workspaceName: string): void {
    const folders = this.getFoldersInCurrentPath();

    if (folders.length === 0) {
      throw new Error('No folders found in the current directory.');
    }

    const workspacePath = path.join(
      this.currentPath,
      `${workspaceName}.code-workspace`
    );
    const workspaceData = { folders };

    try {
      fs.writeFileSync(workspacePath, JSON.stringify(workspaceData, null, 4));
      console.log(`Workspace created: ${workspacePath}`);
      this.openWorkspace(workspacePath);
    } catch (err) {
      throw new Error(`Error creating workspace file: ${parseError(err)}`);
    }
  }

  private getFoldersInCurrentPath(): Folder[] {
    try {
      const dirs = fs.readdirSync(this.currentPath, { withFileTypes: true });
      return dirs
        .filter((dir) => dir.isDirectory())
        .map(
          (dir) => new Folder(dir.name, path.join(this.currentPath, dir.name))
        );
    } catch (err) {
      throw new Error(`Error reading current directory: ${parseError(err)}`);
    }
  }

  private openWorkspace(workspacePath: string): void {
    try {
      if (process.platform === 'win32') {
        spawn('cmd', ['/c', 'start', workspacePath], { detached: true });
      } else if (process.platform === 'darwin') {
        spawn('open', [workspacePath], { detached: true });
      } else {
        spawn('xdg-open', [workspacePath], { detached: true });
      }
    } catch (err) {
      throw new Error(`Error opening workspace: ${parseError(err)}`);
    }
  }
}
