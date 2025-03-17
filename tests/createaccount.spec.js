const { test, expect } = require('@playwright/test');

test('Create a Facebook account', async ({ page }) => {
    await page.goto('https://www.facebook.com/');
    
    // Click 'Create new account'
    await page.locator('text=Create new account').click();
    
    // Wait for the sign-up form to appear
    await page.waitForSelector('input[name="firstname"]', { timeout: 5000 });

    // Fill the form fields
    await page.fill('input[name="firstname"]', 'Pravesh');
    await page.fill('input[name="lastname"]', 'Malviya');
    await page.fill('input[name="reg_email__"]', 'pravesh123456@example.com');
    await page.fill('input[name="reg_passwd__"]', 'pravesh.M@1234');
    

    // Select Date of Birth
    await page.selectOption('#day', '15');
    await page.selectOption('#month', '6');
    await page.selectOption('#year', '1995');

    // Select Male Gender
    await page.click('input[value="2"]');

    // Click on Sign Up
    await page.click('button[name="websubmit"]');

    // Wait for some time (you may check for confirmation messages instead)
    await page.waitForTimeout(5000);
});

