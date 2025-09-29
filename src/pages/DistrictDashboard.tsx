import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  MapPin, 
  Users, 
  DollarSign, 
  AlertTriangle,
  TrendingUp,
  Building2,
  HeartHandshake,
  FileBarChart
} from 'lucide-react';

const blockPerformanceData = [
  { name: 'Raipur Block', totalSAM: 125, nrcReferrals: 45, recoveryRate: 78, status: 'good' },
  { name: 'Bilaspur Block', totalSAM: 98, nrcReferrals: 32, recoveryRate: 82, status: 'excellent' },
  { name: 'Durg Block', totalSAM: 156, nrcReferrals: 67, recoveryRate: 65, status: 'needs-attention' },
  { name: 'Korba Block', totalSAM: 89, nrcReferrals: 28, recoveryRate: 75, status: 'good' },
];

const fundUtilizationData = [
  { block: 'Raipur Block', allocated: 2500000, used: 2180000, percentage: 87 },
  { block: 'Bilaspur Block', allocated: 1800000, used: 1650000, percentage: 92 },
  { block: 'Durg Block', allocated: 3200000, used: 2240000, percentage: 70 },
  { block: 'Korba Block', allocated: 1500000, used: 1350000, percentage: 90 },
];

export default function DistrictDashboard() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'excellent':
        return <Badge className="bg-success text-success-foreground">Excellent</Badge>;
      case 'good':
        return <Badge variant="secondary">Good</Badge>;
      case 'needs-attention':
        return <Badge variant="destructive">Needs Attention</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
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
                District Officer Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Oversee all blocks in Raipur District - NRC Management System
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
              <MapPin className="w-5 h-5 text-success" />
              <span className="text-sm font-semibold text-success">Raipur District</span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Blocks</p>
                  <p className="text-3xl font-bold text-primary">4</p>
                </div>
                <Building2 className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total SAM Children</p>
                  <p className="text-3xl font-bold text-primary">468</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">NRC Referrals</p>
                  <p className="text-3xl font-bold text-primary">172</p>
                </div>
                <HeartHandshake className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Recovery Rate</p>
                  <p className="text-3xl font-bold text-primary">75%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Block Performance Table */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileBarChart className="w-5 h-5 text-primary" />
                Block Performance Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blockPerformanceData.map((block, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{block.name}</h4>
                      {getStatusBadge(block.status)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">SAM Children:</span>
                        <p className="font-semibold">{block.totalSAM}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">NRC Referrals:</span>
                        <p className="font-semibold">{block.nrcReferrals}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Recovery Rate:</span>
                        <p className="font-semibold">{block.recoveryRate}%</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Fund Utilization */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Fund Utilization by Block
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {fundUtilizationData.map((fund, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{fund.block}</span>
                      <span className="text-sm text-muted-foreground">
                        ₹{(fund.used / 100000).toFixed(1)}L / ₹{(fund.allocated / 100000).toFixed(1)}L
                      </span>
                    </div>
                    <Progress value={fund.percentage} className="h-2" />
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>{fund.percentage}% utilized</span>
                      <span>₹{((fund.allocated - fund.used) / 100000).toFixed(1)}L remaining</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Priority Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border-l-4 border-destructive bg-destructive/5 rounded">
                <p className="font-medium text-destructive">Low Fund Utilization</p>
                <p className="text-sm text-muted-foreground">Durg Block only utilized 70% of allocated funds</p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                <p className="font-medium text-primary">Pending Fund Request</p>
                <p className="text-sm text-muted-foreground">Korba Block requested additional ₹5L for NRC upgrades</p>
              </div>
              <div className="p-3 border-l-4 border-warning bg-warning/5 rounded">
                <p className="font-medium">NRC Capacity Alert</p>
                <p className="text-sm text-muted-foreground">Raipur NRC approaching maximum capacity</p>
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="govt" className="w-full justify-start gap-3">
                <FileBarChart className="w-4 h-4" />
                Generate District Report
              </Button>
              <Button variant="accent" className="w-full justify-start gap-3">
                <DollarSign className="w-4 h-4" />
                Review Fund Requests
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Users className="w-4 h-4" />
                Monitor NRC Admissions
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}