// import { test, expect , chromium} from '@playwright/test';

const { test, expect, chromium } = require('@playwright/test');

test('Basic Upsells', async ({page, context}) => {
  test.setTimeout(120000);

// Login script
//   await page.goto('https://shopify.dev/');
//   await page.getByRole('link', { name: 'Log in' }).click();
//   await page.getByLabel('Email').click();
//   await page.getByLabel('Email').fill('justine@thecommerce.co');
//   await page.getByRole('heading', { name: 'Log in', exact: true }).click(); //To display link
//   await expect(page.getByRole('button', { name: 'Continue with Email' })).toBeEnabled();
//   await expect(page.locator('//form[@id="account_lookup"]/div[1]/div/p/span')).toBeVisible(true);
//   await page.getByRole('button', { name: 'Continue with Email' }).click();
//   await page.getByLabel('Password', { exact: true }).fill('TCCP@ssw0rd123');
//   await page.getByRole('button', { name: 'Log in' }).click();
//   await page.getByRole('link', { name: 'Ap App HQ Pte. Ltd. Right arrow' }).click();

// Store Login
//   await page.getByRole('link', { name: 'Stores', exact: true }).click();
//   await page.getByPlaceholder('Filter stores').click();
//   await page.getByPlaceholder('Filter stores').fill('slidecart-test-analytics3');
// //   const page1Promise = page.waitForEvent('popup');  //idk
//   await page.locator('[id="\\37 1005962526"]').getByRole('button', { name: 'Log in' }).click();
// //   await expect(page.getByRole('link', { name: 'JG Justine Garma justine@thecommerce.co' })).toBeVisible({timeout: 10000});
// //   await page.getByRole('link', { name: 'JG Justine Garma justine@thecommerce.co' }).click();
// //   const page1 = await page1Promise; //idk

// App Installation
//   await page.getByRole('link', { name: 'Apps' }).click();
//   await page.getByPlaceholder('Search for apps by title, ID, or API key').click();
//   await page.getByPlaceholder('Search for apps by title, ID, or API key').fill('Slidecart - staging');
//   await page.getByRole('button', { name: 'Search' }).click();
//   await page.getByRole('link', { name: 'Slidecart - staging' }).click();
//   await page.getByRole('link', { name: 'Select store' }).click();
//   await page.getByPlaceholder('Filter stores').click();
//   await page.getByPlaceholder('Filter stores').fill('slidecart-test-analytics3');
//   await page.locator('#slidecart-test-analytics3').getByText('Install app').click();
//   await expect(page.getByRole('link', { name: 'JG Justine Garma justine@thecommerce.co' })).toBeVisible();
//   await page.getByRole('link', { name: 'JG Justine Garma justine@thecommerce.co' }).click();
//   await page.getByRole('button', { name: 'Install app' }).first().click();
//   await page.getByRole('link', { name: 'JG Justine Garma justine@thecommerce.co' }).click();
//   await page.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Get Started' }).click();
//   await page.frameLocator('iframe[name="app-iframe"]').locator('#MainPane').getByRole('banner').locator('div').filter({ hasText: /^App disabled$/ }).locator('span').click();

// App Uninstall
//   await page1.getByRole('link', { name: 'Settings' }).click();
//   await page1.getByRole('link', { name: 'Apps and sales channels' }).click();
//   await page1.getByRole('button', { name: 'Remove Slidecart - staging' }).click();
//   await page1.getByRole('button', { name: 'Uninstall' }).click();
//   await page1.getByRole('button', { name: 'Close' }).click();

// Alternate Login
  await page.goto('https://admin.shopify.com/store/slidecart-test-analytics3/');
  await page.getByLabel('Email').fill('justine@thecommerce.co');
  await page.getByRole('heading', { name: 'Log in', exact: true }).click();
  await page.getByRole('heading', { name: 'Log in', exact: true }).click(); //To display link
  await expect(page.getByRole('button', { name: 'Continue with Email' })).toBeEnabled();
  await page.getByRole('button', { name: 'Continue with Email' }).click();
  await page.getByLabel('Password', { exact: true }).fill('TCCP@ssw0rd123');
  await page.getByRole('button', { name: 'Log in' }).click();

  //Merchant App
  await page.getByRole('link', { name: 'Slide Cart & Cart Upsell - TCC Slide Cart & Cart Upsell - TCC' }).click();
  await expect(page.frameLocator('iframe[name="app-iframe"]').getByLabel('Enable basic upsell')).toBeVisible();
  await page.frameLocator('iframe[name="app-iframe"]').locator('//div[@id="MainPane"]/div[2]//div[@class = "toggle-switch"]').click();
  
  //Storefront Login
  const storefront = await context.newPage();
  await storefront.goto('https://slidecart-test-analytics3.myshopify.com/');
  await storefront.getByLabel('Enter store password').click();
  await storefront.getByLabel('Enter store password').fill('tufray');
  await storefront.getByRole('button', { name: 'Enter' }).click();

  //Basic Upsell - Start
  await page.frameLocator('iframe[name="app-iframe"]').locator('#upsell').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Upsell heading text').click();
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Upsell heading text').fill('Basic Upsell');
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Add Product' }).click();
  await page.getByText('Basic White SneakersBasic White Sneakers').click();
  await page.getByRole('button', { name: 'Add' }).click();  
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Add Product' }).click();
  await page.getByText('Basic White ShirtBasic White Shirt').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('button', { name: 'Add Product' }).click();
  await page.getByText('Basic SunglassesBasic Sunglasses').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();
  await storefront.getByRole('button', { name: 'Search' }).click();
  await storefront.getByPlaceholder('Search').fill('Basic Black Hoodie');
  await storefront.getByRole('link', { name: 'Basic Black Hoodie Basic Black Hoodie' }).click();
  await storefront.waitForLoadState('load');
  await storefront.getByRole('button', { name: 'Add to cart' }).click();
  await expect(storefront.getByRole('heading', { name: 'Basic Upsell' })).toBeVisible(); //Check Heading Text
  await expect(storefront.locator('//div[@class="slick-list"]')).toBeVisible(); //Check Carousel
  await page.frameLocator('iframe[name="app-iframe"]').locator('#upsell_stack').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();
  await storefront.reload();
  await storefront.waitForLoadState('load');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await expect(storefront.locator('//div[@class="upsells-stacked"]')).toBeVisible(); //Check Stack
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(3); //Count Stack
  const upsellItem1 = await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-text"]//a)[1]').textContent();
  console.log("UpsellItem1: " + upsellItem1);
  await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-item"]/div[@class="upsell-add"])[1]').click();
  await expect(storefront.locator('//div[@class = "items"]//a[text() = "' + upsellItem1 + '"]')).toBeVisible(); 
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(2); //Add Upsell to cart - Count
  await page.frameLocator('iframe[name="app-iframe"]').locator('#upsell_multi').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();
  await storefront.reload();
  await storefront.waitForLoadState('load');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await expect(storefront.locator('//div[@class="upsells-stacked"]')).toBeVisible();
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(3); //Count Stack - Display item even when in cart
  await page.frameLocator('iframe[name="app-iframe"]').locator('#upsell_goto_product').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();
  await storefront.reload();
  await storefront.waitForLoadState('load');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  const upsellItem2 = await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-text"]//a)[2]').textContent();
  console.log("UpsellItem2: " + upsellItem2);
  await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-item"]/div[@class="upsell-add"])[2]').click();
  await storefront.locator('h1').click();
  await expect(storefront.locator('h1')).toHaveText(upsellItem2);    

  //Advanced Upsell
  await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Heading text', { exact: true }).click();
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Heading text', { exact: true }).fill('Advanced Upsell');
  await page.pause();
});