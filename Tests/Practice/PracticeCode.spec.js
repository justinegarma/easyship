const { test, expect, chromium } = require('@playwright/test');

test('Practice Automation', async ({ page, context }) => {
    await page.goto('https://admin.shopify.com/store/slidecart-test-analytics3/');
    await page.getByLabel('Email').fill('justine@thecommerce.co');
    await page.getByRole('heading', { name: 'Log in', exact: true }).click();
    await page.getByRole('heading', { name: 'Log in', exact: true }).click(); //To display link
    await expect(page.getByRole('button', { name: 'Continue with Email' })).toBeEnabled();
    await page.getByRole('button', { name: 'Continue with Email' }).click();
    await page.getByLabel('Password', { exact: true }).fill('TCCP@ssw0rd123');
    await page.getByRole('button', { name: 'Log in' }).click();
});