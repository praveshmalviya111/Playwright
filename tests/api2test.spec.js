const { test, expect } = require('@playwright/test');

const USER_API_URL = 'https://reqres.in/api/users';
const userId = 2; // Using the provided user ID

test('should get a specific user', async ({ request }) => {
    const response = await request.get(`${USER_API_URL}/${userId}`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data.id).toBe(userId);
    expect(body.data.email).toBeDefined();
    expect(body.data.first_name).toBeDefined();
    expect(body.data.last_name).toBeDefined();
    expect(body.data.avatar).toBeDefined();
    console.log('Get User API Response:', body.data);
});