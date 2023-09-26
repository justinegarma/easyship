// import { test, expect , chromium} from '@playwright/test';

const { test, expect, chromium } = require('@playwright/test');

test('Upsells', async ({ page, context }) => {
  test.setTimeout(120000);
  // await page.setViewportSize({width: 1920, height: 1080});
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
  await expect(page.frameLocator('iframe[name="app-iframe"]').getByLabel('Enable basic upsell')).toBeVisible({ timeout: 10000 });
  await expect(page.frameLocator('iframe[name="app-iframe"]').locator('//div[@id="MainPane"]/div[2]//div[@class = "toggle-switch"]')).toBeVisible();
  await page.frameLocator('iframe[name="app-iframe"]').locator('//div[@id="MainPane"]/div[2]//div[@class = "toggle-switch"]').click();

  //Storefront Login
  const storefront = await context.newPage();
  await storefront.goto('https://slidecart-test-analytics3.myshopify.com/');
  await storefront.getByLabel('Enter store password').click();
  await storefront.getByLabel('Enter store password').fill('tufray');
  await storefront.getByRole('button', { name: 'Enter' }).click();

  //BASIC UPSELL
  //Merchant App - Enable Basic Upsell/Add Heading Text
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#upsell').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Upsell heading text').click();
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Upsell heading text').fill('Basic Upsell');

  //Merchant App - Upload Products
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

  //Storefront - Add to Cart
  await storefront.bringToFront();
  await storefront.getByRole('button', { name: 'Search' }).click();
  await storefront.getByPlaceholder('Search').fill('Basic Black Hoodie');
  await storefront.getByRole('link', { name: 'Basic Black Hoodie Basic Black Hoodie' }).click();
  await storefront.waitForLoadState('networkidle');
  await storefront.getByRole('button', { name: 'Add to cart' }).click();

  //Storefront - Validate Basic Upsell (Carousel)/Heading Text
  await expect(storefront.getByRole('heading', { name: 'Basic Upsell' })).toBeVisible(); //Check Heading Text
  await expect(storefront.locator('//div[@class="slick-list"]')).toBeVisible(); //Check Carousel


  //Merchant App - Tick Stack upsells instead of carousel
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#upsell_stack').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate Stacked Upsells
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await expect(storefront.locator('//div[@class="upsells-stacked"]')).toBeVisible(); //Check Stack
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(3); //Count Stack
  const upsellItem1 = await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-text"]//a)[1]').textContent();
  console.log("UpsellItem1: " + upsellItem1);
  await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-item"]/div[@class="upsell-add"])[1]').click(); //Add Upsell Item to cart
  await expect(storefront.locator('//div[@class = "items"]//a[text() = "' + upsellItem1 + '"]')).toBeVisible();
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(2); //Add Upsell Item to cart - Count

  //Merchant App - Tick Show upsell item even when in cart
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#upsell_multi').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate upsell items even when in cart
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await expect(storefront.locator('//div[@class="upsells-stacked"]')).toBeVisible();
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(3); //Count Stack - Display item even when in cart

  //Merchant App - Link upsell to product page instead of adding
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#upsell_goto_product').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate redirection to product details page
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  const upsellItem2 = await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-text"]//a)[2]').textContent();
  console.log("UpsellItem2: " + upsellItem2);
  await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-item"]/div[@class="upsell-add"])[2]').click();
  await storefront.waitForLoadState('networkidle');
  await expect(storefront.locator('h1')).toHaveText(upsellItem2);

  //Remove Cart Items
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@class="remove"])[2]').click();
  await expect(storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@class="remove"])[1]')).toBeVisible();
  await expect(storefront.locator('//div[@class = "items"]/div[@class = "item"]')).toHaveCount(1);
  await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@class="remove"])[1]').click();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  // await storefront.locator('//header/button').click();

  //ADVANCED UPSELL
  //Merchant App - Enable Advanced Upsell/Add Heading Text
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Heading text', { exact: true }).click();
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Heading text', { exact: true }).fill('Advanced Upsell');

  //Merchant App - Upload Products
  await page.frameLocator('iframe[name="app-iframe"]').locator('//h3[text() = "When (in cart)"]/parent::div//button').click();
  await page.getByText('Basic Black HoodieBasic Black Hoodie').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.frameLocator('iframe[name="app-iframe"]').locator('//h3[text() = "Upsell"]/parent::div//button').click();
  await page.getByText('Basic Denim JacketBasic Denim Jacket').click();
  await page.getByText('Basic Denim JeansBasic Denim Jeans').click();
  await page.getByText('Basic SunglassesBasic Sunglasses').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await expect(page.frameLocator('iframe[name="app-iframe"]').locator('//button[text()="Create upsell"]')).toBeEnabled();
  await page.frameLocator('iframe[name="app-iframe"]').locator('//button[text()="Create upsell"]').click();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Add to Cart
  await storefront.bringToFront();
  await storefront.locator('//span[text()="slidecart-test-analytics3"]').click();
  await storefront.getByRole('button', { name: 'Search' }).click();
  await storefront.getByPlaceholder('Search').fill('Basic Black Hoodie');
  await storefront.getByRole('link', { name: 'Basic Black Hoodie Basic Black Hoodie' }).click();
  await storefront.waitForLoadState('networkidle');
  await storefront.getByRole('button', { name: 'Add to cart' }).click();

  //Storefront - Validate Basic Upsell (Carousel)/Heading Text
  await expect(storefront.getByRole('heading', { name: 'Advanced Upsell' })).toBeVisible(); //Check Heading Text
  await expect(storefront.locator('//div[@class="slick-list"]')).toBeVisible(); //Check Carousel

  //Merchant App - Tick Stack upsells instead of carousel
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_stack').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate Stacked Upsells
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await expect(storefront.locator('//div[@class="upsells-stacked"]')).toBeVisible(); //Check Stack
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(3); //Count Stack
  const aupsellItem1 = await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-text"]//a)[1]').textContent();
  console.log("AUpsellItem1: " + aupsellItem1);
  await storefront.locator('(//div[@class = "upsells-stacked"]//div[@class="upsell-item"]/div[@class="upsell-add"])[1]').click();
  await expect(storefront.locator('//div[@class = "items"]//a[text() = "' + aupsellItem1 + '"]')).toBeVisible();
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(2); //Add Upsell to cart - Count

  //Merchant App - Tick Show upsell item even when in cart
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_cart').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate upsell items even when in cart
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await expect(storefront.locator('//div[@class="upsells-stacked"]')).toBeVisible();
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(3); //Count Stack - Display item even when in cart

  //Slider Setup
  let sliderUpsell = await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_amount').getAttribute('value');
  let sliderUpsellVal = parseInt(sliderUpsell);
  console.log("Slider Value: " + sliderUpsellVal);

  //Merchant App - Upsells to show
  await page.bringToFront();
  for (let i = sliderUpsellVal; i > 1; i--) {
    await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_amount').press('ArrowLeft');
    await expect(page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_amount')).toHaveValue((i - 1).toString(), { timeout: 5000 });
    sliderUpsell = await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_amount').getAttribute('value');
    sliderUpsellVal = parseInt(sliderUpsell);
    console.log(sliderUpsellVal);
  }
  console.log('New Value: ' + sliderUpsellVal);
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate upsells to show
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await expect(storefront.locator('//div[@class="upsells-stacked"]')).toBeVisible();
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(sliderValue);

  // Merchant App - Use basic upsells as a fallback
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_basic').check();
  for (let i = sliderUpsellVal; i < 5; i++) {
    await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_amount').press('ArrowRight');
    await expect(page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_amount')).toHaveValue((i + 1).toString(), { timeout: 5000 });
    sliderUpsell = await page.frameLocator('iframe[name="app-iframe"]').locator('#aupsell_amount').getAttribute('value');
    sliderUpsellVal = parseInt(sliderUpsell);
    console.log(sliderUpsellVal);
  }
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate basic upsells fallback
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await expect(storefront.locator('//div[@class="upsells-stacked"]/div')).toHaveCount(5); //Count Stack

  //Remove Cart Items
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.locator('//a[@id="cart-icon-bubble"]/span').click();
  await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@class="remove"])[2]').click();
  await expect(storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@class="remove"])[1]')).toBeVisible();
  await expect(storefront.locator('//div[@class = "items"]/div[@class = "item"]')).toHaveCount(1);
  await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@class="remove"])[1]').click();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await page.pause();
  // await storefront.locator('//header/button').click();
});

test('Rewards and Free Gifts', async ({ page, context }) => {
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
  await expect(page.frameLocator('iframe[name="app-iframe"]').getByLabel('Enable Tiered Rewards')).toBeVisible({ timeout: 10000 });
  await expect(page.frameLocator('iframe[name="app-iframe"]').locator('//div[@id="MainPane"]/div[2]//div[@class = "toggle-switch"]')).toBeVisible();
  await page.frameLocator('iframe[name="app-iframe"]').locator('//div[@id="MainPane"]/div[2]//div[@class = "toggle-switch"]').click();

  //Storefront Login
  const storefront = await context.newPage();
  await storefront.goto('https://slidecart-test-analytics3.myshopify.com/');
  await storefront.getByLabel('Enter store password').click();
  await storefront.getByLabel('Enter store password').fill('tufray');
  await storefront.getByRole('button', { name: 'Enter' }).click();

  //Merchant App - Cart Total: Order Discount
  await page.bringToFront();
  let milestoneToHit = 150.00;
  let milestoneToHitCurr = '$' + milestoneToHit.toFixed(2) + ' USD';
  await page.frameLocator('iframe[name="app-iframe"]').getByLabel('Enable Tiered Rewards').check();
  await page.frameLocator('iframe[name="app-iframe"]').getByText('Cart total').click();
  await page.frameLocator('iframe[name="app-iframe"]').locator('label').filter({ hasText: 'Order Discount' }).locator('span').nth(2).click();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#amount').click();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#amount').fill(milestoneToHit.toFixed(2).toString());
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Add to Cart
  await storefront.bringToFront();
  await storefront.getByRole('button', { name: 'Search' }).click();
  await storefront.getByPlaceholder('Search').fill('Basic Black Hoodie');
  await storefront.getByRole('link', { name: 'Basic Black Hoodie Basic Black Hoodie' }).click();
  await storefront.waitForLoadState('networkidle');
  await expect(storefront.locator('span.money').first()).toBeVisible({ timeout: 5000 });
  let cartPriceCurr = await storefront.locator('span.money').first().textContent();
  let cartPrice = parseFloat(cartPriceCurr.replace("$", "").replace(" USD", ""));
  console.log('Price: ' + cartPrice.toFixed(2));
  let rewardAmt = milestoneToHit - cartPrice;
  let rewardAmtCurr = '$' + rewardAmt.toFixed(2) + ' USD';
  console.log(rewardAmt);
  console.log(rewardAmtCurr);
  await storefront.getByRole('button', { name: 'Add to cart' }).click();

  //Storefront - Validate Rewards
  await expect(storefront.locator('div[class="rewards"]')).toBeVisible();
  await expect(storefront.locator('//div[@class="rewards"]//span[@class = "money"][text() = "' + rewardAmtCurr + '"]')).toBeVisible();
  await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@aria-label ="increase quantity"])[1]').click();
  // await expect(storefront.locator('//div[@class="rewards"]//span[@class = "money"][text() = "' + rewardAmtCurr + '"]')).toBeVisible(false);
  await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@class="remove"])[1]').click();

  //Merchant App Car Total: Free Shipping
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').locator('label').filter({ hasText: 'Free Shipping' }).locator('span').nth(2).click();
  await expect(page.frameLocator('iframe[name="app-iframe"]').locator('#shipping_text')).toBeVisible();
  // await page.frameLocator('iframe[name="app-iframe"]').locator('#amount').click();
  await page.frameLocator('iframe[name="app-iframe"]').locator('#shipping_text').fill('Shipping Text');
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate Shipping Text
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.getByRole('button', { name: 'Add to cart' }).click();
  await expect(storefront.locator('div[class="rewards"]')).toBeVisible();
  await expect(storefront.locator('//div[@class="rewards"]//span[@class = "money"][text() = "' + rewardAmtCurr + '"]')).toBeVisible();
  await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@aria-label ="increase quantity"])[1]').click();
  await expect(storefront.locator('span[class = "rewards-shipping-text"]').getByText('Shipping Text')).toBeVisible({ timeout: 5000 });
  await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@class="remove"])[1]').click();

  //Merchant App - Item count
  await page.bringToFront();
  await page.frameLocator('iframe[name="app-iframe"]').getByText('Item count').click();
  await page.frameLocator('iframe[name="app-iframe"]').locator('label').filter({ hasText: 'Free Shipping' }).locator('span').nth(2).click();
  let rewardVal = await page.frameLocator('iframe[name="app-iframe"]').locator('#label').first().getAttribute('value');
  let sliderCount = await page.frameLocator('iframe[name="app-iframe"]').locator('#count_amount').getAttribute('value');
  let sliderCountVal = parseInt(sliderCount);
  console.log("Slider Value: " + sliderCountVal);
  for (let i = sliderCountVal; i < 5; i++) {
    await page.frameLocator('iframe[name="app-iframe"]').locator('#count_amount').press('ArrowLeft');
    await expect(page.frameLocator('iframe[name="app-iframe"]').locator('#count_amount')).toHaveValue((i + 1).toString(), { timeout: 5000 });
    sliderCount = await page.frameLocator('iframe[name="app-iframe"]').locator('#count_amount').getAttribute('value');
    sliderCountVal = parseInt(sliderCount);
    console.log(sliderCountVal);
  }
  await page.frameLocator('iframe[name="app-iframe"]').getByRole('banner').filter({ hasText: 'Cart FeaturesCart FeaturesAppearance & LanguageFree GiftNEWAnalyticsSupport & Do' }).getByRole('button', { name: 'Save' }).click();

  //Storefront - Validate Item Count
  await storefront.bringToFront();
  await storefront.reload();
  await storefront.waitForLoadState('networkidle');
  await storefront.getByRole('button', { name: 'Add to cart' }).click();
  let productQty = await storefront.locator('div[class = "quantity-selector"]').locator('input').getAttribute('value');
  productQty = parseInt(productQty);
  console.log('Product Qty: ' + productQty);
  for (let i = productQty; i < 5; i++) {
    await storefront.locator('(//div[@class = "items"]/div[@class = "item"]//button[@aria-label ="increase quantity"])[1]').click();
    await expect(storefront.locator('div[class = "quantity-selector"]').locator('input')).toHaveValue((i + 1).toString(), { timeout: 5000 });
    productQty = await storefront.locator('div[class = "quantity-selector"]').locator('input').getAttribute('value');
    productQty = parseInt(productQty);
    console.log(productQty);
    let remRewards = 5 - productQty;
    console.log("Remaining Reward: " + remRewards);
    if (productQty == 5) {
      let rewardText = rewardVal + ' applied!';
      console.log(rewardText);
      await expect(storefront.getByText(rewardText)).toBeVisible();
    }
    else if (productQty < 5) {
      let rewardText = 'Spend ' + remRewards + ' more and receive ' + rewardVal;
      console.log(rewardText);
      await expect(storefront.getByText(rewardText)).toBeVisible();
    }
  }

  //Merchant App - Free Gifts


  await page.pause();

});