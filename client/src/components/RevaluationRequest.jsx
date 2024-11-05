import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { Button } from './ui/Button';
import { Textarea } from './ui/Textarea';
import toast from 'react-hot-toast';
import api from '../lib/axios';

export function RevaluationRequest({ subjectId, onSuccess }) {
  const [reason, setReason] = useState('');

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data) => {
      // Mock successful response for development
      return {
        id: Math.random().toString(36).substr(2, 9),
        subjectId: data.subjectId,
        reason: data.reason,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
    },
    onSuccess: () => {
      toast.success('Revaluation request submitted successfully');
      setReason('');
      onSuccess?.();
    },
    onError: () => {
      toast.error('Failed to submit revaluation request');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!reason.trim()) {
      toast.error('Please provide a reason for revaluation');
      return;
    }
    mutate({ subjectId, reason });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mt-4 p-4 border rounded-lg bg-gray-50">
      <h3 className="font-semibold text-lg">Request Revaluation</h3>
      <Textarea
        value={reason}
        onChange={(e) => setReason(e.target.value)}
        placeholder="Please provide reason for revaluation..."
        className="min-h-[100px]"
        required
      />
      <Button 
        type="submit"
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Submitting...' : 'Submit Request'}
      </Button>
    </form>
  );
} 