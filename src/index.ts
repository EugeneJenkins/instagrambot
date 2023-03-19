import config from "./config";
import Instagram from "./library/Instagram";


(async () => {
    const instagram = new Instagram(false);
    await instagram.run();
    await instagram.login(config.InstagramConfigs.username, config.InstagramConfigs.password)
})()
