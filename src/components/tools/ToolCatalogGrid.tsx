import { Link } from 'react-router-dom';
import { Card } from '../ui/Card';
import type { ToolCard } from '../../types/converter';

export function ToolCatalogGrid({ items }: { items: ToolCard[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <Card key={item.title} className="group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-emerald-500/0 opacity-0 transition group-hover:opacity-100" />
          <p className="text-lg font-semibold text-slate-950 dark:text-white">{item.title}</p>
          <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.description}</p>
          <div className="mt-4 flex items-center justify-between">
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] ${
                item.status === 'ready'
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-300'
                  : 'bg-amber-500/10 text-amber-600 dark:text-amber-300'
              }`}
            >
              {item.status === 'ready' ? 'Ready' : 'Planned'}
            </span>
            <Link to={item.href} className="text-sm font-semibold text-cyan-600 transition hover:text-cyan-500 dark:text-cyan-400">
              Open
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
}
