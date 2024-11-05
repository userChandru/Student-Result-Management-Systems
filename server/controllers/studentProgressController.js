import pool from '../config/database.js';
import { calculateGPA } from '../utils/gradeCalculator.js';

export async function getStudentProgress(req, res) {
  try {
    const { studentId } = req.params;
    const connection = await pool.getConnection();

    try {
      // Get student details
      const [student] = await connection.execute(
        'SELECT * FROM students WHERE id = ?',
        [studentId]
      );

      // Get all results grouped by semester
      const [results] = await connection.execute(`
        SELECT r.*, s.name as subject_name, s.credits
        FROM results r
        JOIN subjects s ON r.subject_id = s.id
        WHERE r.student_id = ?
        ORDER BY r.semester
      `, [studentId]);

      // Calculate semester-wise performance
      const semesterData = results.reduce((acc, result) => {
        const sem = result.semester;
        if (!acc[sem]) acc[sem] = [];
        acc[sem].push(result);
        return acc;
      }, {});

      const progress = {
        totalCredits: results.reduce((acc, r) => acc + r.credits, 0),
        completedCredits: results.filter(r => r.grade !== 'F')
          .reduce((acc, r) => acc + r.credits, 0),
        currentCGPA: calculateGPA(results),
        semesterWiseGPA: Object.entries(semesterData).map(([sem, results]) => ({
          semester: parseInt(sem),
          gpa: calculateGPA(results)
        }))
      };

      res.json({ progress, semesterData: Object.values(semesterData) });
    } finally {
      connection.release();
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 