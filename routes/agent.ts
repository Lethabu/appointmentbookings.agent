import express from 'express';
import { performAgentAction } from '../services/aiAgent';

const router = express.Router();

router.post('/action', (req, res) => {
  const { agent, action, payload } = req.body;
  const result = performAgentAction(agent, action, payload);
  res.json(result);
});

export default router;