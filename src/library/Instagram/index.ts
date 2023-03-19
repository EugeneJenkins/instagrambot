import puppeteer, {Page, Protocol} from "puppeteer";
import InstagramLogin from "./InstagramLogin";
import InstagramProfile from "./InstagramProfile";


class Instagram {
    public static endpoint = 'https://www.instagram.com/';

    private readonly headless: boolean;
    private page: Page;

    constructor(headless = true) {
        this.headless = headless;
    }

    public async run() {
        const browser = await puppeteer.launch({headless: this.headless});
        this.page = await browser.newPage();
    }

    public async getSession(): Promise<Protocol.Network.Cookie[]> {
        return await this.page.cookies();
    }

    public async setSession(...session) {
        await this.page.setCookie(...session);
    }

    public async login(username: string, password: string): Promise<void> {
        const login = new InstagramLogin(this.page);
        await login.auth(username, password);
    }

    public async findUser(userName: string): Promise<InstagramProfile> {
        const profile = new InstagramProfile(this.page);
        await profile.findUser(userName);

        return profile;
    }
}

export default Instagram;