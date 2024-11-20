import express from 'express';
import { login } from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/login', login);

router.get('/check', authenticateToken, (req, res) => {
  res.json({ 
    user: {
      id: req.user.id,
      role: req.user.role,
      name: req.user.name
    } 
  });
});

export default router; 