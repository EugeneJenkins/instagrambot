const PuppeteerConfigs = {
    headless: (process.env["PUPPETEER_HEADLES"] ?? '').toUpperCase() === 'TRUE'
}

export default PuppeteerConfigs