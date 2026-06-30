import type { ReactNode } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/layout/Navbar';
import { Footer } from '../components/layout/Footer';

export function AppLayout({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen bg-transparent text-slate-950 dark:text-white">
      <Navbar />
      <main>{children ?? <Outlet />}</main>
      <Footer />
    </div>
  );
}
