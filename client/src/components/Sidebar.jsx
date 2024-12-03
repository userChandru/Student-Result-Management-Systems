import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, BookOpen, Bell } from 'lucide-react';

export function Sidebar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="w-72 min-h-screen bg-gradient-to-b from-white to-slate-50/30 dark:from-slate-900 dark:to-slate-800/30 backdrop-blur-sm border-r border-slate-200 dark:border-slate-700 shadow-lg flex flex-col">
      <div className="p-6 border-b border-slate-200/80">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
          Student Results
        </h1>
      </div>

      <div className="flex items-center gap-4 p-6 bg-gradient-to-r from-indigo-50/50 to-blue-50/50 dark:from-indigo-900/20 dark:to-blue-900/20 border-b border-slate-200/80">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-600 to-blue-600 flex items-center justify-center ring-2 ring-white shadow-lg">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <p className="font-medium text-slate-900 dark:text-slate-100">{user?.name}</p>
          <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{user?.role}</p>
        </div>
      </div>

      <nav className="p-4 space-y-2">
        <button className="flex items-center gap-3 w-full p-3 text-black/70 hover:text-black bg-white/5 hover:bg-white/30 rounded-lg transition-all duration-200">
          <BookOpen className="w-5 h-5" />
          <span>Results</span>
        </button>
        <button className="flex items-center gap-3 w-full p-3 text-black/70 hover:text-black bg-white/5 hover:bg-white/30 rounded-lg transition-all duration-200">
          <Bell className="w-5 h-5" />
          <span>Notifications</span>
        </button>
      </nav>

      <div className="mt-auto p-4 border-t border-white/10">
        <button
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="flex items-center gap-3 w-full p-3 text-red-300 hover:text-red-800 bg-red-500/10 hover:bg-red-300/20 rounded-lg transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
} 