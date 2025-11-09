import React from 'react';
import { Bell, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserProfile } from '@/components/auth/UserProfile';
import chhattishgarhLogo from '@/assets/chhattisgarh-logo.png';

export function DashboardHeader() {
  return (
    <header className="bg-card border-b govt-shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="p-2 hover:bg-muted rounded-md govt-transition" />
          <div className="hidden md:flex items-center gap-3">
            <img src={chhattishgarhLogo} alt="Chhattisgarh Government Logo" className="h-10" />
            <div className="leading-tight text-left">
              <h1 className="text-lg font-semibold text-primary leading-tight">
                Chhattisgarh NRC E-Finance Dashboard
              </h1>
              <p className="text-xs text-muted-foreground leading-tight">
                Government of Chhattisgarh - Nutritional Rehabilitation Centers
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* System Status */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-xs text-muted-foreground">Blockchain Active</span>
            </div>
            <div className="flex items-center gap-1">
              <Globe className="w-3 h-3 text-success" />
              <span className="text-xs text-muted-foreground">MongoDB Connected</span>
            </div>
          </div>

          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-4 h-4" />
            <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 bg-destructive text-destructive-foreground text-xs">
              3
            </Badge>
          </Button>

          {/* Security Level */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1 bg-success/10 rounded-full">
            <Shield className="w-3 h-3 text-success" />
            <span className="text-xs font-medium text-success">Secure Session</span>
          </div>

          {/* User Profile */}
          <UserProfile />
        </div>
      </div>
    </header>
  );
}