import pool from '../config/database.js';

export async function getRevaluationRequests(req, res) {
  try {
    const { status } = req.query;
    const [requests] = await pool.execute(
      `SELECT 
        r.id, r.reason, r.status,
        s.name as studentName,
        sub.name as subjectName,
        res.grade as currentGrade
       FROM revaluation_requests r
       JOIN students s ON r.student_id = s.id
       JOIN subjects sub ON r.subject_id = sub.id
       JOIN results res ON r.result_id = res.id
       WHERE r.status = ?
       ORDER BY r.created_at DESC`,
      [status]
    );

    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function updateRevaluationStatus(req, res) {
  const connection = await pool.getConnection();
  try {
    const { requestId } = req.params;
    const { status } = req.body;

    await connection.beginTransaction();

    await connection.execute(
      'UPDATE revaluation_requests SET status = ? WHERE id = ?',
      [status, requestId]
    );

    if (status === 'approved') {
      // Create revaluation task
      await connection.execute(
        'INSERT INTO revaluation_tasks (request_id, assigned_to) VALUES (?, ?)',
        [requestId, req.user.id]
      );
    }

    await connection.commit();
    res.json({ success: true });
  } catch (error) {
    await connection.rollback();
    res.status(500).json({ error: error.message });
  } finally {
    connection.release();
  }
} 