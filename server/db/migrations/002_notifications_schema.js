import mysql from 'mysql2/promise';
import { config } from '../config.js';

const tables = [
  `CREATE TABLE IF NOT EXISTS notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    student_id INT,
    message TEXT NOT NULL,
    type ENUM('result', 'revaluation', 'general') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
  )`,

  `CREATE TABLE IF NOT EXISTS parent_student (
    parent_id INT,
    student_id INT,
    PRIMARY KEY (parent_id, student_id),
    FOREIGN KEY (parent_id) REFERENCES users(id),
    FOREIGN KEY (student_id) REFERENCES students(id)
  )`
];

async function runMigrations() {
  const connection = await mysql.createConnection(config.database);
  try {
    for (const table of tables) {
      await connection.execute(table);
    }
    console.log('Notification schema migrations completed');
  } catch (error) {
    console.error('Migration failed:', error);
    throw error;
  } finally {
    await connection.end();
  }
}

runMigrations(); 