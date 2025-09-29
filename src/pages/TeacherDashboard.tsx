import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Users, 
  Plus,
  Package,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Activity,
  UserPlus,
  Send
} from 'lucide-react';

const childrenData = [
  { id: 'CH001', name: 'Aarav Kumar', age: 3, weight: 8.5, height: 85, muac: 10.5, status: 'SAM', lastEntry: '2024-01-19' },
  { id: 'CH002', name: 'Priya Singh', age: 4, weight: 11.2, height: 92, muac: 12.8, status: 'MAM', lastEntry: '2024-01-19' },
  { id: 'CH003', name: 'Ravi Patel', age: 2, weight: 7.8, height: 78, muac: 9.8, status: 'SAM', lastEntry: '2024-01-18' },
  { id: 'CH004', name: 'Meera Sharma', age: 5, weight: 13.1, height: 98, muac: 14.2, status: 'Normal', lastEntry: '2024-01-19' },
];

const progressData = [
  { id: 'CH001', name: 'Aarav Kumar', weeklyChange: -0.2, status: 'SAM', trend: 'declining' },
  { id: 'CH002', name: 'Priya Singh', weeklyChange: +0.3, status: 'MAM', trend: 'improving' },
  { id: 'CH003', name: 'Ravi Patel', weeklyChange: +0.1, status: 'SAM', trend: 'stable' },
  { id: 'CH004', name: 'Meera Sharma', weeklyChange: +0.4, status: 'Normal', trend: 'improving' },
];

export default function TeacherDashboard() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChild, setNewChild] = useState({
    name: '',
    age: '',
    weight: '',
    height: '',
    muac: ''
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Normal':
        return <Badge className="bg-success text-success-foreground">Normal</Badge>;
      case 'MAM':
        return <Badge className="bg-warning text-warning-foreground">MAM</Badge>;
      case 'SAM':
        return <Badge variant="destructive">SAM</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'declining':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      case 'stable':
        return <Activity className="w-4 h-4 text-warning" />;
      default:
        return null;
    }
  };

  const handleAddChild = () => {
    // Add child logic here
    setShowAddForm(false);
    setNewChild({ name: '', age: '', weight: '', height: '', muac: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="govt-card-gradient p-6 rounded-lg govt-shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Anganwadi Teacher Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                First point of data collection and reporting - AWC Raipur-001
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
              <UserPlus className="w-5 h-5 text-success" />
              <span className="text-sm font-semibold text-success">Teacher Active</span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Children</p>
                  <p className="text-3xl font-bold text-primary">25</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SAM Cases</p>
                  <p className="text-3xl font-bold text-primary">8</p>
                </div>
                <TrendingDown className="w-8 h-8 text-destructive" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">MAM Cases</p>
                  <p className="text-3xl font-bold text-primary">5</p>
                </div>
                <Activity className="w-8 h-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Nutrition Kits</p>
                  <p className="text-3xl font-bold text-primary">45</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Child Health Entry Form */}
        <Card className="govt-shadow-lg">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" />
                Child Health Entry
              </CardTitle>
              <Button 
                onClick={() => setShowAddForm(!showAddForm)}
                variant="govt"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add New Child
              </Button>
            </div>
          </CardHeader>
          {showAddForm && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-muted/20">
                <div className="space-y-2">
                  <Label htmlFor="name">Child Name</Label>
                  <Input 
                    id="name"
                    value={newChild.name}
                    onChange={(e) => setNewChild({...newChild, name: e.target.value})}
                    placeholder="Enter child's name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age (years)</Label>
                  <Input 
                    id="age"
                    type="number"
                    value={newChild.age}
                    onChange={(e) => setNewChild({...newChild, age: e.target.value})}
                    placeholder="Age"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight"
                    type="number"
                    step="0.1"
                    value={newChild.weight}
                    onChange={(e) => setNewChild({...newChild, weight: e.target.value})}
                    placeholder="Weight"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height"
                    type="number"
                    value={newChild.height}
                    onChange={(e) => setNewChild({...newChild, height: e.target.value})}
                    placeholder="Height"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="muac">MUAC (cm)</Label>
                  <Input 
                    id="muac"
                    type="number"
                    step="0.1"
                    value={newChild.muac}
                    onChange={(e) => setNewChild({...newChild, muac: e.target.value})}
                    placeholder="MUAC"
                  />
                </div>
                <div className="flex items-end gap-2">
                  <Button onClick={handleAddChild} variant="govt" className="flex-1">
                    Add Child
                  </Button>
                  <Button onClick={() => setShowAddForm(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Children List */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Registered Children
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {childrenData.map((child, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold">{child.name}</h4>
                        <p className="text-sm text-muted-foreground">ID: {child.id} | Age: {child.age}y</p>
                      </div>
                      {getStatusBadge(child.status)}
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Weight:</span>
                        <p className="font-semibold">{child.weight} kg</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Height:</span>
                        <p className="font-semibold">{child.height} cm</p>
                      </div>
                      <div>
                        <span className="text-muted-foreground">MUAC:</span>
                        <p className="font-semibold">{child.muac} cm</p>
                      </div>
                    </div>
                    <div className="mt-3 text-xs text-muted-foreground">
                      Last updated: {child.lastEntry}
                    </div>
                    {child.status === 'SAM' && (
                      <Button size="sm" variant="destructive" className="mt-2">
                        <Send className="w-3 h-3 mr-1" />
                        Request NRC Referral
                      </Button>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Progress Monitoring */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="w-5 h-5 text-primary" />
                Weekly Progress Monitoring
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {progressData.map((child, index) => (
                  <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{child.name}</h4>
                        {getTrendIcon(child.trend)}
                      </div>
                      {getStatusBadge(child.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Weekly weight change:</span>
                      <span className={`font-semibold ${child.weeklyChange > 0 ? 'text-success' : child.weeklyChange < 0 ? 'text-destructive' : 'text-warning'}`}>
                        {child.weeklyChange > 0 ? '+' : ''}{child.weeklyChange} kg
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resource Tracker & Communication */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-primary" />
                Nutrition Kit Tracker
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Total Kits Received</span>
                <span className="font-semibold">50</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Kits Distributed</span>
                <span className="font-semibold">45</span>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <span>Remaining Stock</span>
                <span className="font-semibold text-primary">5</span>
              </div>
              <Button variant="outline" className="w-full">
                Request Additional Kits
              </Button>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Parent Communication
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                <p className="font-medium text-primary">SMS Reminders Sent</p>
                <p className="text-sm text-muted-foreground">Follow-up visit reminders sent to 8 parents</p>
              </div>
              <div className="p-3 border-l-4 border-success bg-success/5 rounded">
                <p className="font-medium text-success">Diet Plans Shared</p>
                <p className="text-sm text-muted-foreground">Nutrition guidelines sent to all families</p>
              </div>
              <Button variant="accent" className="w-full gap-2">
                <MessageSquare className="w-4 h-4" />
                Send Weekly Updates
              </Button>
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="w-4 h-4" />
                AI Nutrition Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}