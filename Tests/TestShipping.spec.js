const { test, expect, chromium } = require('@playwright/test');

test('Shipping', async ({ page, context }) => {
// App Login
    await page.goto('https://test.addition.app/');
    await page.getByPlaceholder('shopname.myshopify.com').fill('addition-dev-jg.myshopify.com');
    await page.getByRole('button', { name: 'Login' }).click();
    await page.getByLabel('Email').fill('justine@thecommerce.co');
    await page.getByRole('heading', { name: 'Log in', exact: true }).click();
    await expect(page.getByRole('button', { name: 'Continue with Email' })).toBeEnabled();
    await page.getByRole('button', { name: 'Continue with Email' }).click();
    await page.getByLabel('Password', { exact: true }).fill('TCCP@ssw0rd123');
    await page.getByRole('button', { name: 'Log in' }).click();

// Storefront Login
    const storefront = await context.newPage();
    await storefront.goto('https://addition-dev-jg.myshopify.com/');
    await storefront.getByLabel('Enter store password').click();
    await storefront.getByLabel('Enter store password').fill('raclur');
    await storefront.getByRole('button', { name: 'Enter' }).click();
    await expect(storefront.getByRole('heading', { name: 'addition-dev-jg' }).getByRole('link')).toBeVisible();
    

//Order
    await storefront.getByRole('button', { name: 'Search' }).click();
    await storefront.getByPlaceholder('Search').fill('Basic Black Hoodie');
    await storefront.getByRole('link', { name: 'Basic Black Hoodie Basic Black Hoodie' }).click();
    await storefront.getByRole('button', { name: 'Add to cart' }).click();
    await storefront.getByRole('button', { name: 'Check out' }).click();
    await storefront.waitForLoadState('networkidle');
    // await expect(storefront.getByLabel('Breadcrumb').getByText('Information')).toBeVisible();
    await storefront.getByPlaceholder('Email or mobile phone number').fill('justine@thecommerce.co');
    await storefront.getByPlaceholder('First name (optional)').fill('Justine');
    await storefront.getByPlaceholder('Last name').fill('Garma');
    await storefront.getByPlaceholder('Address').click();
    await storefront.getByPlaceholder('Address').fill('Sydney');
    await expect(storefront.getByRole('option', { name: 'Sydney NSW, Australia', exact: true })).toBeVisible();
    await expect()
    await storefront.getByRole('option', { name: 'Sydney NSW, Australia', exact: true }).click();
    await storefront.getByPlaceholder('Postcode').fill('2000');
    await storefront.getByRole('button', { name: 'Continue to shipping' }).click();
    await page.pause();

    // await page.getByRole('link', { name: 'Orders' }).click();
    // await page.getByRole('link', { name: 'Rates' }).click();
    // await page.getByRole('link', { name: 'Fulfillments' }).click();
    // await page.getByRole('link', { name: 'Packaging' }).click();
    // await page.getByRole('link', { name: 'Products' }).click();


//     import { test, expect } from '@playwright/test';

//   await page.getByRole('button', { name: 'Search' }).click();
//   await page.getByPlaceholder('Search').fill('basic black hoodie');
//   await page.getByRole('link', { name: 'Basic Black Hoodie Basic Black Hoodie' }).click();
//   await page.getByRole('button', { name: 'Add to cart' }).click();
//   await page.getByRole('button', { name: 'Check out' }).click();
//   await page.getByPlaceholder('Email or mobile phone number').click();
//   await page.getByPlaceholder('Email or mobile phone number').fill('justine@thecommerce.co');
//   await page.getByPlaceholder('First name (optional)').fill('Justine');
//   await page.getByPlaceholder('Last name').fill('Garma');
//   await page.getByPlaceholder('Address').fill('Syd');
//   await page.getByLabel('Address', { exact: true }).fill('Sydney');
//   await page.getByRole('option', { name: 'Sydney NSW, Australia', exact: true }).click();
//   await page.getByPlaceholder('Postcode').click();
//   await page.getByPlaceholder('Postcode').fill('2000');
//   await page.getByRole('button', { name: 'Continue to shipping' }).click();
//   await page.locator('label').filter({ hasText: 'MyPost Test - Express PostEstimated delivery Monday, 21 Aug - Tuesday, 22 Aug. $' }).click();
//   await page.getByRole('button', { name: 'Continue to payment' }).click();
//   await page.frameLocator('iframe[name="card-fields-number-xebywuakbjd00000-scope-addition-dev-jg\\.myshopify\\.com"]').getByPlaceholder('Card number').click();
//   await page.frameLocator('iframe[name="card-fields-number-xebywuakbjd00000-scope-addition-dev-jg\\.myshopify\\.com"]').getByPlaceholder('Card number').fill('1');
//   await page.frameLocator('iframe[name="card-fields-name-s2monh2zyvg00000-scope-addition-dev-jg\\.myshopify\\.com"]').getByPlaceholder('Name on card').click();
//   await page.frameLocator('iframe[name="card-fields-name-s2monh2zyvg00000-scope-addition-dev-jg\\.myshopify\\.com"]').getByPlaceholder('Name on card').fill('Bogus Gateway');
//   await page.frameLocator('iframe[name="card-fields-expiry-7rc955k2nu300000-scope-addition-dev-jg\\.myshopify\\.com"]').getByPlaceholder('Expiration date (MM / YY)').click();
//   await page.frameLocator('iframe[name="card-fields-expiry-7rc955k2nu300000-scope-addition-dev-jg\\.myshopify\\.com"]').getByPlaceholder('Expiration date (MM / YY)').fill('12 / 24');
//   await page.frameLocator('iframe[name="card-fields-verification_value-eusa8bh16s400000-scope-addition-dev-jg\\.myshopify\\.com"]').getByPlaceholder('Security code').fill('1');
//   await page.getByRole('button', { name: 'Pay now' }).click();
//   await page.goto('https://addition-dev-jg.myshopify.com/checkouts/cn/c24c256bc2bae647b28fb432a9d94e53/thank_you');
//   await page.getByRole('link', { name: 'Continue shopping' }).click();
// });
    
});