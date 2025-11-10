import React, { useState, useEffect } from 'react'; // Import useState and useEffect
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
  HeartHandshake,
  UserPlus, // New icon for assignment
} from 'lucide-react';
import axiosInstance from '@/utils/axiosInstance'; // Assuming this utility is available
import { useToast } from '@/components/ui/use-toast'; // Assuming this hook is available
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog'; // For the assignment modal
import { Input } from '@/components/ui/input'; // For doctor name input
import { Label } from '@/components/ui/label';

// Define the type for Child data based on your childModel.js
interface ChildAdmission {
  _id: string; // The ID of the child for API calls
  name: string; // Used for childName
  teacherId: string; // Used for referral teacher (will need a lookup, but we'll show ID for now)
  createdAt: string; // Used for admissionDate (timestamps: true)
  weight: number; // Used for initialWeight
  status: 'Normal' | 'MAM' | 'SAM'; // Used for condition/status
  assignedDoctor: string | null; // Key field to check assignment status
  // Add other relevant fields if needed: age, muac, referred, etc.
}


// --- START: Remove Hardcoded Data ---
// const admissionData = [ ... ]; // REMOVE
const treatmentPlans = [
  { childId: 'NRC001', diet: 'F-75 Formula (Phase 1)', medicines: 'Amoxicillin, Multi-Vitamin', interventions: 'Intensive Monitoring, Hydration Support', duration: '14 days' },
  { childId: 'NRC002', diet: 'F-100 Formula (Phase 2)', medicines: 'Zinc Sulphate, Iron Supplement', interventions: 'Medical Monitoring, Daily Weight Check', duration: '21 days' },
  { childId: 'NRC003', diet: 'RUTF (Ready-to-Use Therapeutic Food)', medicines: 'Albendazole (Deworming)', interventions: 'Nutrition Counseling, Play Therapy', duration: '10 days' },
  { childId: 'NRC004', diet: 'Standard Diet (Transition)', medicines: 'None', interventions: 'Discharge Preparation, Mother Education', duration: '7 days' },
  { childId: 'NRC005', diet: 'F-75 Formula (Phase 1)', medicines: 'Ceftriaxone, Anti-Fungal', interventions: 'Stabilization, Temperature Monitoring', duration: '5 days' },
];

const progressData = [
  { childId: 'NRC001', currentWeight: 9.2, targetWeight: 12.5, recovery: 45, days: 8 },
  { childId: 'NRC002', currentWeight: 8.8, targetWeight: 11.8, recovery: 62, days: 12 },
  { childId: 'NRC003', currentWeight: 10.1, targetWeight: 13.2, recovery: 78, days: 6 },
  { childId: 'NRC004', currentWeight: 11.5, targetWeight: 12.0, recovery: 95, days: 20 },
  { childId: 'NRC005', currentWeight: 7.5, targetWeight: 10.5, recovery: 15, days: 3 },
];

const resourceRequests = [
  { item: 'F-75 Formula', quantity: '50 packets', status: 'pending', priority: 'high' },
  { item: 'Therapeutic Milk', quantity: '25 units', status: 'approved', priority: 'medium' },
  { item: 'Zinc Supplements', quantity: '100 tablets', status: 'delivered', priority: 'low' },
  { item: 'Additional Staff', quantity: '2 nurses', status: 'processing', priority: 'urgent' },
];
// --- END: Remove Hardcoded Data ---

export default function NRCDashboard() {
  const [children, setChildren] = useState<ChildAdmission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [doctorName, setDoctorName] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedChild, setSelectedChild] = useState<ChildAdmission | null>(null);
  const { toast } = useToast();

  const fetchChildren = async () => {
    try {
      setIsLoading(true);
      // Fetches all REFERRED children for NRC-level roles
      // If the backend is fully implemented, the response is an array of Child objects.
      const response = await axiosInstance.get('/children');
      setChildren(response.data);
    } catch (error) {
      console.error('Error fetching children:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch referred children.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchChildren();
  }, []);

  const handleAssignDoctor = async (childId: string) => {
    if (!doctorName) {
      toast({
        title: 'Validation Error',
        description: 'Please enter a doctor name.',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await axiosInstance.patch(`/children/${childId}/assign-doctor`, {
        doctorName,
      });

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: `Doctor ${doctorName} assigned to ${selectedChild?.name}.`,
        });
        setIsDialogOpen(false);
        setDoctorName('');
        setSelectedChild(null);
        fetchChildren(); // Refresh the list
      }
    } catch (error) {
      console.error('Error assigning doctor:', error);
      toast({
        title: 'Error',
        description: 'Failed to assign doctor.',
        variant: 'destructive',
      });
    }
  };


  // Helper to safely format the date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getConditionBadge = (condition: string) => {
    switch (condition) {
      case 'SAM':
        return <Badge variant="destructive">Severe Acute Malnutrition (SAM)</Badge>;
      case 'MAM':
        return <Badge className="bg-warning text-warning-foreground">Moderate Acute Malnutrition (MAM)</Badge>;
      case 'Normal':
        return <Badge variant="secondary">Normal</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
// ... rest of the badge functions (getStatusBadge, getPriorityBadge) remain the same ...
// [Keep existing getStatusBadge and getPriorityBadge functions here]
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
  // ... end of badge functions


  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div id="top" className="govt-card-gradient p-6 rounded-lg govt-shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                NRC (Nutrition Rehabilitation Centre) Medical Officer
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

        {/* Key Stats (Keep static for now or calculate from 'children' array) */}
        <div id="stats" className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card id="admissions" className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Referred</p>
                  {/* Calculate total count from fetched data */}
                  <p className="text-3xl font-bold text-primary">{isLoading ? '...' : children.length}</p>
                </div>
                <Users className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card id="treatment" className="govt-shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Unassigned Cases</p>
                  {/* Calculate unassigned cases */}
                  <p className="text-3xl font-bold text-primary">
                    {isLoading ? '...' : children.filter(c => !c.assignedDoctor).length}
                  </p>
                </div>
                <Activity className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
          
          {/* ... other static cards remain the same for now ... */}
          <Card id="progress" className="govt-shadow-lg">
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
          {/* Recent Admissions / Referred Children LIST (UPDATED) */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                Referred Children (NRC Cases)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center p-4">Loading children data...</div>
              ) : children.length === 0 ? (
                <div className="text-center p-4 text-muted-foreground">No referred children found.</div>
              ) : (
                <div className="space-y-4">
                  {children.map((child) => (
                    <div key={child._id} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg">{child.name}</h4>
                          <p className="text-sm text-muted-foreground">ID: {child._id.slice(-6)}</p>
                        </div>
                        {getConditionBadge(child.status)}
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
                        <div>
                          <span className="text-muted-foreground">Referral Date:</span>
                          <p className="font-semibold">{formatDate(child.createdAt)}</p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Initial Weight:</span>
                          <p className="font-semibold">{child.weight} kg</p>
                        </div>
                        <div>
                            <span className="text-muted-foreground">Assigned Doctor:</span>
                            <p className="font-semibold text-wrap">
                                {child.assignedDoctor || 'Unassigned'}
                            </p>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Referral Teacher ID:</span>
                          <p className="font-semibold">{child.teacherId.slice(-6)}</p>
                        </div>
                      </div>
                      
                      {/* Doctor Assignment Button/Status */}
                      <div className="mt-2 pt-2 border-t flex justify-end">
                        {child.assignedDoctor ? (
                          <Button variant="secondary" disabled>
                            <UserPlus className="w-4 h-4 mr-2" />
                            Assigned to: {child.assignedDoctor}
                          </Button>
                        ) : (
                            <Dialog open={isDialogOpen && selectedChild?._id === child._id} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button 
                                        variant="govt"
                                        onClick={() => {
                                            setSelectedChild(child);
                                            setIsDialogOpen(true);
                                            setDoctorName(''); // Clear previous doctor name
                                        }}
                                    >
                                        <UserPlus className="w-4 h-4 mr-2" />
                                        Assign Doctor
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Assign Doctor to {selectedChild?.name}</DialogTitle>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor="doctorName" className="text-right">
                                                Doctor Name
                                            </Label>
                                            <Input
                                                id="doctorName"
                                                value={doctorName}
                                                onChange={(e) => setDoctorName(e.target.value)}
                                                className="col-span-3"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button 
                                            variant="govt" 
                                            onClick={() => selectedChild && handleAssignDoctor(selectedChild._id)}
                                            disabled={!doctorName}
                                        >
                                            Confirm Assignment
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Treatment Plans (Keep hardcoded for now) */}
          <Card className="govt-shadow-lg">
            {/* ... Treatment Plans Card Content (remains the same) ... */}
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

        {/* Progress Tracking (Keep hardcoded for now) */}
        <Card className="govt-shadow-lg">
          {/* ... Progress Tracking Card Content (remains the same) ... */}
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

        {/* Resource Requests & Quick Actions (Keep hardcoded for now) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card id="resources" className="govt-shadow-lg">
            {/* ... Resource Requests Card Content (remains the same) ... */}
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
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Quantity: {request.quantity}</p>
                </div>
              ))}
              <Button 
                variant="govt" 
                className="w-full"
                // ENABLED: Logs to console
                onClick={() => console.log('Action: Submit New Resource Request')}
              >
                <Package className="w-4 h-4 mr-2" />
                Submit New Request
              </Button>
            </CardContent>
          </Card>

          <Card id="alerts" className="govt-shadow-lg">
            {/* ... NRC Management Actions Card Content (remains the same) ... */}
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-primary" />
                NRC Management Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="govt" 
                className="w-full justify-start gap-3"
                // ENABLED: Logs to console
                onClick={() => console.log('Action: Generate Discharge Reports')}
              >
                <FileText className="w-4 h-4" />
                Generate Discharge Reports
              </Button>
              <Button 
                variant="accent" 
                className="w-full justify-start gap-3"
                // ENABLED: Logs to console
                onClick={() => console.log('Action: Update Treatment Plans')}
              >
                <Heart className="w-4 h-4" />
                Update Treatment Plans
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                // ENABLED: Logs to console
                onClick={() => console.log('Action: Manage Admissions')}
              >
                <Users className="w-4 h-4" />
                Manage Admissions
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start gap-3"
                // ENABLED: Logs to console
                onClick={() => console.log('Action: View AI Medical Protocols')}
              >
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