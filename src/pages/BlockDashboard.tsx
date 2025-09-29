import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  DollarSign, 
  AlertCircle,
  Package,
  FileText,
  MessageSquare,
  HeartHandshake,
  Activity
} from 'lucide-react';

const supervisorData = [
  { id: 'SUP001', name: 'Ramesh Kumar', villages: 8, samChildren: 45, nrcReferrals: 12, accuracy: 92 },
  { id: 'SUP002', name: 'Sunita Verma', villages: 6, samChildren: 38, nrcReferrals: 15, accuracy: 88 },
  { id: 'SUP003', name: 'Prakash Singh', villages: 10, samChildren: 62, nrcReferrals: 18, accuracy: 95 },
  { id: 'SUP004', name: 'Meera Patel', villages: 7, samChildren: 33, nrcReferrals: 9, accuracy: 90 },
];

const fundRequests = [
  { supervisor: 'Ramesh Kumar', purpose: 'Medical Kits', amount: 25000, status: 'pending', priority: 'high' },
  { supervisor: 'Sunita Verma', purpose: 'Nutrition Supplements', amount: 18000, status: 'approved', priority: 'medium' },
  { supervisor: 'Prakash Singh', purpose: 'NRC Admission', amount: 35000, status: 'pending', priority: 'urgent' },
  { supervisor: 'Meera Patel', purpose: 'Food Supplies', amount: 12000, status: 'processing', priority: 'low' },
];

export default function BlockDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-primary text-primary-foreground">Processing</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return <Badge variant="destructive">Urgent</Badge>;
      case 'high':
        return <Badge className="bg-warning text-warning-foreground">High</Badge>;
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
      <div className="space-y-6">
        {/* Header */}
        <div className="govt-card-gradient p-6 rounded-lg govt-shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Block Officer Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Coordinate between supervisors and district officer - Raipur Block
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
              <Activity className="w-5 h-5 text-success" />
              <span className="text-sm font-semibold text-success">Block Active</span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Supervisors</p>
                  <p className="text-3xl font-bold text-primary">4</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Villages</p>
                  <p className="text-3xl font-bold text-primary">31</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SAM Children</p>
                  <p className="text-3xl font-bold text-primary">178</p>
                </div>
                <HeartHandshake className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                  <p className="text-3xl font-bold text-primary">2</p>
                </div>
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Supervisor Monitoring */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Supervisor Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {supervisorData.map((supervisor, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{supervisor.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {supervisor.id}</p>
                      </div>
                      <Badge variant={supervisor.accuracy >= 90 ? "default" : "secondary"}>
                        {supervisor.accuracy}% Accuracy
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Villages:</span>
                        <p className="font-semibold">{supervisor.villages}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">SAM Children:</span>
                        <p className="font-semibold">{supervisor.samChildren}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">NRC Referrals:</span>
                        <p className="font-semibold">{supervisor.nrcReferrals}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fund Requests */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Fund Requests
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {fundRequests.map((request, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold">{request.supervisor}</h4>
                      <div className="flex gap-2">
                        {getPriorityBadge(request.priority)}
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">{request.purpose}</span>
                      <span className="font-semibold">₹{request.amount.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resource Distribution & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Resource Distribution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Nutrition Kits Distributed</span>
                  <span className="font-semibold">245 / 300</span>
                </div>
                <Progress value={82} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Medical Supplies</span>
                  <span className="font-semibold">18 / 25</span>
                </div>
                <Progress value={72} className="h-2" />
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span>Emergency Medicines</span>
                  <span className="font-semibold">12 / 15</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Real-Time Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border-l-4 border-destructive bg-destructive/5 rounded">
                <p className="font-medium text-destructive">Critical Child Case</p>
                <p className="text-sm text-muted-foreground">Child ID: CH001 needs immediate NRC admission</p>
              </div>
              <div className="p-3 border-l-4 border-warning bg-warning/5 rounded">
                <p className="font-medium">Low Medical Kit Stock</p>
                <p className="text-sm text-muted-foreground">Village ANW001 running low on supplies</p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                <p className="font-medium text-primary">Supervisor Update Required</p>
                <p className="text-sm text-muted-foreground">Missing weekly report from Ramesh Kumar</p>
              </div>
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Assistant - Fund Planning
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="govt-shadow-lg">
          <CardHeader>
            <CardTitle>Block Management Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="govt" className="justify-start gap-3">
                <FileText className="w-4 h-4" />
                Generate Block Report
              </Button>
              <Button variant="accent" className="justify-start gap-3">
                <DollarSign className="w-4 h-4" />
                Approve Fund Requests
              </Button>
              <Button variant="outline" className="justify-start gap-3">
                <MessageSquare className="w-4 h-4" />
                AI Medical Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}