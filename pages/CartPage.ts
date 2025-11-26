// pages/CartPage.ts
import { Locator, Page, expect } from "@playwright/test";

export class CartPage {

    private cartItems: Locator;
    private checkoutBtn: Locator;

    constructor(private page: Page) {
        this.cartItems = this.page.locator(".cart li");
        this.checkoutBtn = this.page.locator("//button[normalize-space()='Checkout']");
    }

    async verifyProductInCart(productName: string) {
        await this.cartItems.first().waitFor();
        const flag = await this.page.locator(`h3:has-text("${productName}")`).isVisible();
        expect(flag).toBeTruthy();
    }

    async checkout() {
        await this.checkoutBtn.click();
    }
}
