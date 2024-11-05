export function calculateGrade(marks) {
  if (marks >= 90) return 'O';
  if (marks >= 80) return 'A';
  if (marks >= 70) return 'B';
  if (marks >= 60) return 'C';
  if (marks >= 50) return 'D';
  if (marks >= 40) return 'E';
  return 'F';
}

export function calculateGPA(results) {
  const gradePoints = {
    'O': 10, 'A': 9, 'B': 8, 'C': 7, 'D': 6, 'E': 5, 'F': 0
  };

  let totalCredits = 0;
  let totalPoints = 0;

  results.forEach(result => {
    totalCredits += result.credits;
    totalPoints += result.credits * gradePoints[result.grade];
  });

  return totalPoints / totalCredits;
}

export function calculateCompletionStatus(results, totalRequiredCredits) {
  const completedCredits = results
    .filter(r => r.grade !== 'F')
    .reduce((sum, r) => sum + r.credits, 0);
    
  return (completedCredits / totalRequiredCredits) * 100;
} 