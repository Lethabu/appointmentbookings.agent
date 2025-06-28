import express from 'express';
import { getFromCache, setToCache } from '../utils/cache';

const router = express.Router();

router.get('/services', (req, res) => {
  const cached = getFromCache('services');
  if (cached) return res.json(cached);

  // Fetch from DB or source
  const services = [/* ... */];
  setToCache('services', services);
  res.json(services);
});

export default router;