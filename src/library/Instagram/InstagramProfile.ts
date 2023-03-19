import {Page} from "puppeteer";
import Instagram from "./index";
import InstagramDirectMessage from "./InstagramDirectMessage";

class InstagramProfile {
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    public async findUser(userName: string): Promise<void> {
        await this.page.goto(Instagram.endpoint + userName);
    }

    public async directMessage() {
        const instagramDirectMessage = new InstagramDirectMessage(this.page);
        await instagramDirectMessage.sendMessage('Test11')
    }
}

export default InstagramProfile;