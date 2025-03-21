const { test, expect } = require('@playwright/test');

const USER_API_URL = 'https://reqres.in/api/users';
const userId = 23; // Using the new user ID

test('should attempt to get a specific user (user may not exist)', async ({ request }) => {
  const response = await request.get(`${USER_API_URL}/${userId}`);

  if (response.ok()) {
    const body = await response.json();
    expect(body.data.id).toBe(userId);
    expect(body.data.email).toBeDefined();
    expect(body.data.first_name).toBeDefined();
    expect(body.data.last_name).toBeDefined();
    expect(body.data.avatar).toBeDefined();
    console.log('Get User API Response:', body.data);
  } else {
    // Handle the case where the user is not found (status code 404)
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toEqual({}); // Or expect(body).toEqual({}); depending on the api response.
    console.log('User not found (404). Response:', body);
  }
});