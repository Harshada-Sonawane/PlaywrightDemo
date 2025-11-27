// pages/OrdersPage.ts
import { Locator, Page } from "@playwright/test";

export class OrdersPage {
    private rows: Locator;

    constructor(private page: Page) {
        this.rows = this.page.locator("tbody tr");
    }

    async openOrder(orderId: string) {
        await this.page.locator("tbody").waitFor();

        const rowCount = await this.rows.count();

        for (let i = 0; i < rowCount; i++) {
            const rowOrderId = (await this.rows.nth(i).locator("th").textContent())?.trim();
            if (orderId?.includes(rowOrderId!)) {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        }
    }

    async deleteAllOrders() {
        await this.page.locator("tbody").waitFor();
        const rowCount = await this.rows.count();
        for (let i = 0; i < rowCount; i++) {
            await this.rows.nth(i).locator("button").last().click();
        }
    }
}