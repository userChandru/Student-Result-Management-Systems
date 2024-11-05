import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Table } from './ui/Table';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import toast from 'react-hot-toast';

export function RevaluationTable() {
  const [status, setStatus] = useState('pending');
  const queryClient = useQueryClient();

  const { data: requests, isLoading } = useQuery({
    queryKey: ['revaluation-requests', status],
    queryFn: () => 
      fetch(`/api/revaluation/requests?status=${status}`).then(res => res.json())
  });

  const { mutate: updateStatus } = useMutation({
    mutationFn: ({ requestId, newStatus }) =>
      fetch(`/api/revaluation/requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      }).then(res => res.json()),
    onSuccess: () => {
      queryClient.invalidateQueries(['revaluation-requests']);
      toast.success('Request status updated');
    },
    onError: () => {
      toast.error('Failed to update request status');
    }
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={[
            { value: 'pending', label: 'Pending' },
            { value: 'approved', label: 'Approved' },
            { value: 'rejected', label: 'Rejected' }
          ]}
          label="Filter by Status"
        />
      </div>

      <Table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Subject</th>
            <th>Current Grade</th>
            <th>Reason</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests?.map((request) => (
            <tr key={request.id}>
              <td>{request.studentName}</td>
              <td>{request.subjectName}</td>
              <td>{request.currentGrade}</td>
              <td>{request.reason}</td>
              <td>
                <span className={`capitalize ${
                  request.status === 'pending' ? 'text-yellow-500' :
                  request.status === 'approved' ? 'text-green-500' :
                  'text-red-500'
                }`}>
                  {request.status}
                </span>
              </td>
              <td>
                {request.status === 'pending' && (
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => updateStatus({
                        requestId: request.id,
                        newStatus: 'approved'
                      })}
                    >
                      Approve
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => updateStatus({
                        requestId: request.id,
                        newStatus: 'rejected'
                      })}
                    >
                      Reject
                    </Button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
} 