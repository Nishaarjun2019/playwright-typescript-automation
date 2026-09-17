//const { test, expect } = require('@playwright/test');
//import { test, expect } from '@playwright/test';
import { expect } from '@playwright/test';
import { test } from './tests/fixtures/test-fixture';
test('Filter and sort products', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');

    await page.locator('#login-button').click();

    await expect(page).toHaveURL(/inventory.html/);

    await expect(page.locator('.title')).toHaveText('Products');

    // Sort products by Price: Low to High
    await page.locator('.product_sort_container').selectOption('lohi');

    // Extract all displayed prices
    const priceElements = page.locator('.inventory_item_price');

    const priceTexts = await priceElements.allTextContents();

    // Convert price strings to numbers
    const prices = priceTexts.map(price =>
        parseFloat(price.replace('$', ''))
    );

});