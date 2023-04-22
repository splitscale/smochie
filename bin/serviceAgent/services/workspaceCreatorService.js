import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { parseError } from '../../core/util/parseError.js';
import { Folder } from '../../core/folder/folder.js';
export class WorkspaceServiceImpl {
    constructor(workspaceName, currentPath) {
        this.workspaceName = workspaceName;
        this.currentPath = currentPath;
    }
    createWorkspace() {
        const folders = this.getFoldersInCurrentPath();
        if (folders.length === 0) {
            throw new Error('No folders found in the current directory.');
        }
        const workspacePath = path.join(this.currentPath, `${this.workspaceName}.code-workspace`);
        const workspaceData = {
            folders,
        };
        try {
            fs.writeFileSync(workspacePath, JSON.stringify(workspaceData, null, 4));
        }
        catch (err) {
            throw new Error(`Error creating workspace file: ${parseError(err)}`);
        }
        console.log(`Workspace created: ${workspacePath}`);
        try {
            this.openWorkspace(workspacePath);
        }
        catch (err) {
            console.log(`Error opening workspace: ${parseError(err)}`);
        }
    }
    getFoldersInCurrentPath() {
        const folders = [];
        try {
            const dirs = fs.readdirSync(this.currentPath, { withFileTypes: true });
            for (const dir of dirs) {
                if (dir.isDirectory()) {
                    const folderPath = path.join(this.currentPath, dir.name);
                    const folderName = dir.name;
                    folders.push(new Folder(folderName, folderPath));
                }
            }
        }
        catch (err) {
            throw new Error(`Error reading current directory: ${parseError(err)}`);
        }
        return folders;
    }
    openWorkspace(workspacePath) {
        try {
            spawn('code', [workspacePath], { detached: true });
        }
        catch (err) {
            throw new Error(`Error opening workspace: ${parseError(err)}`);
        }
    }
}
