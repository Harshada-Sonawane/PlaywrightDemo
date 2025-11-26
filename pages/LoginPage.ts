// pages/LoginPage.ts
import { Locator, Page } from "@playwright/test";

export class LoginPage {

    private email: Locator;
    private password: Locator;
    private loginBtn: Locator;

    constructor(private page: Page) {
        this.email = this.page.locator("#userEmail");
        this.password = this.page.locator("#userPassword");
        this.loginBtn = this.page.locator("#login");
    }


    async goto() {
        await this.page.goto("https://rahulshettyacademy.com/client");
    }

    async login(email: string, pass: string) {
        await this.email.fill(email);
        await this.password.fill(pass);
        await this.loginBtn.click();
        await this.page.waitForLoadState("networkidle");
    }
}
