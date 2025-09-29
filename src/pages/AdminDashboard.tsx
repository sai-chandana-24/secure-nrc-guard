import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { DashboardStats } from '@/components/dashboard/DashboardStats';
import { FundAllocationModule } from '@/components/dashboard/FundAllocationModule';
import { PerformanceDashboard } from '@/components/dashboard/PerformanceDashboard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  Shield, 
  TrendingUp, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock
} from 'lucide-react';

const recentAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'Low Fund Utilization - Nashik District',
    message: 'Only 67% of allocated funds utilized in Q1',
    time: '2 hours ago',
    severity: 'medium'
  },
  {
    id: 2,
    type: 'success',
    title: 'Blockchain Transaction Verified',
    message: 'Fund transfer of ₹2.5Cr to Mumbai district completed',
    time: '4 hours ago',
    severity: 'low'
  },
  {
    id: 3,
    type: 'error',
    title: 'Audit Required - Aurangabad',
    message: 'Discrepancy found in fund utilization report',
    time: '6 hours ago',
    severity: 'high'
  }
];

const quickActions = [
  {
    title: 'New Fund Allocation',
    description: 'Allocate funds to districts',
    icon: TrendingUp,
    variant: 'govt' as const
  },
  {
    title: 'User Management',
    description: 'Add or manage users',
    icon: Users,
    variant: 'accent' as const
  },
  {
    title: 'Generate Reports',
    description: 'Download analytics reports',
    icon: Shield,
    variant: 'default' as const
  }
];

export default function AdminDashboard() {
  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning':
        return <Clock className="w-4 h-4 text-warning" />;
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      default:
        return <Bell className="w-4 h-4" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'high':
        return <Badge variant="destructive">High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return null;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Welcome Section */}
        <div className="govt-card-gradient p-6 rounded-lg govt-shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Chhattisgarh NRC E-Finance Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                State-level management of Nutritional Rehabilitation Centers with secure blockchain transactions
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
                <Shield className="w-5 h-5 text-success" />
                <span className="text-sm font-semibold text-success">System Operational</span>
              </div>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <DashboardStats />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Main Modules */}
          <div className="xl:col-span-2 space-y-6">
            <FundAllocationModule />
            <PerformanceDashboard />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card className="govt-shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <Button 
                    key={index}
                    variant={action.variant}
                    className="w-full justify-start gap-3 h-auto p-4"
                  >
                    <action.icon className="w-5 h-5 shrink-0" />
                    <div className="text-left">
                      <div className="font-semibold">{action.title}</div>
                      <div className="text-xs opacity-90">{action.description}</div>
                    </div>
                  </Button>
                ))}
              </CardContent>
            </Card>

            {/* Recent Alerts */}
            <Card className="govt-shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-primary" />
                  Recent Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {recentAlerts.map((alert) => (
                  <div key={alert.id} className="p-4 rounded-lg border govt-transition hover:govt-shadow-md">
                    <div className="flex items-start gap-3">
                      {getAlertIcon(alert.type)}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-sm truncate">{alert.title}</h4>
                          {getSeverityBadge(alert.severity)}
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                        <span className="text-xs text-muted-foreground">{alert.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full">
                  View All Alerts
                </Button>
              </CardContent>
            </Card>

            {/* System Status */}
            <Card className="govt-shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Blockchain Network</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-success">Active</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Database Connection</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                    <span className="text-xs text-success">Connected</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Security Level</span>
                  <Badge variant="default" className="bg-success">High</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Last Backup</span>
                  <span className="text-xs text-muted-foreground">2 hours ago</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}