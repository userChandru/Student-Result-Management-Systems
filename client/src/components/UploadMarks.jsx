import { useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Card } from './ui/Card';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';

export function UploadMarks() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  const uploadMutation = useMutation({
    mutationFn: async (formData) => {
      // Replace with actual API call
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            totalStudents: 50,
            totalSubjects: 6,
            averageScore: 75.5,
            summary: {
              passed: 45,
              failed: 5,
              highestScore: 98,
              lowestScore: 35
            }
          });
        }, 2000);
      });
    },
    onSuccess: (data) => {
      setPreview(data);
      toast.success('Marks uploaded successfully!');
    },
    onError: () => {
      toast.error('Failed to upload marks. Please try again.');
    }
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === 'text/csv' || file.type === 'application/vnd.ms-excel')) {
      setFile(file);
    } else {
      toast.error('Please upload a valid CSV file');
    }
  };

  const handleUpload = () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    uploadMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">Upload Marks</h3>
            <a 
              href="/template.csv" 
              download 
              className="text-sm text-indigo-600 hover:text-indigo-700"
            >
              Download Template
            </a>
          </div>

          <div className="border-2 border-dashed border-slate-200 rounded-lg p-8 text-center">
            <input
              type="file"
              accept=".csv,.xlsx"
              onChange={handleFileChange}
              className="hidden"
              id="file-upload"
            />
            <label 
              htmlFor="file-upload"
              className="cursor-pointer flex flex-col items-center gap-2"
            >
              <Upload className="w-8 h-8 text-slate-400" />
              <span className="text-sm text-slate-600">
                {file ? file.name : 'Drop CSV file here or click to upload'}
              </span>
            </label>
          </div>

          <Button
            onClick={handleUpload}
            disabled={!file || uploadMutation.isPending}
            className="w-full"
          >
            {uploadMutation.isPending ? 'Uploading...' : 'Upload Marks'}
          </Button>
        </div>
      </Card>

      {preview && (
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Upload Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-indigo-50 rounded-lg">
              <div className="flex items-center gap-2 text-indigo-600 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Total Students</span>
              </div>
              <p className="text-2xl font-bold text-indigo-700">{preview.totalStudents}</p>
            </div>
            
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-2 text-blue-600 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Total Subjects</span>
              </div>
              <p className="text-2xl font-bold text-blue-700">{preview.totalSubjects}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg">
              <div className="flex items-center gap-2 text-green-600 mb-2">
                <CheckCircle className="w-5 h-5" />
                <span className="font-medium">Pass Rate</span>
              </div>
              <p className="text-2xl font-bold text-green-700">
                {((preview.summary.passed / preview.totalStudents) * 100).toFixed(1)}%
              </p>
            </div>

            <div className="p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center gap-2 text-amber-600 mb-2">
                <AlertCircle className="w-5 h-5" />
                <span className="font-medium">Average Score</span>
              </div>
              <p className="text-2xl font-bold text-amber-700">{preview.averageScore}</p>
            </div>
          </div>

          <div className="mt-6 p-4 bg-slate-50 rounded-lg">
            <h4 className="font-medium mb-3">Score Distribution</h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-slate-600">Highest Score</p>
                <p className="text-lg font-semibold text-green-600">
                  {preview.summary.highestScore}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Lowest Score</p>
                <p className="text-lg font-semibold text-red-600">
                  {preview.summary.lowestScore}
                </p>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}