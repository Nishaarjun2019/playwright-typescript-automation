import { test, expect } from './tests/fixtures/base';

test('Complete SauceDemo Purchase', async ({ page, login }) => {

  // Add first product
  await page.locator('[data-test^="add-to-cart"]').nth(0).click();

  // Add second product
  await page.locator('[data-test^="add-to-cart"]').nth(1).click();

  // Verify cart
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('2');

  // Go to cart
  await page.locator('.shopping_cart_link').click();

  await expect(page).toHaveURL(/cart.html/);

  // Verify two products
  await expect(
    page.locator('.cart_item')
  ).toHaveCount(2);

  // Checkout
  await page.locator('[data-test="checkout"]').click();

  // Fill details
  await page.locator('[data-test="firstName"]').fill('John');
  await page.locator('[data-test="lastName"]').fill('Doe');
  await page.locator('[data-test="postalCode"]').fill('110001');

  await page.locator('[data-test="continue"]').click();

  // Verify overview
  await expect(page).toHaveURL(/checkout-step-two.html/);

  await expect(
    page.locator('.title')
  ).toHaveText('Checkout: Overview');

  await expect(
    page.locator('.cart_item')
  ).toHaveCount(2);

  // Finish
  await page.locator('[data-test="finish"]').click();

  // Verify confirmation
  await expect(
    page.locator('[data-test="complete-header"]')
  ).toHaveText('Thank you for your order!');
});