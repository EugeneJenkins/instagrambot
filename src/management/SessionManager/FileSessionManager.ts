import fs from "fs";
import {SessionManagerInterfaces} from "./Interfaces";
import config from "../../config";

class FileSessionManager implements SessionManagerInterfaces {
    public getSession(): any {
        return JSON.parse(fs.readFileSync(this.getFile(), 'utf8'));
    }

    public setSession(session) {
        fs.writeFileSync(this.getFile(), JSON.stringify(session));
    }

    isExistSession(): boolean {
        return fs.existsSync(this.getFile());
    }

    private getPath(): string {
        return config.AppConfigs.sessionPath;
    }

    private getSessionFileName(): string {
        return 'cookies.json';
    }

    private getFile(): string {
        return this.getPath() + this.getSessionFileName()
    }
}

export default FileSessionManager;