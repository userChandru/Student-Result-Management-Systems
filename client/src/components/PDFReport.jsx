import { PDFDownloadLink, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';
import { Button } from './ui/Button';
import { FileDown } from 'lucide-react';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center' },
  subtitle: { fontSize: 18, marginBottom: 15, marginTop: 10 },
  table: { display: 'table', width: '100%', marginBottom: 20 },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#E2E8F0' },
  tableHeader: { backgroundColor: '#F1F5F9', padding: 8 },
  tableCell: { padding: 8, flex: 1 },
  text: { fontSize: 12, color: '#1E293B' },
  bold: { fontWeight: 'bold' },
});

const PDFDocument = ({ data }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Academic Report</Text>
      
      <Text style={styles.subtitle}>Student Details</Text>
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.text]}>Name: {data.name}</Text>
          <Text style={[styles.tableCell, styles.text]}>Roll No: {data.rollNo}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={[styles.tableCell, styles.text]}>CGPA: {data.cgpa}</Text>
          <Text style={[styles.tableCell, styles.text]}>Department: {data.department}</Text>
        </View>
      </View>

      <Text style={styles.subtitle}>Semester Results</Text>
      {data.results.map((semester, index) => (
        <View key={index} style={styles.table}>
          <View style={[styles.tableRow, styles.tableHeader]}>
            <Text style={[styles.tableCell, styles.text, styles.bold]}>Subject</Text>
            <Text style={[styles.tableCell, styles.text, styles.bold]}>Marks</Text>
            <Text style={[styles.tableCell, styles.text, styles.bold]}>Grade</Text>
          </View>
          {semester.subjects.map((subject, idx) => (
            <View key={idx} style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.text]}>{subject.name}</Text>
              <Text style={[styles.tableCell, styles.text]}>{subject.marks}</Text>
              <Text style={[styles.tableCell, styles.text]}>{subject.grade}</Text>
            </View>
          ))}
        </View>
      ))}
    </Page>
  </Document>
);

export function PDFReport({ data }) {
  return (
    <PDFDownloadLink 
      document={<PDFDocument data={data} />} 
      fileName="academic-report.pdf"
    >
      {({ loading }) => (
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          disabled={loading}
        >
          <FileDown className="w-4 h-4" />
          {loading ? 'Generating PDF...' : 'Download Report'}
        </Button>
      )}
    </PDFDownloadLink>
  );
} 