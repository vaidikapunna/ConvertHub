import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import { Button } from '../ui/Button';
import { CloseIcon, LogoMark, MenuIcon, MoonIcon, SunIcon } from '../ui/Icons';
import { useTheme } from '../../hooks/useTheme';

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Image Tools', to: '/image-tools' },
  { label: 'PDF Tools', to: '/pdf-tools' },
  { label: 'Document Tools', to: '/document-tools' },
  { label: 'About', to: '/about' },
];

export function Navbar() {
  const { mode, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl dark:border-slate-800/80 dark:bg-slate-950/75">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-glow dark:bg-white dark:text-slate-950">
            <LogoMark className="h-8 w-8" />
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.28em] text-cyan-600 dark:text-cyan-400">ConvertHub</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">Browser-based file converter</p>
          </div>
        </NavLink>

        <nav className="hidden items-center gap-2 xl:flex" aria-label="Primary">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="ghost"
            className="px-3"
            onClick={toggleTheme}
            aria-label={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}
          >
            {mode === 'dark' ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
          </Button>
          <Button
            type="button"
            variant="ghost"
            className="px-3 xl:hidden"
            onClick={() => setIsOpen((current) => !current)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <CloseIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {isOpen ? (
        <div id="mobile-menu" className="border-t border-slate-200/70 bg-white/95 px-4 pb-4 dark:border-slate-800 dark:bg-slate-950/95 xl:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-2 pt-4">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-2xl px-4 py-3 text-sm font-medium ${
                    isActive
                      ? 'bg-slate-950 text-white dark:bg-white dark:text-slate-950'
                      : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
