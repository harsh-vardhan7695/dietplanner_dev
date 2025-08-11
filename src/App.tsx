import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/components/ThemeProvider";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Auth from "./pages/Auth";
import HowItWorks from "./pages/HowItWorks";
import SupportedDiets from "./pages/SupportedDiets";
import ProPlan from "./pages/ProPlan";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import CreatePlanPage from "./pages/CreatePlanPage";
import PlanDetailPage from "./pages/PlanDetailPage";
import HealthFormPage from "./pages/HealthFormPage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/supported-diets" element={<SupportedDiets />} />
            <Route path="/pro-plan" element={<ProPlan />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/create-plan" element={<CreatePlanPage />} />
            <Route path="/plan/:id" element={<PlanDetailPage />} />
            <Route path="/health-assessment" element={<HealthFormPage />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
