import { Routes as RouterRoutes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import { Layout } from './components/Layout';
import { StudentDashboard } from './pages/StudentDashboard';
import { StaffDashboard } from './pages/StaffDashboard';
import { ParentDashboard } from './pages/ParentDashboard';
import { Login } from './pages/Login';
import { ErrorBoundary } from './components/ErrorBoundary';

export function Routes() {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <ErrorBoundary>
      <RouterRoutes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
        
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              user ? (
                user.role === 'student' ? (
                  <ErrorBoundary>
                    <StudentDashboard />
                  </ErrorBoundary>
                ) : user.role === 'staff' ? (
                  <ErrorBoundary>
                    <StaffDashboard />
                  </ErrorBoundary>
                ) : (
                  <ErrorBoundary>
                    <ParentDashboard />
                  </ErrorBoundary>
                )
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Route>
      </RouterRoutes>
    </ErrorBoundary>
  );
} 