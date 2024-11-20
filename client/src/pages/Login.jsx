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
  
  const roleOptions = [
    { value: 'student', label: 'Student' },
    { value: 'staff', label: 'Staff' },
    { value: 'parent', label: 'Parent' }
  ];

  const [formData, setFormData] = useState({
    username: '',
    password: '',
    role: 'student'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await api.post('/auth/login', formData);
      if (response.data.token) {
        await login(response.data.token);
        
        switch (formData.role) {
          case 'student':
            navigate('/student');
            break;
          case 'staff':
            navigate('/staff');
            break;
          default:
            navigate('/dashboard');
        }
        
        toast.success('Login successful!');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 w-screen h-screen">
      <div className="w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-12 p-8">
        <div className="hidden md:flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-900 to-blue-700 bg-clip-text text-transparent">
              Student Result Management
            </h1>
            <p className="text-lg text-gray-600">
              Access your academic performance, track your progress, and manage your results all in one place.
            </p>
          </div>
          
          <div className="bg-white/40 backdrop-blur-sm rounded-xl p-8 space-y-4 shadow-lg border border-white/50">
            <div className="flex items-center gap-4 text-indigo-900">
              <UserCircle className="w-6 h-6 text-indigo-600" />
              <span className="text-lg">Easy access to semester results</span>
            </div>
            <div className="flex items-center gap-4 text-indigo-900">
              <UserCircle className="w-6 h-6 text-indigo-600" />
              <span className="text-lg">Track academic progress</span>
            </div>
            <div className="flex items-center gap-4 text-indigo-900">
              <UserCircle className="w-6 h-6 text-indigo-600" />
              <span className="text-lg">Performance analytics</span>
            </div>
          </div>

          <div className="bg-gradient-to-r from-indigo-600/10 to-blue-600/10 p-6 rounded-lg">
            <p className="text-indigo-900 font-medium">
              "Education is the passport to the future, for tomorrow belongs to those who prepare for it today."
            </p>
            <p className="text-indigo-600 mt-2">- Malcolm X</p>
          </div>
        </div>

        <Card className="p-10 shadow-2xl bg-white/90 backdrop-blur-sm border border-white/50">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-700 to-blue-600 bg-clip-text text-transparent">
              Welcome Back
            </h2>
            <p className="text-gray-600 mt-3 text-lg">Please sign in to continue</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={roleOptions}
              icon={<UserCircle className="w-5 h-5 text-indigo-500" />}
              label="Login as"
              className="bg-white/80 border-indigo-100 focus:border-indigo-300"
            />
            
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
              <Input
                name="username"
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
                className="pl-12 bg-white/80 border-indigo-100 focus:border-indigo-300"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
              <Input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-12 bg-white/80 border-indigo-100 focus:border-indigo-300"
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white py-3 text-lg font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
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