const { test, expect, chromium } = require('@playwright/test');

test('Rewards and Free Gifts', async ({page, context}) => {
  test.setTimeout(120000);

  // Alternate Login
  await page.goto('https://admin.shopify.com/store/slidecart-test-analytics3/');
  await page.getByLabel('Email').fill('justine@thecommerce.co');
  await page.getByRole('heading', { name: 'Log in', exact: true }).click();
  await page.getByRole('heading', { name: 'Log in', exact: true }).click(); //To display link
  await expect(page.getByRole('button', { name: 'Continue with Email' })).toBeEnabled();
  await page.getByRole('button', { name: 'Continue with Email' }).click();
  await page.getByLabel('Password', { exact: true }).fill('TCCP@ssw0rd123');
  await page.getByRole('button', { name: 'Log in' }).click();

  //Merchant App - App Enable
  await page.getByRole('link', { name: 'Slide Cart & Cart Upsell - TCC Slide Cart & Cart Upsell - TCC' }).click();
  await expect(page.frameLocator('iframe[name="app-iframe"]').getByLabel('Enable basic upsell')).toBeVisible({timeout: 10000});
  await expect(page.frameLocator('iframe[name="app-iframe"]').locator('//div[@id="MainPane"]/div[2]//div[@class = "toggle-switch"]')).toBeVisible();
  await page.frameLocator('iframe[name="app-iframe"]').locator('//div[@id="MainPane"]/div[2]//div[@class = "toggle-switch"]').click();

  //Storefront Login
  const storefront = await context.newPage();
  await storefront.goto('https://slidecart-test-analytics3.myshopify.com/');
  await storefront.getByLabel('Enter store password').click();
  await storefront.getByLabel('Enter store password').fill('tufray');
  await storefront.getByRole('button', { name: 'Enter' }).click();



  import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://shopify.dev/');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.getByLabel('Email').click();
  await page.getByLabel('Email').fill('justine@thecommerce.co');
  await page.getByRole('button', { name: 'Continue with email' }).click();
  await page.getByLabel('Password', { exact: true }).fill('TCCP@ssw0rd123');
  await page.getByLabel('Password', { exact: true }).press('Enter');
  await page.getByRole('link', { name: 'Ap App HQ Pte. Ltd. Right arrow' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.locator('[id="\\37 1005962526"]').getByRole('button', { name: 'Log in' }).click();
  const page1 = await page1Promise;
  await page1.goto('https://slidecart-test-analytics3.myshopify.com/admin');
  await page1.goto('https://admin.shopify.com/login?returnPath=%2Fstore%2Fslidecart-test-analytics3%2F&login_hint=justine%40thecommerce.co');
  await page1.goto('https://admin.shopify.com/auth/callback?code=amxzdmpoSEE1Wlh3WjVGQWFyWVNCNlN6Ykg3SFlVajM0UGp3dGdQZVJwZjJkdXR0T2xoNWl3QVNTemNuK2FYMFEyaDZDLzRwVmRpZHBtNEZUeXk3bFNBNmd4Tk9zMXZaNWxJdmZOdUthRFZJV3dTSEllb1h6WVNhOWJLTUdqdVI1N0RZSWFndkdJZ21KS2JGbm15VkFvaVpzY0hvNm8ycnJERWxlV3ZtMDNRM3Fqb1kwWUdNdnkzWkFjaVJFZ05HRk5mQlZwQi8zT3R6VjBLVEUyOFA2S09UZ1pQRUNCNk14eHUwSi9tN0VTZ1lVNGh2Y2pVNXR4ZExsRll5ek40MXgxeFNxL0VIdkxiRS8xWFk0L1pBTXBxeWVlZzFFSWtjTlB6UzZ0NDdscjg9LS1yZzFIdmpHdlFiWko2QXhPLS02U1U3RFFMb3gwYXlqTHV1bnlSd3JRPT0&state=277d4c8c57cb5c3b5edb35e9b392c177');
  await page1.goto('https://admin.shopify.com/store/slidecart-test-analytics3/');
  await page1.getByRole('link', { name: 'Slidecart - staging Slidecart - staging' }).click();
  await page1.getByRole('link', { name: 'Free Gift' }).click();
  await page1.getByRole('link', { name: 'Plan' }).click();
  await page1.frameLocator('iframe[name="app-iframe"]').locator('div').filter({ hasText: /^Start Free TrialOur Most Popular Plan! 🔥$/ }).getByRole('button').click();
  await page1.getByRole('button', { name: 'Approve' }).click();
  await page1.goto('https://slidecart-test-analytics3.myshopify.com/admin/apps/slidecart-staging-1');
  await page1.getByRole('link', { name: 'Plan' }).click();
  await page1.getByRole('link', { name: 'Free Gift' }).click();
  await page1.frameLocator('iframe[name="app-iframe"]').locator('div').filter({ hasText: /^Customer BuysChoose Product\(s\)$/ }).getByRole('button').click();
  await page1.getByPlaceholder('Search products').click();
  await page1.getByPlaceholder('Search products').fill('Product 1');
  await page1.getByText('Product 1Product 197 available$100.00').click();
  await page1.getByRole('button', { name: 'Add' }).click();
  await page1.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Choose Product(s)' }).click();
  await page1.getByPlaceholder('Search products').fill('Product 2');
  await page1.getByLabel('Select: Product 2', { exact: true }).click();
  await page1.getByRole('button', { name: 'Add' }).click();
  await page1.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Create Buy X get Y Combo' }).click();
  await page1.frameLocator('iframe[name="app-iframe"]').locator('div').filter({ hasText: /^Customer BuysChoose Product\(s\)$/ }).getByRole('button').click();
  await page1.getByPlaceholder('Search products').click();
  await page1.getByPlaceholder('Search products').fill('Product A');
  await page1.getByText('Product A').nth(2).click();
  await page1.getByRole('button', { name: 'Add' }).click();
  await page1.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Choose Product(s)' }).click();
  await page1.getByPlaceholder('Search products').fill('Product B');
  await page1.getByLabel('Select: Product B').click();
  await page1.getByRole('button', { name: 'Add' }).click();
  await page1.frameLocator('iframe[name="app-iframe"]').getByTestId('BxGyCreateForm').getByText('% off').click();
  await page1.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Create Buy X get Y Combo' }).click();
  await page1.frameLocator('iframe[name="app-iframe"]').getByLabel('Enable Buy X get Y').uncheck();
  await page1.frameLocator('iframe[name="app-iframe"]').getByLabel('Enable Buy X get Y').check();
  await page1.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Save' }).click();
});
});