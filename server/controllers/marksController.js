import multer from 'multer';
import { parse } from 'csv-parse';
import { promises as fs } from 'fs';
import pool from '../config/database.js';

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'text/csv' || file.mimetype === 'application/vnd.ms-excel') {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only CSV files are allowed.'));
    }
  }
}).single('file');

export async function uploadMarks(req, res) {
  const { batch, department, semester } = req.body;
  const file = req.file;

  if (!file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const fileContent = await fs.readFile(file.path);
    parse(fileContent, {
      columns: true,
      skip_empty_lines: true
    }, async (err, records) => {
      if (err) {
        return res.status(400).json({ error: 'Invalid CSV format' });
      }

      try {
        await pool.query('START TRANSACTION');

        for (const record of records) {
          await pool.query(`
            INSERT INTO results (student_id, subject_id, semester, exam_marks, internal_marks)
            VALUES (?, ?, ?, ?, ?)
          `, [record.student_id, record.subject_id, semester, record.exam_marks, record.internal_marks]);
        }

        await pool.query('COMMIT');
        res.json({ message: 'Marks uploaded successfully' });
      } catch (error) {
        await pool.query('ROLLBACK');
        res.status(500).json({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
} 