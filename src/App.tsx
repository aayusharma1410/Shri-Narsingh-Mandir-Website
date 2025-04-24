
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { useAuth } from "@/contexts/AuthContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LiveAartiPage from "./pages/LiveAartiPage";
import TimingsPage from "./pages/TimingsPage";
import PoliciesPage from "./pages/PoliciesPage";
import NotFound from "./pages/NotFound";
import PoshakSevaPage from "./pages/PoshakSevaPage";
import GalleryPage from "./pages/GalleryPage";
import LoginPage from "./pages/LoginPage";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
              <Route path="/about" element={<ProtectedRoute><AboutPage /></ProtectedRoute>} />
              <Route path="/live-aarti" element={<ProtectedRoute><LiveAartiPage /></ProtectedRoute>} />
              <Route path="/timings" element={<ProtectedRoute><TimingsPage /></ProtectedRoute>} />
              <Route path="/gallery" element={<ProtectedRoute><GalleryPage /></ProtectedRoute>} />
              <Route path="/policies" element={<ProtectedRoute><PoliciesPage /></ProtectedRoute>} />
              <Route path="/poshak-seva" element={<ProtectedRoute><PoshakSevaPage /></ProtectedRoute>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
