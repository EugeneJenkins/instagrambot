import config from "./config";
import Instagram from "./library/Instagram";
import FileSessionManager from "./management/SessionManager/FileSessionManager";
import {sleep} from "./Utils/CommonUtils";


(async () => {
    const instagram = new Instagram(false);
    const sessionManager = new FileSessionManager()

    await instagram.run();

    if (sessionManager.isExistSession()) {
        await instagram.setSession(...sessionManager.getSession())
    } else {
        await instagram.login(config.InstagramConfigs.username, config.InstagramConfigs.password)
        await sessionManager.setSession(await instagram.getSession())
    }

    await sleep(2);
    const user = await instagram.findUser('eugene_jenkins_');
    await user.getFirstFollowers(50)
})()