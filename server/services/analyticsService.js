import pool from '../config/database.js';

export async function getBatchAnalytics(batch, department) {
  const connection = await pool.getConnection();
  
  try {
    const [students] = await connection.execute(
      `SELECT s.id, s.name, s.roll_no,
        AVG(r.marks) as average_marks,
        COUNT(DISTINCT r.subject_id) as subjects_completed,
        SUM(CASE WHEN r.grade != 'F' THEN sub.credits ELSE 0 END) as credits_earned
       FROM students s
       LEFT JOIN results r ON s.id = r.student_id
       LEFT JOIN subjects sub ON r.subject_id = sub.id
       WHERE s.batch_year = ? AND s.department = ?
       GROUP BY s.id`,
      [batch, department]
    );

    const analytics = {
      totalStudents: students.length,
      batchAverage: calculateBatchAverage(students),
      passPercentage: calculatePassPercentage(students),
      distribution: calculateGradeDistribution(students),
      topPerformers: students
        .sort((a, b) => b.average_marks - a.average_marks)
        .slice(0, 5)
        .map(s => ({
          id: s.id,
          name: s.name,
          rollNo: s.roll_no,
          cgpa: s.average_marks / 10
        }))
    };

    return analytics;
  } finally {
    connection.release();
  }
}

function calculateBatchAverage(students) {
  return students.reduce((sum, s) => sum + s.average_marks, 0) / students.length;
}

function calculatePassPercentage(students) {
  const passed = students.filter(s => s.average_marks >= 40).length;
  return (passed / students.length) * 100;
}

function calculateGradeDistribution(students) {
  const ranges = [
    { label: 'Distinction', min: 75 },
    { label: 'First Class', min: 60 },
    { label: 'Second Class', min: 40 }
  ];

  return ranges.map(range => ({
    name: range.label,
    value: students.filter(s => s.average_marks >= range.min).length
  }));
} 