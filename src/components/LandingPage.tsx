import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

// LandingPage component: minimal, reliable login redirect
// - Exports a named component "LandingPage" (and default) to satisfy imports in App.tsx
// - Uses design-system components and semantic HTML
// - Clicking the button logs out any existing session, then routes to /login with a redirect back to /

export const LandingPage: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLoginClick = () => {
    try {
      if (isAuthenticated) {
        logout();
      }
    } catch (e) {
      // no-op: logout is safe
    }
    navigate("/login?redirect=/");
  };

  return (
    <div className="min-h-screen">
      <header className="container mx-auto px-6 py-10">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome to the Dashboard Portal</h1>
        <p className="mt-2 text-muted-foreground">Please sign in to access your role-based dashboard.</p>
      </header>

      <main className="container mx-auto px-6 pb-16">
        <section aria-labelledby="access-title">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle id="access-title">Access Your Dashboard</CardTitle>
              <CardDescription>Authenticate to continue. You will be redirected back after login.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={handleLoginClick} className="w-full" aria-label="Login to access dashboards">
                <span>Login to Access</span>
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>
    </div>
  );
};

export default LandingPage;
