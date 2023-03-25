import {Page} from "puppeteer";
import InstagramDirectMessage from "./InstagramDirectMessage";
import Instagram from "../index";
import {sleep} from "../../../Utils/CommonUtils";

class InstagramProfile {
    private readonly page: Page;
    private followersCount: number;
    private followingsCount: number;
    private postCount: number;

    constructor(page: Page) {
        this.page = page;
    }

    public async findUser(userName: string): Promise<InstagramProfile> {
        await this.page.goto(Instagram.endpoint + userName);
        await this.parseUserData();

        return this;
    }

    public async directMessage() {
        const instagramDirectMessage = new InstagramDirectMessage(this.page);
        await instagramDirectMessage.sendMessage('Test11')
    }

    private async parseUserData(): Promise<void> {
        await this.parseFollowersRow();
    }

    private getFollowersRowSelector(): string {
        return '._aacl._aaco._aacu._aacy._aad6._aadb._aade';
    }

    private async parseFollowersRow(): Promise<void> {
        await this.page.waitForSelector(this.getFollowersRowSelector());

        const linkTexts = await this.page.$$eval(
            this.getFollowersRowSelector(),
            elements => elements.map(item => item.textContent)
        );

        this.postCount = parseInt(linkTexts[0]);
        this.followersCount = parseInt(linkTexts[1]);
        this.followingsCount = parseInt(linkTexts[2]);
    }

    public getFollowersCount(): number {
        return this.followersCount;
    }

    public getFollowingCount(): number {
        return this.followingsCount;

    }

    public getPostCount(): number {
        return this.postCount;
    }

    public async getOpenModalFollowersCount() {


        let followersSelector = '.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1pi30zi.x1swvt13.xwib8y2.x1y1aw1k.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1';

        await this.page.waitForSelector('._aano')

        return (await this.page.$$(followersSelector)).length
    }

    private async scrollFollowers(): Promise<void> {
        let modalSelector = '._aano';

        await this.page.waitForSelector(modalSelector)

        await this.page.evaluate(() => {
            const modal = document.querySelector('._aano');
            modal.scrollBy(0, 1000);
        });
    }

    public async getFirstFollowers(count: number): Promise<Array<string>> {
        await this.openFollowersModal();

        let prevFollowersCount = 0;

        while (true) {
            await this.scrollFollowers();
            await sleep(3)

            let tmp = await this.getOpenModalFollowersCount();

            if (tmp === prevFollowersCount || count <= tmp) {
                break;
            }

            prevFollowersCount = tmp;
        }

        return await this.getAllFollowersIdFromModal();
    }

    private async openFollowersModal(): Promise<void> {
        const row = await this.page.$$(this.getFollowersRowSelector());

        // await sleep(2);
        await row[1].click()
    }

    private getFollowerNameSelector(): string {
        return '.x9f619.xjbqb8w.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.x1q0g3np.xqjyukv.x1qjc9v5.x1oa3qoh.x1nhvcw1'
    }

    private async getAllFollowersIdFromModal(): Promise<Array<string>> {
        const all = await this.page.$$(this.getFollowerNameSelector())
        const followersArray = [];

        for (const div of all) {
            followersArray.push(await div.evaluate(div => div.textContent));
        }

        return followersArray;
    }
}

export default InstagramProfile;