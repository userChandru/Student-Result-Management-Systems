import { useState } from 'react';
import { Card } from './ui/Card';
import { Button } from './ui/Button';
import { Select } from './ui/Select';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Clock, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export function RevaluationSystem() {
  const [selectedSubject, setSelectedSubject] = useState('');

  const { data: revaluations } = useQuery({
    queryKey: ['revaluations'],
    queryFn: async () => {
      // Replace with actual API call
      return [
        {
          id: 1,
          subject: 'Database Management',
          currentMark: 75,
          status: 'pending',
          submittedDate: '2024-03-10',
          feedback: null
        },
        {
          id: 2,
          subject: 'Data Structures',
          currentMark: 68,
          status: 'approved',
          submittedDate: '2024-03-05',
          feedback: 'Marks updated after review',
          updatedMark: 72
        }
      ];
    }
  });

  const submitMutation = useMutation({
    mutationFn: async (data) => {
      // Replace with actual API call
      return new Promise((resolve) => {
        setTimeout(() => resolve({ success: true }), 1000);
      });
    },
    onSuccess: () => {
      toast.success('Revaluation request submitted successfully');
      setSelectedSubject('');
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-amber-500';
      case 'approved': return 'text-green-500';
      case 'rejected': return 'text-red-500';
      default: return 'text-slate-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5" />;
      case 'approved': return <CheckCircle className="w-5 h-5" />;
      case 'rejected': return <XCircle className="w-5 h-5" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Request Revaluation</h3>
        <div className="space-y-4">
          <Select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            options={[
              { value: 'DBS', label: 'Database Management' },
              { value: 'DSA', label: 'Data Structures' }
            ]}
            label="Select Subject"
          />
          <Button 
            onClick={() => submitMutation.mutate({ subject: selectedSubject })}
            disabled={!selectedSubject || submitMutation.isPending}
            className="w-full"
          >
            {submitMutation.isPending ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Revaluation Status</h3>
        <div className="space-y-4">
          {revaluations?.map((request) => (
            <div 
              key={request.id}
              className="p-4 rounded-lg border border-slate-200 space-y-2"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium">{request.subject}</h4>
                <div className={`flex items-center gap-2 ${getStatusColor(request.status)}`}>
                  {getStatusIcon(request.status)}
                  <span className="capitalize">{request.status}</span>
                </div>
              </div>
              
              <div className="text-sm text-slate-600">
                <p>Current Mark: {request.currentMark}</p>
                {request.updatedMark && (
                  <p className="text-green-600">Updated Mark: {request.updatedMark}</p>
                )}
                <p className="text-xs mt-1">Submitted: {request.submittedDate}</p>
              </div>

              {request.feedback && (
                <div className="text-sm bg-slate-50 p-2 rounded mt-2">
                  <p className="font-medium">Feedback:</p>
                  <p className="text-slate-600">{request.feedback}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
} 