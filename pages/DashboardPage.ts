// pages/DashboardPage.ts
import { Page } from "@playwright/test";

export class DashboardPage {

    private products;
    private cartIcon;
    private myOrdersBtn;

    constructor(private page: Page) {
        this.products = this.page.locator(".card-body");
        this.cartIcon = this.page.locator("[routerlink*='cart']");
        this.myOrdersBtn = this.page.locator("//button[@routerlink='/dashboard/myorders']");
    }

    async addProductToCart(productName: string) {
        const count = await this.products.count();

        for (let i = 0; i < count; i++) {
            if (await this.products.nth(i).locator("b").textContent() === productName) {
                await this.products.nth(i).locator("text= Add To Cart").click();
                break;
            }
        }
    }

    async goToCart() {
        await this.cartIcon.click();
    }

    async goToMyOrders() {
        await this.myOrdersBtn.click();
    }

}
