
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import LiveAartiPage from "./pages/LiveAartiPage";
import TimingsPage from "./pages/TimingsPage";
import PoliciesPage from "./pages/PoliciesPage";
import NotFound from "./pages/NotFound";
import PoshakSevaPage from "./pages/PoshakSevaPage";
import GalleryPage from "./pages/GalleryPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/live-aarti" element={<LiveAartiPage />} />
            <Route path="/timings" element={<TimingsPage />} />
            <Route path="/policies" element={<PoliciesPage />} />
            <Route path="/poshak-seva" element={<PoshakSevaPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
