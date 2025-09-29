import React from 'react';
import { Bell, Search, User, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import govtLogo from '@/assets/govt-logo.png';

export function DashboardHeader() {
  return (
    <header className="bg-card border-b govt-shadow-sm sticky top-0 z-50">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="p-2 hover:bg-muted rounded-md govt-transition" />
          <div className="hidden md:flex items-center gap-3">
            <img src={govtLogo} alt="Government Logo" className="h-8" />
            <div>
              <h1 className="text-lg font-semibold text-primary">
                NRC E-Finance Portal
              </h1>
              <p className="text-xs text-muted-foreground">
                Nutritional Rehabilitation Centers - State Administration
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search funds, districts, reports..." 
              className="pl-10 govt-transition focus:govt-shadow-glow"
            />
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
          <Button variant="ghost" size="sm" className="gap-2">
            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <User className="w-3 h-3 text-primary-foreground" />
            </div>
            <span className="hidden sm:inline text-sm font-medium">Admin</span>
          </Button>
        </div>
      </div>
    </header>
  );
}