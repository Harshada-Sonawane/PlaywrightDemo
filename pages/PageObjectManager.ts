import { Page } from "@playwright/test";
import { LoginPage } from "./LoginPage";
import { DashboardPage } from "./DashboardPage";
import { CartPage } from "./CartPage";
import { CheckoutPage } from "./CheckoutPage";
import { OrdersPage } from "./OrdersPage";
import { OrderDetailsPage } from "./OrderDetailsPage";

export class PageObjectManager {

    public loginPage: LoginPage;
    public dashboardPage: DashboardPage;
    public cartPage: CartPage;
    public checkoutPage: CheckoutPage;
    public ordersPage: OrdersPage;
    public orderDetailsPage: OrderDetailsPage;

    constructor(private page: Page) {
        this.loginPage = new LoginPage(page);
        this.dashboardPage = new DashboardPage(page);
        this.cartPage = new CartPage(page);
        this.checkoutPage = new CheckoutPage(page);
        this.ordersPage = new OrdersPage(page);
        this.orderDetailsPage = new OrderDetailsPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }

    getDashboardPage() {
        return this.dashboardPage;
    }

    getCartPage() {
        return this.cartPage;
    }

    getCheckoutPage() {
        return this.checkoutPage;
    }

    getOrdersPage() {
        return this.ordersPage;
    }

    getOrderDetailsPage() {
        return this.orderDetailsPage;
    }
}
