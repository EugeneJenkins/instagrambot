import Instagram from "./index";

/**
 * Этот класс используется для авторизации.
 * Рекомендация: После авторизации сохраните сессию в хранилище и последующие запуски, используйте сохраненную сессию.
 */
class InstagramLogin {
    private readonly page;

    constructor(page) {
        this.page = page;
    }

    public async auth(username: string, password: string) {
        await this.page.goto(Instagram.endpoint + 'accounts/login/');
        await this.page.waitForSelector(this.getLoginSelector());
        await this.setLogin(username);
        await this.setPassword(password);
        await this.submit();
    }

    private getLoginSelector(): string {
        return '[name="username"]';
    }

    private getPasswordSelector(): string {
        return '[name="password"]';
    }

    private async setLogin(username: string): Promise<void> {
        await this.page.type(this.getLoginSelector(), username);
    }

    private async setPassword(password: string): Promise<void> {
        await this.page.type(this.getPasswordSelector(), password);
    }

    private async submit(): Promise<void> {
        await Promise.all([
            this.page.waitForNavigation(),
            this.page.click('[type="submit"]')
        ]);
    }
}

export default InstagramLogin;