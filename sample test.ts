import request from 'supertest';
import app from '../app';

describe('Health Check', () => {
  it('should return 401 without API key', async () => {
    const res = await request(app).get('/reminder/some-route');
    expect(res.statusCode).toBe(401);
  });
});