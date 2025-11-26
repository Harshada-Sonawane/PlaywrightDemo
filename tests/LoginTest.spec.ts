// tests/loginOrderTest.spec.ts
import { test, expect } from "@playwright/test";
import testData from "../data/testData.json";
import { PageObjectManager } from "../pages/PageObjectManager";

for (const data of testData) {
    test(`Place order for ${data.productName}`, async ({ page }) => {

        const pom = new PageObjectManager(page);

        const login = pom.getLoginPage();
        const dashboard = pom.getDashboardPage();
        const cart = pom.getCartPage();
        const checkout = pom.getCheckoutPage();
        const orders = pom.getOrdersPage();
        const orderDetails = pom.getOrderDetailsPage();

        await login.goto();
        await login.login(data.email, data.password);

        await dashboard.addProductToCart(data.productName);
        await dashboard.goToCart();

        await cart.verifyProductInCart(data.productName);
        await cart.checkout();

        await checkout.selectCountry("India");
        await checkout.placeOrder();

        const orderId = (await checkout.getOrderId())!.trim();
        console.log("order Id: ", orderId);

        await dashboard.goToMyOrders();

        await orders.openOrder(orderId);

        const orderIdDetails = await orderDetails.getOrderIdFromDetails();
        expect(orderId.includes(orderIdDetails!)).toBeTruthy();
    });
}
