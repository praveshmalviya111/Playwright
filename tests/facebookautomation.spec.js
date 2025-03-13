// @ts-check
import { test, expect } from '@playwright/test';

// test('facebook', async ({ page }) => {
//   await page.goto('https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/facebook/);
// });

test('login', async ({ page }) => {
  await page.goto('https://www.facebook.com/login/?next=https%3A%2F%2Fwww.facebook.com%2F');

  // Click the get started link.
  await page.getByPlaceholder('Email address or phone number').fill('pravesh.m@liseinfotech.com');

  // Example for increasing timeout for a specific action
await page.getByLabel('Password').fill('Pravesh@123', { timeout: 50000 }); // 50 seconds

await page.getByRole('button', { name: 'Log In' }).click();
  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible
});