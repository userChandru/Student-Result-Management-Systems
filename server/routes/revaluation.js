import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.post('/request', authenticateToken, async (req, res) => {
  try {
    const { subjectId, reason } = req.body;
    const { studentId } = req.user;

    await req.db.execute(
      `INSERT INTO revaluation_requests (student_id, subject_id, reason, status)
       VALUES (?, ?, ?, 'pending')`,
      [studentId, subjectId, reason]
    );

    // Send notification to staff
    await req.db.execute(
      `INSERT INTO notifications (user_id, message, type)
       SELECT user_id, ?, 'revaluation'
       FROM users WHERE role = 'staff'`,
      [`New revaluation request for subject ${subjectId}`]
    );

    res.json({ message: 'Request submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 