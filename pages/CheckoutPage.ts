// pages/CheckoutPage.ts
import { Locator, Page } from "@playwright/test";

export class CheckoutPage {

    private countryInput: Locator;
    private countryOptions: Locator;
    private placeOrderBtn: Locator;
    private thankYouMessage: Locator;
    private orderIdLabel: Locator;

    constructor(private page: Page) {
        this.countryInput = this.page.locator("input[placeholder='Select Country']");
        this.countryOptions = this.page.locator(".ta-item");
        this.placeOrderBtn = this.page.locator("//a[normalize-space()='Place Order']");
        this.thankYouMessage = this.page.locator("h1");
        this.orderIdLabel = this.page.locator("label.ng-star-inserted");
    }



    async selectCountry(country: string) {
        await this.countryInput.pressSequentially(country.substring(0, 3), { delay: 100 });
        await this.countryOptions.first().waitFor();

        const count = await this.countryOptions.count();
        for (let i = 0; i < count; i++) {
            if ((await this.countryOptions.nth(i).textContent())?.trim() === country) {
                await this.countryOptions.nth(i).click();
                break;
            }
        }
    }

    async placeOrder() {
        await this.placeOrderBtn.click();
    }

    async getOrderId() {
        await this.thankYouMessage.waitFor();
        return await this.orderIdLabel.textContent();
    }
}
