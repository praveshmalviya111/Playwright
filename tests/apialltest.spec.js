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



const USER_API_URL_ = 'https://reqres.in/api/users';
const userId1 = 2; // Using the provided user ID

test('should get a specific user', async ({ request }) => {
    const response = await request.get(`${USER_API_URL_}/${userId1}`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();
    expect(body.data.id).toBe(userId1);
    expect(body.data.email).toBeDefined();
    expect(body.data.first_name).toBeDefined();
    expect(body.data.last_name).toBeDefined();
    expect(body.data.avatar).toBeDefined();
    console.log('Get User API Response:', body.data);
});

const USER_APIURL = 'https://reqres.in/api/users';
const userId2 = 23; // Using the new user ID

test('should attempt to get a specific user (user may not exist)', async ({ request }) => {
  const response = await request.get(`${USER_APIURL}/${userId2}`);

  if (response.ok()) {
    const body = await response.json();
    expect(body.data.id).toBe(userId2);
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



const UNKNOWNAPIURL = 'https://reqres.in/api/unknown';

test('should get unknown resources', async ({ request }) => {
  const response = await request.get(UNKNOWNAPIURL);
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

  console.log('Unknown Resources API Response:', body.data);
});

test('should get a single unknown resource', async ({ request }) => {
    const unknownId = 2;
    const response = await request.get(`${UNKNOWNAPIURL}/${unknownId}`);
    expect(response.ok()).toBeTruthy();
    const body = await response.json();

    expect(body.data.id).toBe(unknownId);
    expect(body.data.name).toBeDefined();
    expect(body.data.year).toBeDefined();
    expect(body.data.color).toBeDefined();
    expect(body.data.pantone_value).toBeDefined();

    console.log(`Unknown Resource ${unknownId} API Response:`, body.data);
});

test('should handle unknown resource not found', async ({ request }) => {
    const unknownId = 23;
    const response = await request.get(`${UNKNOWNAPIURL}/${unknownId}`);
    expect(response.status()).toBe(404);
    const body = await response.json();
    expect(body).toEqual({});
    console.log(`Unknown Resource ${unknownId} not found API Response:`, body.data);
});

const UNKNOWN_API_URL2 = 'https://reqres.in/api/unknown';
const unknownId = 2;

test('unknown id  ', async ({ request }) => {
  const response = await request.get(`${UNKNOWN_API_URL2}/${unknownId}`);
  expect(response.ok()).toBeTruthy();
  const body = await response.json();

  expect(body.data.id).toBe(unknownId);
  expect(body.data.name).toBeDefined();
  expect(body.data.year).toBeDefined();
  expect(body.data.color).toBeDefined();
  expect(body.data.pantone_value).toBeDefined();

  console.log(`Unknown Resource ${unknownId} API Response:`, body.data);
});

const UNKNOWN_API_URL3 = 'https://reqres.in/api/unknown';
const unknownId2 = 23;

test('unknown resource not found', async ({ request }) => {
  const response = await request.get(`${UNKNOWN_API_URL3}/${unknownId2}`);
  expect(response.status()).toBe(404);
  const body = await response.json();
  expect(body).toEqual({});
  console.log(`Unknown Resource ${unknownId2} not found API Response:`, body);
});


const USER_API_URL4 = 'https://reqres.in/api/users';

test('should create a new user', async ({ request }) => {
  const newUser = {
    name: 'Pravesh Malviya',
    job: 'leader',
  };

  const response = await request.post(USER_API_URL4, {
    data: newUser,
  });

  expect(response.ok()).toBeTruthy();
  const body = await response.json();

  expect(body.id).toBeDefined();
  expect(body.createdAt).toBeDefined();
  expect(body.name).toBe(newUser.name);
  expect(body.job).toBe(newUser.job);

  console.log('Create User API Response:', body.id);
  console.log('Create User API Response:', body.createdAt);
  console.log('Create User API Response:', body.name);
  console.log('Create User API Response:', body.job);
});


const USER_API_URL5 = 'https://reqres.in/api/users/2';

test('should update an existing user with PUT', async ({ request }) => {
  const updatedUser = {
    name: 'Pravesh Malviya',
    job: 'Leader',
  };

  const response = await request.put(USER_API_URL5, {
    data: updatedUser,
  });

  expect(response.ok()).toBeTruthy();

  try {
    const body = await response.json();

    expect(body.name).toBe(updatedUser.name);
    expect(body.job).toBe(updatedUser.job);
    expect(body.updatedAt).toBeDefined();

    console.log('Update User (PUT) API Response:', body.name);
    console.log('Update User (PUT) API Response:', body.job);
    console.log('Update User (PUT) API Response:', body.updatedAt);
  } catch (error) {
    console.error('Error parsing JSON:', error);
    const text = await response.text();
    console.error('Response Text:', text);
    expect.fail('Failed to parse JSON response');
  }
});

const USER_API_URL6 = 'https://reqres.in/api/users/2';

test('should patch an existing user', async ({ request }) => {
  const patchedUser = {
    name: 'Pravesh Malviya',
    job: 'Leader'
  };

  const response = await request.patch(USER_API_URL6, {
    data: patchedUser,
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.name).toBe(patchedUser.name);
  expect(body.job).toBeDefined();
  expect(body.updatedAt).toBeDefined();

  console.log('Patch User API Response:', body.name);
  console.log('Patch User API Response:', body.job);
  console.log('Patch User API Response:', body.updatedAt);
});

const USER_API_URL7 = 'https://reqres.in/api/users/2';

test('should delete an existing user', async ({ request }) => {
  const response = await request.delete(USER_API_URL7);

  expect(response.status()).toBe(204); // 204 No Content is the expected response for successful deletion.

  // Optionally, you can also check the response body (although it's usually empty for 204).
  const body = await response.text(); // or response.json(), but it will be empty.
  expect(body).toBe(''); // or expect(body).toEqual({});

  console.log('Delete User API Response Status:', response.status());
});

const REGISTER_API_URL8 = 'https://reqres.in/api/register';

test('should register a new user successfully', async ({ request }) => {
  const newUser = {
    email: 'eve.holt@reqres.in',
    password: 'pistol',
  };

  const response = await request.post(REGISTER_API_URL8, {
    data: newUser,
  });

  expect(response.ok()).toBeTruthy(); // Check for 2xx status code

  const body = await response.json();

  expect(body.id).toBeDefined();
  expect(body.token).toBeDefined();

  console.log('Register User API Response:', body.id);
  console.log('Register User API Response:', body.token);
});

test('should fail registration due to missing password', async ({ request }) => {
  const newUser = {
    email: 'eve.holt@reqres.in',
  };

  const response = await request.post(REGISTER_API_URL8, {
    data: newUser,
  });

  expect(response.status()).toBe(400); // Expect a 400 Bad Request

  const body = await response.json();

  expect(body.error).toBe('Missing password');

  console.log('Register User API Response (Failure):', body.error);
});

const LOGIN_API_URL = 'https://reqres.in/api/login';

test('should login a user successfully', async ({ request }) => {
  const userCredentials = {
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  };

  const response = await request.post(LOGIN_API_URL, {
    data: userCredentials,
  });

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.token).toBeDefined();

  console.log('Login User API Response:', body.token);
});

test('should fail login due to missing password', async ({ request }) => {
  const userCredentials = {
    email: 'eve.holt@reqres.in',
  };

  const response = await request.post(LOGIN_API_URL, {
    data: userCredentials,
  });

  expect(response.status()).toBe(400);

  const body = await response.json();

  expect(body.error).toBe('Missing password');

  console.log('Login User API Response (Failure):', body.error);
});

const DELAYED_USERS_API_URL = 'https://reqres.in/api/users?delay=3';

test('should get delayed users', async ({ request }) => {
  const response = await request.get(DELAYED_USERS_API_URL);

  expect(response.ok()).toBeTruthy();

  const body = await response.json();

  expect(body.data).toBeDefined();
  expect(Array.isArray(body.data)).toBeTruthy();
  expect(body.data.length).toBeGreaterThan(0);

  // Example assertions on the first item in the data array
  if (body.data.length > 0) {
    const firstItem = body.data[0];
    expect(firstItem.id).toBeDefined();
    expect(firstItem.email).toBeDefined();
    expect(firstItem.first_name).toBeDefined();
    expect(firstItem.last_name).toBeDefined();
    expect(firstItem.avatar).toBeDefined();
  }

  console.log('Delayed Users API Response:', body);
});