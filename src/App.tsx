import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LoginPage } from "@/components/auth/LoginPage";
import AdminDashboard from "./pages/AdminDashboard";
import DistrictDashboard from "./pages/DistrictDashboard";
import BlockDashboard from "./pages/BlockDashboard";
import SupervisorDashboard from "./pages/SupervisorDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import NRCDashboard from "./pages/NRCDashboard";
import PublicDashboard from "./pages/PublicDashboard";
import NotFound from "./pages/NotFound";

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

  if (!isAuthenticated) {
    return <LoginPage />;
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
      <Route path="/" element={getDashboardComponent()} />
      <Route path="/fund-allocation" element={getDashboardComponent()} />
      <Route path="/performance" element={getDashboardComponent()} />
      <Route path="/users" element={getDashboardComponent()} />
      <Route path="/audit" element={getDashboardComponent()} />
      <Route path="/reports" element={getDashboardComponent()} />
      <Route path="/alerts" element={getDashboardComponent()} />
      <Route path="/support" element={getDashboardComponent()} />
      <Route path="/settings" element={getDashboardComponent()} />
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
