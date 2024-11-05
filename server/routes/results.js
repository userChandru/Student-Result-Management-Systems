import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/:semester', authenticateToken, async (req, res) => {
  try {
    const { semester } = req.params;
    const { studentId } = req.user;

    const [results] = await req.db.execute(
      `SELECT * FROM results WHERE student_id = ? AND semester = ?`,
      [studentId, semester]
    );

    const [cgpa] = await req.db.execute(
      `SELECT AVG(gpa) as cgpa FROM results WHERE student_id = ?`,
      [studentId]
    );

    res.json({
      results,
      cgpa: cgpa[0].cgpa
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router; 