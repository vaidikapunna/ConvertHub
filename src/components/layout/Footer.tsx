import { NavLink } from 'react-router-dom';

const footerLinks = [
  { label: 'About', to: '/about' },
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Contact', to: '/contact' },
];

export function Footer() {
  return (
    <footer className="border-t border-slate-200/80 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-cyan-600 dark:text-cyan-400">ConvertHub</p>
          <p className="mt-2 max-w-xl text-sm leading-6 text-slate-600 dark:text-slate-400">
            Local-first file conversion with privacy, performance, and accessibility built in.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400">
          {footerLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className="transition hover:text-slate-950 dark:hover:text-white">
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </footer>
  );
}
