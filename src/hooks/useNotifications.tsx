import { createContext, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { ConversionNotification } from '../types/converter';
import { createId } from '../utils/files';
import { ToastStack } from '../components/ui/ToastStack';

interface NotificationContextValue {
  pushNotification: (_notification: Omit<ConversionNotification, 'id'>) => void;
  clearNotification: (_id: string) => void;
}

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationsProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<ConversionNotification[]>([]);

  const value = useMemo<NotificationContextValue>(
    () => ({
      pushNotification: (notification) => {
        const id = createId('toast');
        setNotifications((current) => [
          ...current,
          { id, ...notification },
        ]);

        window.setTimeout(() => {
          setNotifications((current) => current.filter((item) => item.id !== id));
        }, 4500);
      },
      clearNotification: (id) => {
        setNotifications((current) => current.filter((item) => item.id !== id));
      },
    }),
    [],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <ToastStack notifications={notifications} onDismiss={value.clearNotification} />
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const value = useContext(NotificationContext);

  if (!value) {
    throw new Error('useNotifications must be used within NotificationsProvider.');
  }

  return value;
}
