import { Routes, Route, Navigate } from 'react-router-dom';
import { StaffDashboard } from './pages/StaffDashboard';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { PrivateRoute } from './components/PrivateRoute';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/student/*" 
        element={
          <PrivateRoute role="student">
            <StudentDashboard />
          </PrivateRoute>
        } 
      />
      <Route 
        path="/staff/*" 
        element={
          <PrivateRoute role="staff">
            <StaffDashboard />
          </PrivateRoute>
        } 
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
} 