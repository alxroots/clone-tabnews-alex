test("GET to /api/v1/status should return 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  expect(response.status).toBe(200);

  const responseBody = await response.json();

  expect(responseBody.updated_at).toBeDefined();
});

test("GET to /api/v1/status should return max_connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.max_connections).toBeDefined();
  expect(responseBody.max_connections).toBeTruthy();
  expect(Number(responseBody.max_connections)).toEqual(100);
});

test("GET to /api/v1/status should return postgres_version", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.postgres_version).toBeDefined();
  expect(responseBody.postgres_version).toBeTruthy();
  expect(responseBody.postgres_version).toMatch(/^\d+\.\d+$/);
});

test("GET to /api/v1/status should return used_connections", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();

  expect(responseBody.used_connections).toBeDefined();
  expect(responseBody.used_connections).toBeTruthy();
  expect(responseBody.used_connections).toEqual(1);
});
