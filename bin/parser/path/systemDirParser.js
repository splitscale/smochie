import os from 'os';
export class SystemDirParser {
    static format(path) {
        const platform = os.platform();
        let formattedPath = path;
        if (platform === 'win32') {
            formattedPath = formattedPath.replace(/\//g, '\\');
        }
        else if (platform === 'darwin' ||
            platform === 'aix' ||
            platform === 'freebsd' ||
            platform === 'linux' ||
            platform === 'openbsd' ||
            platform === 'sunos') {
            formattedPath = formattedPath.replace(/\\/g, '/');
        }
        else {
            formattedPath = formattedPath.replace(/\\/g, '/');
        }
        return formattedPath;
    }
}
