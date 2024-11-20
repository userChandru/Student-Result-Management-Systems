/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: "#0f172a",
  				foreground: "#ffffff",
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			'custom-gradient': {
  				start: '#4F46E5',
  				end: '#2563EB',
  			},
  			'custom-indigo': {
  				50: '#EEF2FF',
  				100: '#E0E7FF',
  				600: '#4F46E5',
  				700: '#4338CA',
  				900: '#312E81',
  			},
  			'custom-blue': {
  				50: '#EFF6FF',
  				100: '#DBEAFE',
  				600: '#2563EB',
  				700: '#1D4ED8',
  			},
  			'gradient': {
  				'primary-start': '#4F46E5',
  				'primary-end': '#2563EB',
  				'secondary-start': '#EC4899',
  				'secondary-end': '#8B5CF6',
  				'success-start': '#10B981',
  				'success-end': '#059669',
  				'warning-start': '#F59E0B',
  				'warning-end': '#D97706',
  			},
  			'custom': {
  				'bg-start': '#F8FAFC',
  				'bg-end': '#EFF6FF',
  				'card': 'rgba(255, 255, 255, 0.8)',
  				'card-hover': 'rgba(255, 255, 255, 0.9)',
  			},
  		},
  		boxShadow: {
  			'custom': '0 0 50px -12px rgba(79, 70, 229, 0.25)',
  		},
  		backgroundImage: {
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
  		},
  		backgroundColor: {
  			'dark': {
  				'primary': '#1a1b1e',
  				'secondary': '#25262b',
  				'accent': '#2c2d32'
  			}
  		},
  		textColor: {
  			'dark': {
  				'primary': '#ffffff',
  				'secondary': '#a1a1aa',
  				'accent': '#71717a'
  			}
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
  darkMode: 'class',
}