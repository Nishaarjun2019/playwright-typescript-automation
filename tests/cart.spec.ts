import { expect } from '@playwright/test';
import { test } from '../fixtures/test-fixture';
import { Product } from '../interfaces/product';

const products: Product[] = [
    {
        name: 'Sauce Labs Backpack',
        addToCartLocator: '[data-test="add-to-cart-sauce-labs-backpack"]',
        removeFromCartLocator: '[data-test="remove-sauce-labs-backpack"]'
    },
    {
        name: 'Sauce Labs Bike Light',
        addToCartLocator: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        removeFromCartLocator: '[data-test="remove-sauce-labs-bike-light"]'
    }
];
test('Add, remove product and logout', async ({ loggedInPage }) => {

    // Add products
    for (const product of products) {
        await loggedInPage
            .locator(product.addToCartLocator)
            .click();
    }

    // Verify 2 products in cart
    await expect(
        loggedInPage.locator('.shopping_cart_badge')
    ).toHaveText('2');

    // Open cart
    await loggedInPage
    .locator('.shopping_cart_link')
    .click();

   
    // Verify product names
for (const product of products) {
    await expect(
        loggedInPage
            .locator('.inventory_item_name')
            .filter({ hasText: product.name })
    ).toBeVisible();
}

    // Remove Backpack
    await loggedInPage
        .locator(products[0].removeFromCartLocator)
        .click();

    // Verify only 1 product remains
    await expect(
        loggedInPage.locator('.cart_item')
    ).toHaveCount(1);

    // Logout
    await loggedInPage
        .locator('#react-burger-menu-btn')
        .click();

    await loggedInPage
        .locator('#logout_sidebar_link')
        .click();

    // Verify logout
    await expect(
        loggedInPage.locator('#login-button')
    ).toBeVisible();
});