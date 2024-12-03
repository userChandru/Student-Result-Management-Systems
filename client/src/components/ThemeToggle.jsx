import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 bg-white border border-slate-200 dark:bg-slate-800 dark:border-slate-700 dark:hover:border-slate-600 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-slate-900 dark:text-white" />
      ) : (
        <Moon className="w-5 h-5 text-slate-900 dark:text-white" />
      )}
    </button>
  );
}