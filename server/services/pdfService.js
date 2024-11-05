import PDFDocument from 'pdfkit';

export async function generateResultsPDF(studentInfo, results) {
  const doc = new PDFDocument();
  
  // Header
  doc.fontSize(24).text('Semester Result Report', { align: 'center' });
  doc.moveDown();
  
  // Student Info
  doc.fontSize(12)
    .text(`Name: ${studentInfo.name}`)
    .text(`Roll No: ${studentInfo.rollNo}`)
    .text(`Department: ${studentInfo.department}`)
    .text(`Semester: ${studentInfo.semester}`);
  
  doc.moveDown();

  // Results Table
  const tableTop = 200;
  let currentTop = tableTop;

  // Table Headers
  const columns = ['Subject', 'Marks', 'Grade', 'Credits'];
  const columnWidth = 150;
  
  columns.forEach((header, i) => {
    doc.text(header, 50 + (i * columnWidth), currentTop);
  });

  currentTop += 20;

  // Table Rows
  results.forEach(result => {
    doc.text(result.subject, 50, currentTop);
    doc.text(result.marks.toString(), 200, currentTop);
    doc.text(result.grade, 350, currentTop);
    doc.text(result.credits.toString(), 500, currentTop);
    currentTop += 20;
  });

  return doc;
} 