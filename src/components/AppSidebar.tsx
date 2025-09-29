import { useState } from "react";
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
  Eye
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

// Navigation items based on user roles
const getNavItems = (role: string) => {
  switch (role) {
    case 'admin':
      return [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
        { title: "Fund Allocation", url: "/fund-allocation", icon: DollarSign },
        { title: "Performance Analytics", url: "/performance", icon: BarChart3 },
        { title: "User Management", url: "/users", icon: Users },
        { title: "System Audit Logs", url: "/audit", icon: Shield },
        { title: "Reports & Analytics", url: "/reports", icon: FileText },
      ];
    case 'district':
      return [
        { title: "District Overview", url: "/", icon: MapPin },
        { title: "Block Performance", url: "/performance", icon: BarChart3 },
        { title: "Fund Utilization", url: "/fund-allocation", icon: DollarSign },
        { title: "NRC Monitoring", url: "/nrc", icon: HeartHandshake },
        { title: "Reports", url: "/reports", icon: FileText },
      ];
    case 'block':
      return [
        { title: "Block Dashboard", url: "/", icon: Building2 },
        { title: "Supervisor Monitoring", url: "/supervisors", icon: UserCheck },
        { title: "Fund Requests", url: "/fund-allocation", icon: DollarSign },
        { title: "Resource Distribution", url: "/resources", icon: Shield },
        { title: "Reports", url: "/reports", icon: FileText },
      ];
    case 'supervisor':
      return [
        { title: "Supervisor Dashboard", url: "/", icon: UserCheck },
        { title: "Child Validation", url: "/validation", icon: Users },
        { title: "Teacher Performance", url: "/teachers", icon: UserPlus },
        { title: "NRC Referrals", url: "/referrals", icon: HeartHandshake },
        { title: "Follow-ups", url: "/followups", icon: BarChart3 },
      ];
    case 'teacher':
      return [
        { title: "Teacher Dashboard", url: "/", icon: UserPlus },
        { title: "Child Health Entry", url: "/entry", icon: Users },
        { title: "Progress Monitoring", url: "/progress", icon: BarChart3 },
        { title: "Nutrition Kits", url: "/kits", icon: Shield },
        { title: "Parent Communication", url: "/communication", icon: FileText },
      ];
    case 'nrc':
      return [
        { title: "NRC Dashboard", url: "/", icon: HeartHandshake },
        { title: "Admissions", url: "/admissions", icon: Users },
        { title: "Treatment Plans", url: "/treatment", icon: FileText },
        { title: "Progress Tracking", url: "/progress", icon: BarChart3 },
        { title: "Resource Requests", url: "/resources", icon: Shield },
      ];
    case 'public':
      return [
        { title: "Public Dashboard", url: "/", icon: Eye },
        { title: "Fund Transparency", url: "/funds", icon: DollarSign },
        { title: "Health Statistics", url: "/statistics", icon: BarChart3 },
        { title: "Reports", url: "/reports", icon: FileText },
        { title: "Complaints", url: "/complaints", icon: Bell },
      ];
    default:
      return [
        { title: "Dashboard", url: "/", icon: LayoutDashboard },
      ];
  }
};

const systemItems = [
  { title: "Alerts", url: "/alerts", icon: Bell },
  { title: "Support", url: "/support", icon: HelpCircle },
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, logout } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isCollapsed = state === "collapsed";
  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive 
      ? "bg-primary/10 text-primary font-semibold border-r-2 border-primary" 
      : "hover:bg-muted/50 govt-transition";

  const mainItems = getNavItems(user?.role || 'admin');

  return (
    <Sidebar className={isCollapsed ? "w-16" : "w-72"} collapsible="icon">
      <SidebarContent className="bg-card govt-shadow-lg border-r">
        {/* Logo Section */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
              <Shield className="w-5 h-5 text-primary-foreground" />
            </div>
            {!isCollapsed && (
              <div>
                <h2 className="font-bold text-lg text-primary">NRC E-Finance</h2>
                <p className="text-xs text-muted-foreground">Admin Portal</p>
              </div>
            )}
          </div>
        </div>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">
            {user?.role === 'admin' ? 'Admin Navigation' : 
             user?.role === 'district' ? 'District Management' :
             user?.role === 'block' ? 'Block Operations' :
             user?.role === 'supervisor' ? 'Supervisor Tools' :
             user?.role === 'teacher' ? 'Teacher Portal' :
             user?.role === 'nrc' ? 'NRC Management' :
             user?.role === 'public' ? 'Public Access' : 'Main Navigation'}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!isCollapsed && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-2">
            System
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {systemItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} className={getNavCls}>
                      <item.icon className="w-4 h-4 shrink-0" />
                      {!isCollapsed && <span className="ml-2">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* User Section */}
        <div className="mt-auto border-t p-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-primary">AD</span>
            </div>
            {!isCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">{user?.name || 'User'}</p>
                <p className="text-xs text-muted-foreground">{user?.department || 'Department'}</p>
              </div>
            )}
            {!isCollapsed && (
              <button 
                onClick={logout}
                className="p-1 hover:bg-muted rounded govt-transition"
                title="Logout"
              >
                <LogOut className="w-4 h-4 text-muted-foreground" />
              </button>
            )}
          </div>
        </div>
      </SidebarContent>
    </Sidebar>
  );
}