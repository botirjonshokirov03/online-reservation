'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle() {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse" />
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="relative w-14 h-7 rounded-full transition-colors duration-300"
            style={{
                background: theme === 'dark'
                    ? 'linear-gradient(135deg, #1e293b, #334155)'
                    : 'linear-gradient(135deg, #fbbf24, #f59e0b)',
            }}
            aria-label="Toggle theme"
        >
            <div
                className={`absolute top-1 w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-300 flex items-center justify-center ${theme === 'dark' ? 'translate-x-8' : 'translate-x-1'
                    }`}
            >
                {theme === 'dark' ? (
                    <FiMoon className="w-3 h-3 text-indigo-600" />
                ) : (
                    <FiSun className="w-3 h-3 text-amber-600" />
                )}
            </div>
        </button>
    );
}
