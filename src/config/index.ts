require('dotenv').config()

import DatabaseConfigs from "./DatabaseConfigs";
import InstagramConfigs from "./InstagramConfigs";
import PuppeteerConfigs from "./PuppeteerConfigs";
import AppConfigs from "./AppConfigs";

export default {
    InstagramConfigs,
    PuppeteerConfigs,
    AppConfigs,
    DatabaseConfigs
};