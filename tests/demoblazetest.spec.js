const { test, expect } = require('@playwright/test');

test('Place an order on Demoblaze (optimized for stability)', async ({ page }) => {
    await page.goto('https://www.demoblaze.com/');
    
    // Wait and select the first product
    await page.locator('.card-title a').first().click();
    
    // Wait and add to cart
    await page.locator('.btn-success').click();
    
    // Handle alert
    page.on('dialog', async dialog => await dialog.accept());
    
    // Navigate to cart
    await page.locator('#cartur').click();
    await page.locator('.table-responsive').waitFor();
    
    // Click place order button
    await page.locator('.btn-success').click();
    await page.locator('.modal-body').nth(2).waitFor({ state: 'visible', timeout: 30000 });
    
    // Fill in purchase form efficiently
    await page.locator('#name').fill('John Doe');
    await page.locator('#country').fill('USA');
    await page.locator('#city').fill('New York');
    await page.locator('#card').fill('1234 5678 9876 5432');
    await page.locator('#month').fill('12');
    await page.locator('#year').fill('2025');
    
    // Confirm purchase
    await page.locator("button[onclick='purchaseOrder()']").click();
    
    // Wait for confirmation
    await page.locator('.sweet-alert').waitFor({ state : 'visible' , timeout: 30000 });
    console.log('Order placed successfully!');
});
