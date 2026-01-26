import express from 'express';


const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.send('Admin Dashboard');
});


export default router;