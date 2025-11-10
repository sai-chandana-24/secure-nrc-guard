import React from 'react';
import { Bell, Search, Shield, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { UserProfile } from '@/components/auth/UserProfile';
import chhattishgarhLogo from '@/assets/chhattisgarh-logo.png';
import { useNavigate, useLocation } from 'react-router-dom';

export function DashboardHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = React.useState('');
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Sync from URL when landing on /search
  React.useEffect(() => {
    if (location.pathname === '/search') {
      const params = new URLSearchParams(location.search);
      const q = params.get('q') || '';
      setQuery(q);
    }
  }, [location.pathname, location.search]);

  const handleAlertClick = () => {
    // Using hash directly to ensure it jumps even if already on the page
    window.location.hash = 'performance';
  };

  return (
    // Matched height strictly to h-16 and removed extra top/bottom paddings if any existed globally
    <header className="bg-card border-b sticky top-0 z-50 h-16 shrink-0 flex items-center">
      <div className="flex items-center justify-between w-full px-4 md:px-6">
        {/* Left Section */}
        <div className="flex items-center gap-4">
          <SidebarTrigger className="p-2 hover:bg-muted rounded-md govt-transition" />
          <div className="hidden md:flex items-center gap-3">
            {/* Vertical separator to visual align with sidebar border if needed, optional */}
            <div className="h-6 w-px bg-border/50 hidden lg:block"></div> 
            <img src={chhattishgarhLogo} alt="Chhattisgarh Government Logo" className="h-10 w-auto object-contain" />
            <div className="leading-tight text-left">
              <h1 className="text-sm md:text-lg font-semibold text-primary leading-tight">
                NRC E-Finance Portal
              </h1>
              <p className="text-[10px] md:text-xs text-muted-foreground leading-tight hidden sm:block">
                Government of Chhattisgarh - Nutritional Rehabilitation Centers
              </p>
            </div>
          </div>
        </div>

        {/* Center Section - Search */}
        <div className="flex-1 max-w-md mx-4">
          <div className="relative">
            {/* Search input hidden for now based on previous code, keeping structure */}
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                onClick={() => {
                  setQuery('');
                  inputRef.current?.focus();
                }}
              >
                ×
              </button>
            )}
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2 md:gap-4">
          {/* System Status */}
          <div className="hidden xl:flex items-center gap-3 mr-2">
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-muted/50 rounded-full border border-border/50">
              <div className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></div>
              <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">Blockchain Active</span>
            </div>
          </div>

          {/* Notifications - Updated with Redirect */}
          <Button 
            variant="ghost" 
            size="icon" 
            className="relative"
            onClick={handleAlertClick}
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <Badge className="absolute top-1.5 right-1.5 w-2 h-2 p-0 bg-destructive border-2 border-background rounded-full">
              <span className="sr-only">Notifications</span>
            </Badge>
          </Button>

          {/* User Profile */}
          <UserProfile />
        </div>
      </div>
    </header>
  );
}