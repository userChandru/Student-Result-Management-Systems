import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';

export function Layout() {
  return (
    <div className="w-screen min-h-screen overflow-x-hidden bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
      <div className="flex h-full">
        <Sidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="w-full space-y-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
} 