import sequelize from "../src/database";
import models from "../src/models";

import config from "../src/config";


// const puppeteer = require('puppeteer');

(async () => {
    console.log(config.DatabaseConfigs)

    new models.Proxy();
    await sequelize.sync()
})()

// (async() => {
//     const browser = await puppeteer.launch({
//         args: [ '--proxy-server=20.191.183.123:3129' ],
//         headless: false
//     });
//     const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.82 Safari/537.36';
//
//     const page = await browser.newPage();
//     await page.setUserAgent(userAgent);
//     await page.goto('https://www.ipqualityscore.com/free-ip-lookup-proxy-vpn-test');
//     // await browser.close();
// })();
