import puppeteer, {Page, Protocol} from "puppeteer";
import InstagramLogin from "./InstagramLogin";


class Instagram {
    public static endpoint = 'https://www.instagram.com/';

    public instagramLogin: InstagramLogin
    private readonly headless: boolean;
    private page: Page;

    // private session: array;

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
}

export default Instagram;