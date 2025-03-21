const { test, expect } = require('@playwright/test');

test('Place an order on Demoblaze (simplified, with wait)', async ({ page }) => {
  await page.goto('https://www.demoblaze.com/index.html');

  // Select the first product
  await page.click('.card-title a');

  // Add to cart and handle dialog
  page.on('dialog', dialog => dialog.accept());
  await page.click('text=Add to cart');

  // Go to cart and place order
  await page.click('text=Cart');

  // Wait for and click "Place Order"
  await page.waitForSelector('#orderModal > div > div > div.modal-footer > button.btn.btn-primary', { state: 'visible', timeout: 90000 });
  await page.click('#orderModal > div > div > div.modal-footer > button.btn.btn-primary');

  // Wait for the modal dialog to be visible before filling form.
  await page.waitForSelector('#orderModal.show', {state: 'visible', timeout: 90000});

  // Fill order form
  await page.fill('#name', `User${Math.random()}`);
  await page.fill('#country', `Country${Math.random()}`);
  await page.fill('#city', `City${Math.random()}`);
  await page.fill('#card', '1234567890123456');
  await page.fill('#month', '01');
  await page.fill('#year', '2023');

  // Wait for and click "Purchase"
  await page.waitForSelector('button[onclick="Place Order()"]', { state: 'visible', timeout: 90000 });
  await page.click('button[onclick="Place Order()"]');

  // Wait for the success alert
  await page.waitForSelector('.sweet-alert h2', { state: 'visible', timeout: 90000 });

  // Verify success and close alert
  await expect(page.locator('.sweet-alert h2')).toContainText('Thank you');
  await page.click('.sweet-alert button');
});