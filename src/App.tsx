import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginPage } from "@/components/auth/LoginPage";
import { LandingPage } from "@/components/LandingPage";
import SettingsPage from "./pages/SettingsPage";
import AdminDashboard from "./pages/AdminDashboard";
import DistrictDashboard from "./pages/DistrictDashboard";
import BlockDashboard from "./pages/BlockDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import NRCDashboard from "./pages/NRCDashboard";
import PublicDashboard from "./pages/PublicDashboard";
import NotFound from "./pages/NotFound";
import AlertsPage from "./pages/AlertsPage";
import SupportPage from "./pages/SupportPage";
import SearchPage from "./pages/SearchPage";

const queryClient = new QueryClient();

function AppRoutes() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center govt-bg-gradient">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  // Public routes that don't require authentication
  const publicRoutes = ['/home', '/main', '/landing', '/login'];
  const isPublicRoute = publicRoutes.includes(window.location.pathname);

  if (!isAuthenticated && !isPublicRoute) {
    return <LandingPage />;
  }

  // Route based on user role
  const getDashboardComponent = () => {
    switch (user?.role) {
      case 'admin':
        return <AdminDashboard />;
      case 'district':
        return <DistrictDashboard />;
      case 'block':
        return <BlockDashboard />;
      case 'supervisor':
        return <SupervisorDashboard />;
      case 'teacher':
        return <TeacherDashboard />;
      case 'nrc':
        return <NRCDashboard />;
      case 'public':
        return <PublicDashboard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={isAuthenticated ? getDashboardComponent() : <LandingPage />} />
      <Route path="/login" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/main" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      {/* Role-specific routes for navigation */}
      <Route path="/fund-allocation" element={getDashboardComponent()} />
      <Route path="/performance" element={getDashboardComponent()} />
      <Route path="/users" element={getDashboardComponent()} />
      <Route path="/audit" element={getDashboardComponent()} />
      <Route path="/reports" element={getDashboardComponent()} />
      <Route path="/alerts" element={<AlertsPage />} />
      <Route path="/support" element={<SupportPage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/settings" element={<SettingsPage />} />
      {/* Additional navigation routes */}
      <Route path="/nrc" element={getDashboardComponent()} />
      <Route path="/supervisors" element={getDashboardComponent()} />
      <Route path="/resources" element={getDashboardComponent()} />
      <Route path="/validation" element={getDashboardComponent()} />
      <Route path="/teachers" element={getDashboardComponent()} />
      <Route path="/referrals" element={getDashboardComponent()} />
      <Route path="/followups" element={getDashboardComponent()} />
      <Route path="/entry" element={getDashboardComponent()} />
      <Route path="/progress" element={getDashboardComponent()} />
      <Route path="/kits" element={getDashboardComponent()} />
      <Route path="/communication" element={getDashboardComponent()} />
      <Route path="/admissions" element={getDashboardComponent()} />
      <Route path="/treatment" element={getDashboardComponent()} />
      <Route path="/funds" element={getDashboardComponent()} />
      <Route path="/statistics" element={getDashboardComponent()} />
      <Route path="/complaints" element={getDashboardComponent()} />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
