import express from 'express';

const router = express.Router();

router.get('/health', (req, res) => {
  res.send('All ok');
});

export default router;