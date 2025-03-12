const { test, expect } = require('@playwright/test');

test('Check employee names', async ({ page }) => {
  // Navigate to the employee list page
  await page.goto('/employees'); // Replace '/employees' with the actual URL

  // Example: Assuming employee names are displayed in elements with a specific class
  const employeeNameElements = await page.$$('.employee-name'); // Replace '.employee-name' with the correct selector

  //Expected employee names
  const expectedEmployeeNames = ["John Doe", "Jane Smith", "Alice Johnson"];

  //Verify the amount of employees
  await expect(employeeNameElements.length).toBe(expectedEmployeeNames.length);

  // Extract the text content of each element and store it in an array
  const actualEmployeeNames = await Promise.all(
    employeeNameElements.map(async (element) => {
      return await element.textContent();
    })
  );

  // Assert that the actual employee names match the expected names
  for(let i = 0; i < expectedEmployeeNames.length; i++){
    await expect(actualEmployeeNames[i]).toBe(expectedEmployeeNames[i]);
  }

  //Alternative using expect.arrayContaining, which is less specific, but can be useful.
  //await expect(actualEmployeeNames).toEqual(expect.arrayContaining(expectedEmployeeNames));
});

// Example of a test case when the names are within a table.
test('Check employee names in table', async ({ page }) => {
    await page.goto('/employeeTable'); // Replace '/employeeTable' with the actual URL

    const expectedEmployeeNames = ["Bob Williams", "Charlie Brown", "David Lee"];

    for (const name of expectedEmployeeNames) {
        const row = page.locator('tr', { hasText: name });
        await expect(row).toBeVisible();
    }
});