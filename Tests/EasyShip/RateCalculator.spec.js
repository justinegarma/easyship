const { test, expect, chromium } = require('@playwright/test');
import { RateCalculator } from '../../pages/RateCalculator'

test.beforeEach(async ({page, context}) => {
    await page.goto('https://www.easyship.com/shipping-rate-calculator/usa-to-usa');
    await page.waitForLoadState('networkidle');
    await page.locator('.c-rate-calculator__body').scrollIntoViewIfNeeded();
    await expect(page.locator('.c-signup-popup')).toBeVisible({ timeout: 20000 })
    await page.locator('.c-popup-content__close-icon').click();
    await page.locator('.c-rates-calculator-section__inputs').scrollIntoViewIfNeeded();
});

test('Same zip', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('lbs','1');
    await Calc.RefineSearch();
    await Calc.selectProductCategory('bags_luggages');
    await Calc.Calculate();
    await Calc.CheckTable();
    await expect(page.getByText('Total Cost')).toBeVisible({timeout: 5000});
});

test('Same country', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '90000');
    await Calc.enterWeight('lbs','0.5');
    await Calc.Calculate();
    await Calc.CheckTable();
    await expect(page.getByText('Total Cost')).toBeVisible({timeout: 5000});
});

test('Different country', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'australia', '10000');
    await Calc.enterWeight('lbs','0.5');
    await Calc.Calculate();
    await Calc.CheckTable();
    await expect(page.getByText('Total Cost')).toBeVisible({timeout: 5000});
});

test('Invalid zip code value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '1000', '5000');
    await Calc.enterWeight('lbs','0.5');
    await Calc.Calculate();
});

test('Blank zip code value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '');
    await Calc.enterWeight('lbs','0.5');
    await Calc.Calculate();
});

test('Valid weight in lbs', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('lbs','1');
    await Calc.Calculate();
    await Calc.CheckTable();
    await expect(page.getByText('Total Cost')).toBeVisible({timeout: 5000});
});

test('Valid weight in kg', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('kg','1');
    await Calc.Calculate();
    await Calc.CheckTable();
    await expect(page.getByText('Total Cost')).toBeVisible({timeout: 5000});
});

test('Invalid weight(lbs) - Negative value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('lbs','-1');
    await Calc.Calculate();
});

test('Invalid weight(kg) - Negative value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('kg','-1');
    await Calc.Calculate();
});

test('Invalid weight(lbs) - Zero value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('lbs','0');
    await Calc.Calculate();
});

test('Invalid weight(kg) - Zero value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('kg','0');
    await Calc.Calculate();
});

test('Invalid weight(lbs) - Value greater than 250', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('lbs','251');
    await Calc.Calculate();
});

test('Invalid weight(kg) - Value greater than 250', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('kg','251');
    await Calc.Calculate();
});

test('Invalid weight - Blank value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('lbs','');
    await Calc.Calculate();
});

test('Valid dimensions in inches', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('lbs','1');
    await Calc.RefineSearch();
    await Calc.enterDimensions('in', '7', '7', '7');
    await Calc.Calculate();
    await Calc.CheckTable();
    await expect(page.getByText('Total Cost')).toBeVisible({timeout: 5000});
});

test('Valid dimensions in centimeters', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.enterWeight('lbs','1');
    await Calc.RefineSearch();
    await Calc.enterDimensions('cm', '7', '7', '7');
    await Calc.Calculate();
    await Calc.CheckTable();
    await expect(page.getByText('Total Cost')).toBeVisible({timeout: 5000});
});

test('Invalid dimensions - negative value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.RefineSearch();
    await Calc.enterDimensions('in', '-7', '7', '-7');
    await Calc.Calculate();
});

test('Invalid dimensions - zero value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.RefineSearch();
    await Calc.enterDimensions('cm', '7', '0', '7');
    await Calc.Calculate();
});

test('Invalid dimensions - blank value', async ({ page, context }) => {
    const Calc = new RateCalculator(page)
    await Calc.setDestination('usa', 'usa', '10000', '10000');
    await Calc.RefineSearch();
    await Calc.enterDimensions('in', '7', '7', '');
    await Calc.Calculate();
    await page.pause();
});