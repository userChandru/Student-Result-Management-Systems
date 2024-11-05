import pool from '../config/database.js';

export async function getNotifications(req, res) {
  try {
    const { userId, role } = req.user;
    let notifications;

    if (role === 'parent') {
      const [results] = await pool.execute(
        `SELECT n.*, s.name as student_name 
         FROM notifications n
         JOIN parent_student ps ON n.student_id = ps.student_id
         JOIN students s ON ps.student_id = s.id
         WHERE ps.parent_id = ?
         ORDER BY n.created_at DESC LIMIT 10`,
        [userId]
      );
      notifications = results;
    } else {
      const [results] = await pool.execute(
        'SELECT * FROM notifications WHERE user_id = ? ORDER BY created_at DESC LIMIT 10',
        [userId]
      );
      notifications = results;
    }

    res.json(notifications);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function markAsRead(req, res) {
  try {
    const { notificationId } = req.params;
    await pool.execute(
      'UPDATE notifications SET read = true WHERE id = ?',
      [notificationId]
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 