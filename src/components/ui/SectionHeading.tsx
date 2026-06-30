import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-500">{eyebrow}</p> : null}
        <h2 className="text-3xl font-semibold tracking-tight text-slate-950 dark:text-white md:text-4xl">{title}</h2>
        <p className="mt-3 text-base leading-7 text-slate-600 dark:text-slate-300">{description}</p>
      </div>
      {action}
    </div>
  );
}
