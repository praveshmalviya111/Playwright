const { test, expect } = require('@playwright/test');
//const { FormPage } = require('../demoqaformpage/demoqa');
import { FormPage } from '../demoqaformpage/formpage.js';

// test('Fill Automation Practice Form', async ({ page }) => {
//   // Navigate to the form page with an increased timeout
//   await page.goto('https://demoqa.com/automation-practice-form', {
//     timeout: 60000,
//     waitUntil: 'domcontentloaded',
//   });

//   // Fill out personal details
//   await page.fill('#firstName', 'Pravesh');
//   await page.fill('#lastName', 'Malviya');
//   await page.fill('#userEmail', 'pravesh.m@example.com');
//   await page.click('label[for="gender-radio-1"]');
//   await page.fill('#userNumber', '9876543210');

//   // Select date of birth - updated selectors
//   await page.click('#dateOfBirthInput');
//   await page.selectOption('select.react-datepicker__year-select', '1995');
//   await page.selectOption('select.react-datepicker__month-select', '6');
//   await page.click('.react-datepicker__day--015');

//   // Add subjects with wait for element
//   const subjectsInput = await page.locator('#subjectsInput');
//   await subjectsInput.fill('Physics');
//   await page.keyboard.press('Enter');

//   // Select hobbies
//   await page.click('label[for="hobbies-checkbox-1"]');
//   await page.click('label[for="hobbies-checkbox-3"]');

//   // Verify hobbies selection
//   await expect(page.locator('#hobbies-checkbox-1')).toBeChecked();
//   await expect(page.locator('#hobbies-checkbox-3')).toBeChecked();

//   // Handle file upload - corrected approach
//   await page.locator("input[id='uploadPicture']").setInputFiles('myimage.jpg');

//   // Optional: Add current address
//   await page.fill('#currentAddress', 'chouhan nagar, indore, m.p.');

//   // Select a state from the dropdown
//   await page.waitForSelector('#state');
//   await page.click('#state');

//   // Wait for the 'NCR' option to be visible and click on it
//   await page.waitForSelector('text=NCR');
//   await page.getByText('NCR', { exact: true }).click();

//   await page.waitForSelector('#city');
//   await page.click('#city');

//   // Wait for the 'Delhi' option to be visible and click on it
//   await page.waitForSelector('text=Delhi');
//   await page.getByText('Delhi', { exact: true }).click();

//   const buttons = page.locator('role=button');
//   const submitButton = buttons.filter({ hasText: 'Submit' });
//   await submitButton.click();
// });

test('should show Page Object Model article', async ({ page }) => {
  // Assuming FormPage is a page object class with methods like `goto()` and `pageObjectModel()`
  const formPage = new FormPage(page); // Pass the `page` object if needed (assuming FormPage is a page object)

  await formPage.goTo(); // This method would navigate to the necessary page
  await formPage.fillPersonalDetails("Pravesh","Malviya","pravesh.m@example.com","9876543210");
  await formPage.fillDateOfBirth("1950", "6" , "19");
  await formPage.addSubjects("Physics");
  await formPage.UploadPicture('myimage.jpg');
  await formPage.fillCurrentAddress("chouhan nagar, Indore, M.p");
  await formPage.selectStateAndCity("NCR","Delhi");
  await formPage.submitForm();
  


  
});

