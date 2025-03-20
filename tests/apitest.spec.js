const { test, expect } = require('@playwright/test');

const USER_API_URL = 'https://reqres.in/api/users';
let userId; // Added semicolon here

test('should get users from page 2', async ({ request }) => {
    const response = await request.get(`${USER_API_URL}?page=2`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.page).toBe(2);
    expect(body.data.length).toBeGreaterThan(0);
    console.log('Get Users API Response:', body);
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
    userId = body.id;
    console.log('Create User API Response:', body);
});

test('should update a user with PUT', async ({ request }) => {
    expect(userId).toBeDefined();

    const response = await request.put(`${USER_API_URL}/${userId}`, {
        data: {
            name: 'updatedMorpheus',
            job: 'updatedLeader',
        },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.name).toBe('updatedMorpheus');
    expect(body.job).toBe('updatedLeader');
    console.log('Update User (PUT) API Response:', body);
});

test('should update a user with PATCH', async ({ request }) => {
    expect(userId).toBeDefined();

    const response = await request.patch(`${USER_API_URL}/${userId}`, {
        data: {
            name: 'patchedMorpheus',
        },
    });
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.name).toBe('patchedMorpheus');
    console.log('Update User (PATCH) API Response:', body);
});

test('should delete a user', async ({ request }) => {
    expect(userId).toBeDefined();

    const response = await request.delete(`${USER_API_URL}/${userId}`);
    expect(response.status()).toBe(204);
    console.log('Delete User API Response:', response.status());
});

test('should get a 404 after delete', async ({ request }) => {
    expect(userId).toBeDefined();

    const response = await request.get(`${USER_API_URL}/${userId}`);
    expect(response.status()).toBe(404);
    console.log('Get deleted User API Response:', response.status());

});