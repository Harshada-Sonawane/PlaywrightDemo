// tests/loginOrderTest.spec.ts
import { test, expect } from "@playwright/test";

import { PageObjectManager } from "../pages/PageObjectManager";

test("Place order", async ({ page }) => {

    const pom = new PageObjectManager(page);

    const login = pom.getLoginPage();
    const dashboard = pom.getDashboardPage();
    const cart = pom.getCartPage();
    const checkout = pom.getCheckoutPage();
    const orders = pom.getOrdersPage();
    const orderDetails = pom.getOrderDetailsPage();

    const productName = "ADIDAS ORIGINAL";
    const email = "harshada@email.com";
    const pwd = "Puja@2510";


    await login.goto();
    await login.login(email, pwd);

    await dashboard.addProductToCart(productName);
    await dashboard.goToCart();

    await cart.verifyProductInCart(productName);
    await cart.checkout();

    await checkout.selectCountry("India");
    await checkout.placeOrder();

    const orderId = (await checkout.getOrderId())!.trim();
    console.log("order Id: ",orderId);

    await dashboard.goToMyOrders();

    await orders.openOrder(orderId);

    const orderIdDetails = await orderDetails.getOrderIdFromDetails();
    expect(orderId.includes(orderIdDetails!)).toBeTruthy();
});
