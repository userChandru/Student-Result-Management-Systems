import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    padding: 30,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: '100%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#bfbfbf',
    marginBottom: 10,
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCell: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#bfbfbf',
  },
});

export function PDFReport({ results, studentInfo }) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.header}>Semester Result Report</Text>
        <View style={styles.table}>
          {/* Student Info */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCell}>Name: {studentInfo.name}</Text>
            <Text style={styles.tableCell}>Roll No: {studentInfo.rollNo}</Text>
          </View>
          
          {/* Results Table */}
          {results.map((result) => (
            <View style={styles.tableRow} key={result.subject}>
              <Text style={styles.tableCell}>{result.subject}</Text>
              <Text style={styles.tableCell}>{result.marks}</Text>
              <Text style={styles.tableCell}>{result.grade}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
} 