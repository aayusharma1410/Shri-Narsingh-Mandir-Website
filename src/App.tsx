
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
import TimingsPage from "./pages/TimingsPage";
import PoliciesPage from "./pages/PoliciesPage";
import NotFound from "./pages/NotFound";
import PoshakSevaPage from "./pages/PoshakSevaPage";
import GalleryPage from "./pages/GalleryPage";
import AuthPage from "./pages/AuthPage";
import LoginPopup from "@/components/LoginPopup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <LoginPopup />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/live-aarti" element={<LiveAartiPage />} />
              <Route path="/timings" element={<TimingsPage />} />
              <Route path="/gallery" element={<GalleryPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/poshak-seva" element={<PoshakSevaPage />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
