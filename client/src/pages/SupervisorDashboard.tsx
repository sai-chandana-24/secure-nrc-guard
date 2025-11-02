import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  CheckCircle,
  XCircle,
  AlertTriangle,
  HeartHandshake,
  Activity,
  UserCheck,
  MessageSquare,
  FileText
} from 'lucide-react';

const childValidationData = [
  { id: 'CH001', name: 'Aarav Kumar', age: 3, weight: 8.5, muac: 10.5, height: 85, status: 'verified', condition: 'SAM' },
  { id: 'CH002', name: 'Priya Singh', age: 4, weight: 11.2, muac: 12.8, height: 92, status: 'pending', condition: 'MAM' },
  { id: 'CH003', name: 'Ravi Patel', age: 2, weight: 7.8, muac: 9.8, height: 78, status: 'rejected', condition: 'Critical' },
  { id: 'CH004', name: 'Meera Sharma', age: 5, weight: 13.1, muac: 14.2, height: 98, status: 'verified', condition: 'Normal' },
];

const teacherPerformanceData = [
  { name: 'Sunita Devi', id: 'TCH001', children: 25, accuracy: 94, lastUpdate: '2 hours ago', status: 'active' },
  { name: 'Kamala Bai', id: 'TCH002', children: 18, accuracy: 88, lastUpdate: '1 day ago', status: 'delayed' },
  { name: 'Rekha Verma', id: 'TCH003', children: 32, accuracy: 96, lastUpdate: '30 min ago', status: 'active' },
  { name: 'Pushpa Joshi', id: 'TCH004', children: 22, accuracy: 85, lastUpdate: '3 days ago', status: 'missing' },
];

const followUpData = [
  { childId: 'CH105', name: 'Rohan Gupta', dischargeDate: '2024-01-15', status: 'improving', nextVisit: '2024-01-22' },
  { childId: 'CH098', name: 'Anita Yadav', dischargeDate: '2024-01-10', status: 'stable', nextVisit: '2024-01-20' },
  { childId: 'CH112', name: 'Vikash Singh', dischargeDate: '2024-01-18', status: 'concerns', nextVisit: '2024-01-25' },
];

export default function SupervisorDashboard() {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified':
        return <CheckCircle className="w-4 h-4 text-success" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-destructive" />;
      case 'pending':
        return <AlertTriangle className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const getTeacherStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-success text-success-foreground">Active</Badge>;
      case 'delayed':
        return <Badge className="bg-warning text-warning-foreground">Delayed</Badge>;
      case 'missing':
        return <Badge variant="destructive">Missing Updates</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'Normal':
        return <Badge className="bg-success text-success-foreground">Normal</Badge>;
      case 'MAM':
        return <Badge className="bg-warning text-warning-foreground">MAM</Badge>;
      case 'SAM':
        return <Badge variant="destructive">SAM</Badge>;
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
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
                Supervisor Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Validate teacher data and report to Block Officer
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
              <UserCheck className="w-5 h-5 text-success" />
              <span className="text-sm font-semibold text-success">Supervisor Active</span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Children Monitored</p>
                  <p className="text-3xl font-bold text-primary">97</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Verified Cases</p>
                  <p className="text-3xl font-bold text-primary">89</p>
                </div>
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">NRC Referrals</p>
                  <p className="text-3xl font-bold text-primary">12</p>
                </div>
                <HeartHandshake className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Follow-ups Due</p>
                  <p className="text-3xl font-bold text-primary">3</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Child Validation Table */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Child Health Validation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childValidationData.map((child, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-semibold">{child.name}</h4>
                          {getStatusIcon(child.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">ID: {child.id} | Age: {child.age}y</p>
                      </div>
                      {getConditionBadge(child.condition)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Weight:</span>
                        <p className="font-semibold">{child.weight} kg</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">MUAC:</span>
                        <p className="font-semibold">{child.muac} cm</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Height:</span>
                        <p className="font-semibold">{child.height} cm</p>
                      </div>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm" variant="outline">Verify</Button>
                      <Button size="sm" variant="destructive">Reject</Button>
                      {child.condition === 'SAM' || child.condition === 'Critical' ? (
                        <Button size="sm" variant="govt">Refer to NRC</Button>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Teacher Performance */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserCheck className="w-5 h-5 text-primary" />
                Teacher Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {teacherPerformanceData.map((teacher, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{teacher.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {teacher.id}</p>
                      </div>
                      {getTeacherStatusBadge(teacher.status)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Children:</span>
                        <p className="font-semibold">{teacher.children}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Accuracy:</span>
                        <p className="font-semibold">{teacher.accuracy}%</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Last Update:</span>
                        <p className="font-semibold">{teacher.lastUpdate}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Follow-up Tracker & Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                NRC Discharge Follow-ups
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {followUpData.map((followUp, index) => (
                <div key={index} className="p-3 border rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{followUp.name}</h5>
                    <Badge variant={followUp.status === 'concerns' ? 'destructive' : 'secondary'}>
                      {followUp.status}
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    <p>Child ID: {followUp.childId}</p>
                    <p>Discharged: {followUp.dischargeDate}</p>
                    <p>Next Visit: {followUp.nextVisit}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-primary" />
                Priority Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border-l-4 border-destructive bg-destructive/5 rounded">
                <p className="font-medium text-destructive">Critical Case Alert</p>
                <p className="text-sm text-muted-foreground">Child CH003 requires immediate attention</p>
              </div>
              <div className="p-3 border-l-4 border-warning bg-warning/5 rounded">
                <p className="font-medium">Missing Teacher Updates</p>
                <p className="text-sm text-muted-foreground">Pushpa Joshi hasn't submitted data for 3 days</p>
              </div>
              <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                <p className="font-medium text-primary">Follow-up Due</p>
                <p className="text-sm text-muted-foreground">3 children need post-NRC check-ups</p>
              </div>
              <Button variant="outline" className="w-full">
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Health Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="govt-shadow-lg">
          <CardHeader>
            <CardTitle>Supervisor Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="govt" className="justify-start gap-3">
                <FileText className="w-4 h-4" />
                Generate Validation Report
              </Button>
              <Button variant="accent" className="justify-start gap-3">
                <HeartHandshake className="w-4 h-4" />
                Process NRC Referrals
              </Button>
              <Button variant="outline" className="justify-start gap-3">
                <MessageSquare className="w-4 h-4" />
                AI Nutrition Support
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}