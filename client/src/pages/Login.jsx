import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Card } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Select } from '../components/ui/Select';
import { toast } from 'react-hot-toast';
import { User, Lock, UserCircle } from 'lucide-react';
import api from '../lib/axios';

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student'
  });

  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'staff', label: 'Staff' },
    { value: 'parent', label: 'Parent' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log(formData);
    
    try {
      const { data } = await api.post('/auth/login', formData);
      login(data.token);
      navigate('/');
      toast.success('Login successful');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 p-4">
        <div className="hidden md:flex flex-col justify-center space-y-4">
          <h1 className="text-4xl font-bold text-indigo-900">
            Student Result Management
          </h1>
          <p className="text-gray-600">
            Access your academic performance, track your progress, and manage your results all in one place.
          </p>
          <div className="bg-white/30 backdrop-blur-sm rounded-lg p-6 space-y-3">
            <div className="flex items-center gap-3 text-indigo-900">
              <UserCircle className="w-5 h-5" />
              <span>Easy access to semester results</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-900">
              <UserCircle className="w-5 h-5" />
              <span>Track academic progress</span>
            </div>
            <div className="flex items-center gap-3 text-indigo-900">
              <UserCircle className="w-5 h-5" />
              <span>Performance analytics</span>
            </div>
          </div>
        </div>

        <Card className="p-8 shadow-xl bg-white/80 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Select
              value={formData.role}
              onChange={(e) => setFormData(prev => ({ ...prev, role: e.target.value }))}
              options={roleOptions}
              label="Login as"
              icon={<User className="w-5 h-5 text-gray-500" />}
              className="bg-white"
            />
            
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                required
                className="pl-10 bg-white"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
              <Input
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                required
                className="pl-10 bg-white"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2.5"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
} 