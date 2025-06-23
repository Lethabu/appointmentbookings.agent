import '@testing-library/jest-dom';

describe('/api/contact', () => {
  it('should return 400 for missing fields', async () => {
    const res = await fetch('/api/contact', { method: 'POST', body: '{}' });
    expect(res.status).toBe(400);
  });
});
