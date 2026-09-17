import { test as base, expect } from '@playwright/test';

type MyFixtures = {
  login: void;
};

export const test = base.extend<MyFixtures>({
  login: async ({ page }, use) => {

    // Open SauceDemo
    await page.goto('https://www.saucedemo.com/');

    // Username
    await page.locator('#user-name').fill('standard_user');

    // Password
    await page.locator('#password').fill('secret_sauce');

    // Login
    await page.locator('#login-button').click();

    // Verify login
    await expect(page).toHaveURL(/inventory.html/);

    await expect(
      page.locator('.title')
    ).toHaveText('Products');

    // Run the test
    await use();

    // Logout
    await page.locator('#react-burger-menu-btn').click();

    await page.locator('#logout_sidebar_link').click();

    // Verify logout
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  },
});

export { expect };