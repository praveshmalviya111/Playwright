const { test, expect } = require('@playwright/test');

const USER_API_URL = 'https://reqres.in/api/users';

test('should get users from page 2', async ({ request }) => {
    const response = await request.get(`${USER_API_URL}?page=2`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.page).toBe(2);
    expect(body.data.length).toBeGreaterThan(0);
    console.log("Get Users API Response:", body); //print response
});

test('should create a user', async ({ request }) => {
    const response = await request.post(USER_API_URL, {
        data: {
            name: 'morpheus',
            job: 'leader',
        },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.name).toBe('morpheus');
    expect(body.job).toBe('leader');
    expect(body.id).toBeDefined();
    expect(body.createdAt).toBeDefined();
    console.log("Create User API Response:", body); //print response
});