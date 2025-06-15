import request from 'supertest';
import express from 'express';
import { setWeatherRoutes } from '../routes/weatherRoutes';

const app = express();
app.use(express.json());
setWeatherRoutes(app);

describe('GET /api/weather/current', () => {
  it('should return 400 if lat/lon missing', async () => {
    const res = await request(app).get('/api/weather/current');
    expect(res.status).toBe(400);
  });
});
describe('GET /api/weather/forecast', () => {
  it('should return 400 if lat/lon missing', async () => {
    const res = await request(app).get('/api/weather/forecast');
    expect(res.status).toBe(400);
  });
});