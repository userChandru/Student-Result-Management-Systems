import { Table } from './ui/Table';
import { Button } from './ui/Button';
import { RevaluationRequest } from './RevaluationRequest';
import { Select } from './ui/Select';
import { useState } from 'react';

export function ResultsTable({ data }) {
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedSemester, setSelectedSemester] = useState('S1');

  const semesterOptions = ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <span className="font-medium">Semester:</span>
          <Select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
            options={semesterOptions}
          />
        </div>
        <div className="flex gap-4">
          <div>
            <span className="font-medium">SGPA:</span>
            <span className="ml-2">{data?.sgpa || '-'}</span>
          </div>
          <div>
            <span className="font-medium">CGPA:</span>
            <span className="ml-2">{data?.cgpa || '-'}</span>
          </div>
          <div>
            <span className="font-medium">Dept wise Rank:</span>
            <span className="ml-2">{data?.deptRank || '-'}</span>
          </div>
        </div>
      </div>

      <Table>
        <thead>
          <tr>
            <th>Subject Code</th>
            <th>Subject</th>
            <th>Exam Marks</th>
            <th>Internal marks</th>
            <th>Total</th>
            <th>Dept Highest</th>
            <th>Dept Lowest</th>
            <th>Dept Rank</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((subject) => (
            <tr key={subject.code}>
              <td>{subject.code}</td>
              <td>{subject.name}</td>
              <td>{subject.examMarks}</td>
              <td>{subject.internalMarks}</td>
              <td>{subject.examMarks + subject.internalMarks}</td>
              <td>{subject.deptHighest}</td>
              <td>{subject.deptLowest}</td>
              <td>{subject.deptRank}</td>
              <td>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedSubject(subject.code)}
                >
                  Request Revaluation
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedSubject && (
        <RevaluationRequest
          subjectId={selectedSubject}
          onSuccess={() => setSelectedSubject(null)}
        />
      )}
    </div>
  );
} 