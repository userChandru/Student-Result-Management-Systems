import pool from '../config/database.js';

export async function sendNotification({ type, userId = null, role = null, message }) {
  const connection = await pool.getConnection();
  
  try {
    if (role) {
      // Send to all users with specific role
      await connection.execute(
        `INSERT INTO notifications (user_id, type, message)
         SELECT id, ?, ? FROM users WHERE role = ?`,
        [type, message, role]
      );
    } else if (userId) {
      // Send to specific user
      await connection.execute(
        'INSERT INTO notifications (user_id, type, message) VALUES (?, ?, ?)',
        [userId, type, message]
      );
    }
  } finally {
    connection.release();
  }
} 