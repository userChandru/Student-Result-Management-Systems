export function calculateGrade(marks) {
  if (marks >= 90) return 'O';
  if (marks >= 80) return 'A+';
  if (marks >= 70) return 'A';
  if (marks >= 60) return 'B+';
  if (marks >= 50) return 'B';
  if (marks >= 40) return 'C';
  return 'F';
}

export function calculateGPA(results) {
  const gradePoints = {
    'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5, 'F': 0
  };

  const totalCredits = results.reduce((acc, r) => acc + r.credits, 0);
  const totalPoints = results.reduce((acc, r) => {
    const grade = calculateGrade(r.marks);
    return acc + (gradePoints[grade] * r.credits);
  }, 0);

  return totalPoints / totalCredits;
} 