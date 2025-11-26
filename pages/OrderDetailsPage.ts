// pages/OrderDetailsPage.ts
import { Locator, Page } from "@playwright/test";

export class OrderDetailsPage {

    private orderIdText:Locator;

    constructor(private page: Page) {
        this.orderIdText = this.page.locator(".col-text");
    }

    async getOrderIdFromDetails() {
        return (await this.orderIdText.textContent())?.trim();
    }
}
