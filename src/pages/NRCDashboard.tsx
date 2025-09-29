import React from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Users, 
  Heart,
  TrendingUp,
  Package,
  Calendar,
  Activity,
  FileText,
  MessageSquare,
  HeartHandshake
} from 'lucide-react';

const admissionData = [
  { id: 'NRC001', childName: 'Aarav Kumar', referralTeacher: 'Sunita Devi', admissionDate: '2024-01-15', initialWeight: 8.5, condition: 'Severe' },
  { id: 'NRC002', childName: 'Priya Singh', referralTeacher: 'Kamala Bai', admissionDate: '2024-01-12', initialWeight: 7.8, condition: 'Critical' },
  { id: 'NRC003', childName: 'Rohan Gupta', referralTeacher: 'Rekha Verma', admissionDate: '2024-01-18', initialWeight: 9.2, condition: 'Moderate' },
];

const treatmentPlans = [
  { childId: 'NRC001', diet: 'F-75 Formula', medicines: 'Amoxicillin, Iron', interventions: 'Intensive care', duration: '14 days' },
  { childId: 'NRC002', diet: 'F-100 Formula', medicines: 'Vitamin A, Zinc', interventions: 'Medical monitoring', duration: '21 days' },
  { childId: 'NRC003', diet: 'Therapeutic Food', medicines: 'Multivitamin', interventions: 'Nutrition counseling', duration: '10 days' },
];

const progressData = [
  { childId: 'NRC001', currentWeight: 9.2, targetWeight: 12.5, recovery: 45, days: 8 },
  { childId: 'NRC002', currentWeight: 8.8, targetWeight: 11.8, recovery: 62, days: 12 },
  { childId: 'NRC003', currentWeight: 10.1, targetWeight: 13.2, recovery: 78, days: 6 },
];

const resourceRequests = [
  { item: 'F-75 Formula', quantity: '50 packets', status: 'pending', priority: 'high' },
  { item: 'Therapeutic Milk', quantity: '25 units', status: 'approved', priority: 'medium' },
  { item: 'Zinc Supplements', quantity: '100 tablets', status: 'delivered', priority: 'low' },
  { item: 'Additional Staff', quantity: '2 nurses', status: 'processing', priority: 'urgent' },
];

export default function NRCDashboard() {
  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'Critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'Severe':
        return <Badge className="bg-warning text-warning-foreground">Severe</Badge>;
      case 'Moderate':
        return <Badge variant="secondary">Moderate</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-success text-success-foreground">Delivered</Badge>;
      case 'approved':
        return <Badge className="bg-primary text-primary-foreground">Approved</Badge>;
      case 'processing':
        return <Badge className="bg-warning text-warning-foreground">Processing</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
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
                NRC (Nutrition Rehabilitation Centre) Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Treatment and monitoring of admitted SAM children - NRC Raipur
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
              <HeartHandshake className="w-5 h-5 text-success" />
              <span className="text-sm font-semibold text-success">NRC Operational</span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Admissions</p>
                  <p className="text-3xl font-bold text-primary">23</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Cases</p>
                  <p className="text-3xl font-bold text-primary">15</p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Recovery Rate</p>
                  <p className="text-3xl font-bold text-primary">87%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Bed Capacity</p>
                  <p className="text-3xl font-bold text-primary">15/20</p>
                </div>
                <Heart className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Recent Admissions */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Recent Admissions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {admissionData.map((admission, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{admission.childName}</h4>
                        <p className="text-sm text-muted-foreground">ID: {admission.id}</p>
                      </div>
                      {getConditionBadge(admission.condition)}
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Referred by:</span>
                        <p className="font-semibold">{admission.referralTeacher}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Admission:</span>
                        <p className="font-semibold">{admission.admissionDate}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Initial Weight:</span>
                        <p className="font-semibold">{admission.initialWeight} kg</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Days in NRC:</span>
                        <p className="font-semibold">8 days</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treatment Plans */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-primary" />
                Active Treatment Plans
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {treatmentPlans.map((plan, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">Patient {plan.childId}</h4>
                      <Badge variant="outline">{plan.duration}</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Diet Plan:</span>
                        <p className="font-semibold">{plan.diet}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Medicines:</span>
                        <p className="font-semibold">{plan.medicines}</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Interventions:</span>
                        <p className="font-semibold">{plan.interventions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Tracking */}
        <Card className="govt-shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recovery Progress Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {progressData.map((progress, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold">Patient {progress.childId}</h4>
                    <Badge className="bg-success text-success-foreground">{progress.recovery}% Recovery</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current Weight: {progress.currentWeight} kg</span>
                      <span>Target: {progress.targetWeight} kg</span>
                    </div>
                    <Progress value={progress.recovery} className="h-3" />
                    <div className="text-xs text-muted-foreground text-center">
                      Day {progress.days} of treatment
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resource Requests & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Resource Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {resourceRequests.map((request, index) => (
                <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                  <div className="flex items-center justify-between mb-2">
                    <h5 className="font-medium">{request.item}</h5>
                    <div className="flex gap-2">
                      {getPriorityBadge(request.priority)}
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Quantity: {request.quantity}</p>
                </div>
              ))}
              <Button variant="govt" className="w-full">
                <Package className="w-4 h-4 mr-2" />
                Submit New Request
              </Button>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                NRC Management Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="govt" className="w-full justify-start gap-3">
                <FileText className="w-4 h-4" />
                Generate Discharge Reports
              </Button>
              <Button variant="accent" className="w-full justify-start gap-3">
                <Heart className="w-4 h-4" />
                Update Treatment Plans
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <Users className="w-4 h-4" />
                Manage Admissions
              </Button>
              <Button variant="outline" className="w-full justify-start gap-3">
                <MessageSquare className="w-4 h-4" />
                AI Medical Protocols
              </Button>
              <div className="p-3 border-l-4 border-success bg-success/5 rounded">
                <p className="font-medium text-success">Follow-up Ready</p>
                <p className="text-sm text-muted-foreground">3 children ready for discharge and follow-up</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}