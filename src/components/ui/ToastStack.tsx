import type { ConversionNotification } from '../../types/converter';

export function ToastStack({
  notifications,
  onDismiss,
}: {
  notifications: ConversionNotification[];
  onDismiss: (_id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 space-y-3 sm:right-6 sm:top-6">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`pointer-events-auto w-[min(90vw,22rem)] rounded-2xl border bg-white p-4 shadow-xl backdrop-blur dark:bg-slate-950 ${
            notification.tone === 'success'
              ? 'border-emerald-500/30'
              : notification.tone === 'error'
                ? 'border-rose-500/30'
                : 'border-cyan-500/30'
          }`}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-semibold text-slate-950 dark:text-white">{notification.title}</p>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{notification.description}</p>
            </div>
            <button
              type="button"
              className="rounded-full px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
              onClick={() => onDismiss(notification.id)}
              aria-label={`Dismiss ${notification.title}`}
            >
              ×
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
