import {ElementHandle, Page} from "puppeteer";
import {sleep} from "../../Utils/CommonUtils";

class InstagramDirectMessage {
    private readonly messageSelector = '.xjqpnuy';
    private readonly textBoxSelector = 'textarea[placeholder="Message..."]';
    private readonly sendBtnSelector = '._acrb ._acan';

    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async sendMessage(message: string) {
        const messageButton = await this.getMessageButton();

        if (!messageButton) {
            console.log('Cant find message btn')
            return;
        }

        await messageButton.click();
        await sleep(2);

        await this.writeText(message);
        await sleep(2);
        await this.send();
    }

    //TODO check if it possible
    private async openDirectMessage(): Promise<void> {
        const msgButton = await this.getMessageButton()

        if (msgButton) {
            await msgButton.click();
        }
    }

    private async getMessageButton() {
        await this.page.waitForSelector(this.messageSelector)

        await sleep(2)

        return await this.page.$(this.messageSelector);
    }

    private async writeText(message: string): Promise<void> {
        await this.page.waitForSelector(this.messageSelector);
        const textarea = await this.page.$(this.textBoxSelector);

        await textarea.type(message);
    }

    private async send(): Promise<void> {
        await this.page.$eval(this.sendBtnSelector, (button: HTMLElement) => button.click());
    }
}

export default InstagramDirectMessage;
