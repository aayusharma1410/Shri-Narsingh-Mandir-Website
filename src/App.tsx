
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider } from "@/contexts/AuthContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LiveAartiPage from "./pages/LiveAartiPage";
import GalleryPage from "./pages/GalleryPage";
import TimingsPage from "./pages/TimingsPage";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "@/components/ProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={
                <ProtectedRoute>
                  <AboutPage />
                </ProtectedRoute>
              } />
              <Route path="/live-aarti" element={
                <ProtectedRoute>
                  <LiveAartiPage />
                </ProtectedRoute>
              } />
              <Route path="/gallery" element={
                <ProtectedRoute>
                  <GalleryPage />
                </ProtectedRoute>
              } />
              <Route path="/timings" element={
                <ProtectedRoute>
                  <TimingsPage />
                </ProtectedRoute>
              } />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
