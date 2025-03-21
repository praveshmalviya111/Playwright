const { test, expect } = require('@playwright/test');

const UNKNOWN_API_URL = 'https://reqres.in/api/unknown';
const unknownId = 2;

test('should get a single unknown resource', async ({ request }) => {
  const response = await request.get(`${UNKNOWN_API_URL}/${unknownId}`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();

  expect(body.data.id).toBe(unknownId);
  expect(body.data.name).toBeDefined();
  expect(body.data.year).toBeDefined();
  expect(body.data.color).toBeDefined();
  expect(body.data.pantone_value).toBeDefined();

  console.log(`Unknown Resource ${unknownId} API Response:`, body.data);
});