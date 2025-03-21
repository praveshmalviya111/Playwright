const { test, expect } = require('@playwright/test');

const UNKNOWN_API_URL = 'https://reqres.in/api/unknown';

test('should get unknown resources', async ({ request }) => {
  const response = await request.get(UNKNOWN_API_URL);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();

  expect(body.data).toBeDefined();
  expect(Array.isArray(body.data)).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);

  // Example assertions on the first item in the data array
  if (body.data.length > 0) {
    const firstItem = body.data[0];
    expect(firstItem.id).toBeDefined();
    expect(firstItem.name).toBeDefined();
    expect(firstItem.year).toBeDefined();
    expect(firstItem.color).toBeDefined();
    expect(firstItem.pantone_value).toBeDefined();
  }

  console.log('Unknown Resources API Response:', body);
});

test('should get a single unknown resource', async ({ request }) => {
    const unknownId = 2;
    const response = await request.get(`${UNKNOWN_API_URL}/${unknownId}`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(body.data.id).toBe(unknownId);
    expect(body.data.name).toBeDefined();
    expect(body.data.year).toBeDefined();
    expect(body.data.color).toBeDefined();
    expect(body.data.pantone_value).toBeDefined();

    console.log(`Unknown Resource ${unknownId} API Response:`, body);
});

test('should handle unknown resource not found', async ({ request }) => {
    const unknownId = 23;
    const response = await request.get(`${UNKNOWN_API_URL}/${unknownId}`);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toEqual({});
    console.log(`Unknown Resource ${unknownId} not found API Response:`, body);
});