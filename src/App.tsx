import { lazy, Suspense } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout';
import { NotificationsProvider } from './hooks/useNotifications';
import { ThemeProvider } from './hooks/useTheme';
import { ScrollToTop } from './components/layout/ScrollToTop';
import { LoadingScreen } from './components/ui/LoadingScreen';
import HomePage from './pages/HomePage';

const ImageToolsPage = lazy(() => import('./pages/ImageToolsPage'));
const PdfToolsPage = lazy(() => import('./pages/PdfToolsPage'));
const DocumentToolsPage = lazy(() => import('./pages/DocumentToolsPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPolicyPage = lazy(() => import('./pages/PrivacyPolicyPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));

export default function App() {
  return (
    <ThemeProvider>
      <NotificationsProvider>
        <BrowserRouter>
          <ScrollToTop />
          <Suspense fallback={<LoadingScreen label="Loading Project Flow" />}>
            <Routes>
              <Route path="/" element={<AppLayout />}>
                <Route index element={<HomePage />} />
                <Route path="image-tools" element={<ImageToolsPage />} />
                <Route path="pdf-tools" element={<PdfToolsPage />} />
                <Route path="document-tools" element={<DocumentToolsPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </NotificationsProvider>
    </ThemeProvider>
  );
}
