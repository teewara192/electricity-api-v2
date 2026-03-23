const request = require('supertest');
const app = require('../index');

describe('Electricity API Endpoints', () => {

  // 1. Total Usage (valid)
  it('should return total electricity usage for all years', async () => {
    const res = await request(app).get('/api/usage/total-by-year');
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
  });

  // 2. Total Usage (invalid endpoint)
  it('should return 404 for wrong usage endpoint', async () => {
    const res = await request(app).get('/api/usage/totalyear');
    expect(res.status).toBe(404);
  });

  // 3. Total Users (valid)
  it('should return total electricity users for all years', async () => {
    const res = await request(app).get('/api/users/total-by-year');
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
  });

  // 4. Total Users (invalid endpoint)
  it('should return 404 for wrong users endpoint', async () => {
    const res = await request(app).get('/api/users/totalyear');
    expect(res.status).toBe(404);
  });

  // 5. Usage history (valid)
  it('should return usage history for a province', async () => {
    const res = await request(app).get('/api/usage/history/Bangkok');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 6. Usage history (invalid province)
  it('should return empty array for non-existing province usage history', async () => {
    const res = await request(app).get('/api/usage/history/UnknownProvince');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  // 7. Users history (valid)
  it('should return users history for a province', async () => {
    const res = await request(app).get('/api/users/history/Bangkok');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  // 8. Users history (invalid province)
  it('should return empty array for non-existing users history', async () => {
    const res = await request(app).get('/api/users/history/UnknownProvince');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);
  });

  // 9. Usage by province & year (valid OR not found case)
  it('should return usage data or not found message', async () => {
    const res = await request(app).get('/api/usage/Bangkok/2566');
    expect(res.status).toBe(200);
    expect(
      typeof res.body === 'object'
    ).toBe(true);
  });

  // 10. Usage by province & year (invalid province)
  it('should return message for invalid province usage', async () => {
    const res = await request(app).get('/api/usage/Invalid/9999');
    expect(res.body.message).toBe('Data not found');
  });

  // 11. Users by province & year (valid OR not found case)
  it('should return users data or not found message', async () => {
    const res = await request(app).get('/api/users/Bangkok/2566');
    expect(res.status).toBe(200);
    expect(
      typeof res.body === 'object'
    ).toBe(true);
  });

  // 12. Users by province & year (invalid province)
  it('should return message for invalid users data', async () => {
    const res = await request(app).get('/api/users/Invalid/9999');
    expect(res.body.message).toBe('Data not found');
  });

});