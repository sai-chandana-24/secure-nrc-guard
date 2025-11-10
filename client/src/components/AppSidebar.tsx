import {
  LayoutDashboard,
  DollarSign,
  BarChart3,
  Users,
  Shield,
  FileText,
  HelpCircle,
  Bell,
  Settings,
  LogOut,
  MapPin,
  Building2,
  UserCheck,
  UserPlus,
  HeartHandshake,
  Eye,
  Globe
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

// Navigation items based on user roles
type NavItem = { title: string; url: string; icon: any; disabled?: boolean };

const getNavItems = (role: string): NavItem[] => {
  switch (role) {
    case 'admin':
      return [
        { title: "Dashboard", url: "/#top", icon: LayoutDashboard },
        { title: "Main Portal", url: "/home", icon: Globe },
        { title: "Fund Allocation", url: "/#fund-allocation", icon: DollarSign },
        { title: "Performance Analytics", url: "/#performance", icon: BarChart3 },
        { title: "User Management", url: "/users", icon: Users },
        { title: "System Audit Logs", url: "/audit", icon: Shield },
        { title: "Reports & Analytics", url: "/reports", icon: FileText },
      ];
    case 'district':
      return [
        { title: "District Overview", url: "/#top", icon: MapPin },
        { title: "Main Portal", url: "/home", icon: Globe },
        { title: "Block Performance", url: "/#block-performance", icon: BarChart3 },
        { title: "Fund Utilization", url: "/#fund-utilization", icon: DollarSign },
        { title: "District Allocations", url: "/#district-allocations", icon: DollarSign },
        { title: "Reports", url: "/reports", icon: FileText },
      ];
    case 'block':
      return [
        { title: "Block Dashboard", url: "/#top", icon: Building2 },
        { title: "Supervisor Monitoring", url: "/#supervisors", icon: UserCheck },
        { title: "Fund Requests", url: "/#fund-requests", icon: DollarSign },
        { title: "Resource Distribution", url: "/#resource-distribution", icon: Shield },
        { title: "Reports", url: "/reports", icon: FileText,  },
      ];
    case 'supervisor':
      return [
        { title: "Supervisor Dashboard", url: "/#top", icon: UserCheck },
        { title: "Child Validation", url: "/#validation", icon: Users },
        { title: "Teacher Performance", url: "/#teachers", icon: UserPlus },
        { title: "Follow-ups", url: "/#followups", icon: BarChart3 },
      ];
    case 'teacher':
      return [
        { title: "Teacher Dashboard", url: "/#top", icon: UserPlus },
        { title: "Child Health Entry", url: "/#entry", icon: Users },
        { title: "Progress Monitoring", url: "/#progress", icon: BarChart3 },
        { title: "Nutrition Kits", url: "/#kits", icon: Shield },
        { title: "Parent Communication", url: "/#communication", icon: FileText },
      ];
    case 'nrc':
      return [
        { title: "NRC Dashboard", url: "/#top", icon: HeartHandshake },
        { title: "Admissions", url: "/#admissions", icon: Users },
        { title: "Treatment Plans", url: "/#treatment", icon: FileText },
        { title: "Progress Tracking", url: "/#progress", icon: BarChart3 },
        { title: "Resource Requests", url: "/#resources", icon: Shield },
      ];
    case 'public':
      return [
        { title: "Public Dashboard", url: "/", icon: Eye },
        { title: "Fund Transparency", url: "/funds", icon: DollarSign},
        { title: "Health Statistics", url: "/statistics", icon: BarChart3},
        { title: "Reports", url: "/reports", icon: FileText},
        { title: "Complaints", url: "/complaints", icon: Bell },
      ];
    default:
      return [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
      ];
  }
};

const systemItems = [
  { title: "Alerts", url: "/#performance", icon: Bell },
  { title: "Support", url: "/support", icon: HelpCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();

  const isCollapsed = state === "collapsed";

  const isLinkActive = (url: string) => {
    const currentFullUrl = location.pathname + location.hash;
    if (url === '/#top' && location.pathname === '/' && !location.hash) {
      return true;
    }
    return currentFullUrl === url;
  };

  const getNavCls = (active: boolean) => {
    return cn(
      "flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all mb-1",
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : "text-slate-600 bg-transparent hover:bg-slate-100 hover:text-slate-900"
    );
  };

  const mainItems = getNavItems(user?.role || 'admin');

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-72"} collapsible="icon">
      {/* Removed overflow-hidden here to allow full rendering, relying on native scroll if needed */}
      <SidebarContent className="bg-card border-r flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-16 shrink-0 flex items-center px-6 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div className="truncate">
                <h2 className="font-bold text-sm md:text-base text-primary leading-tight truncate">NRC E-Finance</h2>
                <p className="text-[10px] md:text-xs text-muted-foreground leading-tight truncate">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        {/* Main Navigation Group - Removed overflow-hidden */}
        <SidebarGroup className="flex-1">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-3 mt-2">
            {user?.role === 'admin' ? 'Admin Navigation' : 'Main Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3">
              {mainItems.map((item) => {
                const active = isLinkActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    {item.disabled ? (
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-slate-400 cursor-not-allowed mb-1">
                              <item.icon className="w-4 h-4 shrink-0" />
                              {!isCollapsed && <span>{item.title}</span>}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>Coming soon</TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      <NavLink to={item.url} className={getNavCls(active)}>
                        <item.icon className={cn("w-4 h-4 shrink-0", active ? "text-primary-foreground" : "text-slate-500")} />
                        {!isCollapsed && <span className="truncate">{item.title}</span>}
                      </NavLink>
                    )}
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* System Group - Removed overflow-hidden */}
        <SidebarGroup className="mt-auto shrink-0">
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-6 py-2">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="px-3 pb-2">
              {systemItems.map((item) => {
                const active = isLinkActive(item.url);
                return (
                  <SidebarMenuItem key={item.title}>
                    <NavLink to={item.url} className={getNavCls(active)}>
                      <item.icon className={cn("w-4 h-4 shrink-0", active ? "text-primary-foreground" : "text-slate-500")} />
                      {!isCollapsed && <span className="truncate">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="border-t px-6 py-4 shrink-0 bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center shrink-0 border border-primary/20">
              <span className="text-xs font-bold text-primary">AD</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1 truncate">
                <p className="text-sm font-semibold truncate text-slate-700">{user?.name || 'Administrator'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.department || 'Finance Dept.'}</p>
              </div>
            )}
            {!isCollapsed && (
              <button
                onClick={logout}
                className="p-2 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors shrink-0"
                title="Logout"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}