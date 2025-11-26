import { test, expect } from '@playwright/test';


test('Login Test', async ({ page }) => {
   const productname = "ADIDAS ORIGINAL";
   const products = page.locator(".card-body");
   await page.goto("https://rahulshettyacademy.com/client");
   await page.locator("#userEmail").fill("harshada@email.com");
   await page.locator("#userPassword").fill("Puja@2510");
   await page.locator("#login").click();
   await page.waitForLoadState("networkidle");
   await page.locator(".card-body b").first().waitFor();
   const titles = await page.locator(".card-body b").allTextContents();
   console.log(titles);
   const count = await products.count();
   for (let i = 0; i < count; ++i) {
      if (await products.nth(i).locator("b").textContent() === productname) {
         await products.nth(i).locator("text= Add To Cart").click();
         break;
      }
   }
   await page.locator("[routerlink*='cart']").click();
   await page.locator(".cart li").waitFor();
   const flag = await page.locator('h3:has-text("ADIDAS ORIGINAL")').isVisible();
   console.log(flag)
   expect(flag).toBeTruthy();
   await page.locator("//button[normalize-space()='Checkout']").click();

   await page.locator("input[placeholder='Select Country']").pressSequentially("ind", { delay: 100 })

   const options = page.locator(".ta-results.list-group.ng-star-inserted");
   await options.waitFor();

   const countries = options.locator(".ta-item");
   // console.log(countries)

   const optionSize = await countries.count();

   for (let i = 0; i < optionSize; ++i) {
      if ((await countries.nth(i).textContent())?.trim() === "India") {
         await countries.nth(i).click();
         break;
      }
   }

   await page.locator("//a[normalize-space()='Place Order']").click();

   const thankYou = page.locator('h1').filter({ hasText: 'THANKYOU FOR THE ORDER.' })
   await expect(thankYou).toBeVisible();

   const orderId = await page.locator("label[class='ng-star-inserted']").textContent();


   await page.locator("//button[@routerlink='/dashboard/myorders']").click();
   await page.locator("tbody").waitFor();
   const rows = page.locator("tbody tr");
   for (let i = 0; i < await rows.count(); i++) {

      const rowOrderId = await rows.nth(i).locator("th").textContent();
      if (orderId?.includes(rowOrderId!)) {
         console.log("in loop")
         await rows.nth(i).locator("button").first().click();
         break;
      }
   }

   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId!.includes(orderIdDetails!)).toBeTruthy();


   // await page.waitForTimeout(5000)

});