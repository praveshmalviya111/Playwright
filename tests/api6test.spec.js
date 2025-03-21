const { test, expect } = require('@playwright/test');

const UNKNOWN_API_URL = 'https://reqres.in/api/unknown';
const unknownId = 23;

test('should handle unknown resource not found', async ({ request }) => {
  const response = await request.get(`${UNKNOWN_API_URL}/${unknownId}`);
  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toEqual({});
  console.log(`Unknown Resource ${unknownId} not found API Response:`, body.data);
});