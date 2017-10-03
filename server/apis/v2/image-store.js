import express from 'express';

const router = express.Router(); //eslint-disable-line

router.post('/v2/upload', (req, res) => {
  // Store in cloudinary
  return res.json();
});

export default router;
