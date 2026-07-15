import React, { lazy, Suspense, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ThemeProvider } from '@/components/theme-provider';
import { AppProvider } from '@/contexts/AppContext';
import { Toaster as Sonner } from '@/components/ui/sonner';

const Index          = lazy(() => import('@/pages/Index'));
const AdminDashboard = lazy(() => import('@/pages/AdminDashboard'));
const NotFound       = lazy(() => import('@/pages/NotFound'));
const SharedPlanView = lazy(() => import('@/pages/SharedPlanView'));

const AppLoadingFallback = React.memo(() => (
  <div className="min-h-screen bg-[#011a12] flex flex-col items-center justify-center p-6">
    <div className="relative mb-6">
      <div className="w-20 h-20 rounded-full overflow-hidden ring-2 ring-[#C9A84C] shadow-2xl border border-white/20 animate-pulse">
        <img
          src="https://rgvteytgkugdqdodedxq.supabase.co/storage/v1/object/public/bird-images/public/MTIT%20Logo.webp"
          alt="BIRD 2026-2035"
          className="w-full h-full object-cover"
          onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
        />
      </div>
      <div className="absolute -bottom-2 -right-2 w-8 h-8 border-2 border-[#C9A84C] border-t-transparent rounded-full animate-spin" />
    </div>
    <h2 className="text-[#ecfdf5] font-bold text-xl mb-2">Loading BIRD 2026-2035</h2>
    <p className="text-[#64748b] text-sm">Initializing your strategic workspace...</p>
  </div>
));

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('App Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#011a12] text-[#ecfdf5] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Something went wrong</h1>
            <p className="text-[#64748b] mb-4">We&apos;re sorry, but an unexpected error occurred.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[#C9A84C] hover:bg-[#E8C560] text-[#022c22] rounded-lg font-semibold transition-colors"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  // FIX #1: QueryClient inside component (StrictMode/HMR safe)
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: 1,
        staleTime: 5 * 60 * 1000,
        gcTime: 10 * 60 * 1000,
        suspense: false,
      },
      mutations: { retry: 1 },
    },
  }));

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} storageKey="bird-2026-2035-theme">
        <AppProvider>
          <BrowserRouter>
            <ErrorBoundary>
              <Suspense fallback={<AppLoadingFallback />}>
                <Routes>
                  {/* FIX #2: Specific routes MUST come before wildcard */}
                  <Route path="/admin" element={<AdminDashboard />} />
                  <Route path="/shared/:shareId" element={<SharedPlanView />} />
                  <Route path="/*" element={<Index />} />
                </Routes>
              </Suspense>
            </ErrorBoundary>

            {/* FIX #3: Removed broken radix Toaster; keep Sonner only */}
            <Sonner richColors position="top-right" duration={4000} closeButton theme="dark" />
          </BrowserRouter>
        </AppProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default React.memo(App);
