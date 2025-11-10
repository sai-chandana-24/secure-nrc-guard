import React, { useMemo, useState } from 'react';
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
  FileText,
  Loader2 // Added Loader2
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom'; // Added useNavigate
// Import modal and form components for AI Chat
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Static data - in a real app, this would likely come from an API
const initialChildValidationData = [
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

type AllocationRow = {
  _id: string;
  districtName: string;
  amount: number;
  purpose?: string;
  status: 'approved' | 'transferred' | 'utilized' | 'audited';
  createdAt: string;
  blockName?: string;
  schoolName?: string;
};

type ChatMessage = {
  sender: 'user' | 'ai';
  text: string;
};

export default function SupervisorDashboard() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const navigate = useNavigate(); // Initialize useNavigate

  // State for Child Validation Data (to allow local updates for demo)
  const [childData, setChildData] = useState(initialChildValidationData);

  // AI Chat State
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiChatType, setAiChatType] = useState<'nutrition' | 'health'>('nutrition'); // To differentiate chat context
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [aiInput, setAiInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);

  const openAiChat = (type: 'nutrition' | 'health') => {
    setAiChatType(type);
    setChatMessages([
        { 
            sender: 'ai', 
            text: type === 'nutrition' 
                ? 'Hello supervisor. I am your AI Nutrition Support assistant. Ask me about dietary plans, SAM management, or supplement guidelines.' 
                : 'Hello supervisor. I am your AI Health Guidelines assistant. Ask me about medical protocols, symptom checks, or referral criteria.'
        }
    ]);
    setIsAiModalOpen(true);
  };

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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allocations', 'supervisor-view'],
    queryFn: async () => {
      const res = await axiosInstance.get('/allocations');
      return res.data.allocations as AllocationRow[];
    }
  });

  const assignSchool = useMutation({
    mutationFn: async ({ id, schoolName }: { id: string; schoolName: string }) => {
      await axiosInstance.patch(`/allocations/${id}/assign-school`, { schoolName });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['allocations', 'supervisor-view'] });
      toast({ title: 'Assigned to school' });
    },
    onError: () => toast({ title: 'Failed to assign', variant: 'destructive' })
  });

  // --- NEW MUTATIONS ---

  // 1. Child Action Mutation (Verify/Reject/Refer)
  const childActionMutation = useMutation({
    mutationFn: async ({ id, action }: { id: string, action: 'verify' | 'reject' | 'refer' }) => {
        // Simulate API call
        console.log(`Performing ${action} on child ${id}`);
        return new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: (_, variables) => {
        let newStatus = '';
        let toastTitle = '';
        let toastVariant: "default" | "destructive" | "success" | null = "default"; // Explicit type for variant

        switch(variables.action) {
            case 'verify':
                newStatus = 'verified';
                toastTitle = 'Child Record Verified';
                toastVariant = 'success';
                break;
            case 'reject':
                newStatus = 'rejected';
                toastTitle = 'Child Record Rejected';
                toastVariant = 'destructive';
                break;
            case 'refer':
                 toastTitle = 'Child Referred to NRC';
                 toastVariant = 'default';
                 // Refer doesn't necessarily change 'status' in this simple model, but could in a real app
                 break;
        }

        if (newStatus) {
             setChildData(currentData => 
                currentData.map(child => 
                    child.id === variables.id ? { ...child, status: newStatus } : child
                )
            );
        }
        toast({ title: toastTitle, variant: toastVariant as any }); // Cast to any to avoid strict type issues if needed, or ensure types match exactly
    }
  });

  // 2. Generate Validation Report Mutation
  const generateReportMutation = useMutation({
    mutationFn: async () => {
      return new Promise(resolve => setTimeout(resolve, 2000));
    },
    onMutate: () => {
      toast({ title: 'Generating Report...', description: 'Compiling validation data.' });
    },
    onSuccess: () => {
      toast({ title: 'Report Ready', description: 'Validation report downloaded.', variant: 'default' });
    }
  });

  // 3. AI Chat Handler
  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;
    const userMessage: ChatMessage = { sender: 'user', text: aiInput };
    setChatMessages(prev => [...prev, userMessage]);
    setAiInput("");
    setIsAiResponding(true);
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        sender: 'ai',
        text: aiChatType === 'nutrition' 
            ? "For a child with MAM, increase protein intake by 20% using locally available lentils and ensure daily administration of micronutrient supplements as per protocol section 3.1."
            : "Standard protocol for persistent fever >3 days involves immediate referral to the nearest PHC for malaria and typhoid screening. Do not delay."
      };
      setChatMessages(prev => [...prev, aiResponse]);
      setIsAiResponding(false);
    }, 1500);
  };

  const rows = useMemo(() => data ?? [], [data]);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div id="top" className="govt-card-gradient p-6 rounded-lg govt-shadow-md border">
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
          <Card id="validation" className="govt-shadow-lg">
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

          <Card id="teachers" className="govt-shadow-lg">
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
          {/* Assign to School */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle>Allocations (Assign to School)</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoading && <div className="text-muted-foreground">Loading…</div>}
              {isError && <div className="text-red-600">Failed to load</div>}
              {!isLoading && !isError && (
                <div className="overflow-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>District</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Purpose</TableHead>
                        <TableHead>Block</TableHead>
                        <TableHead>School</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Action</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {rows.map((r) => (
                        <TableRow key={r._id}>
                          <TableCell>{r.districtName}</TableCell>
                          <TableCell>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(r.amount)}</TableCell>
                          <TableCell>{r.purpose || '-'}</TableCell>
                          <TableCell className="capitalize">{r.blockName || '-'}</TableCell>
                          <TableCell className="capitalize">{r.schoolName || '-'}</TableCell>
                          <TableCell>{new Date(r.createdAt).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" disabled={assignSchool.isPending} onClick={() => assignSchool.mutate({ id: r._id, schoolName: 'My School' })}>
                              {r.schoolName ? 'Assigned' : 'Assign to My School'}
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
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
                {/* Using childData state instead of static constant */}
                {childData.map((child, index) => (
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
                    {/* ACTION BUTTONS - Now Functional */}
                    <div className="mt-3 flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="border-success/50 text-success hover:bg-success/10 hover:text-success"
                        onClick={() => childActionMutation.mutate({ id: child.id, action: 'verify' })}
                        disabled={child.status === 'verified' || childActionMutation.isPending}
                      >
                        Verify
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => childActionMutation.mutate({ id: child.id, action: 'reject' })}
                        disabled={child.status === 'rejected' || childActionMutation.isPending}
                      >
                        Reject
                      </Button>
                      {child.condition === 'SAM' || child.condition === 'Critical' ? (
                        <Button 
                            size="sm" 
                            variant="govt"
                            onClick={() => childActionMutation.mutate({ id: child.id, action: 'refer' })}
                            disabled={childActionMutation.isPending}
                        >
                            Refer to NRC
                        </Button>
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
          <Card id="followups" className="govt-shadow-lg">
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

          <Card id="alerts" className="govt-shadow-lg">
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
              {/* AI Health Guidelines Button */}
              <Button variant="outline" className="w-full" onClick={() => openAiChat('health')}>
                <MessageSquare className="w-4 h-4 mr-2" />
                AI Health Guidelines
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card id="quick-actions" className="govt-shadow-lg">
          <CardHeader>
            <CardTitle>Supervisor Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* ACTION 1: Generate Validation Report */}
              <Button 
                variant="govt" 
                className="justify-start gap-3"
                onClick={() => generateReportMutation.mutate()}
                disabled={generateReportMutation.isPending}
              >
                {generateReportMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <FileText className="w-4 h-4" />}
                {generateReportMutation.isPending ? "Generating..." : "Generate Validation Report"}
              </Button>

              {/* ACTION 2: Process NRC Referrals (Navigate) */}
              <Button 
                variant="accent" 
                className="justify-start gap-3"
                onClick={() => navigate('/referrals')}
              >
                <HeartHandshake className="w-4 h-4" />
                Process NRC Referrals
              </Button>

              {/* ACTION 3: AI Nutrition Support (Open Modal) */}
              <Button 
                variant="outline" 
                className="justify-start gap-3"
                onClick={() => openAiChat('nutrition')}
              >
                <MessageSquare className="w-4 h-4" />
                AI Nutrition Support
              </Button>
            </div>

            {/* AI Chat Dialog */}
            <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>
                        {aiChatType === 'nutrition' ? 'AI Nutrition Support' : 'AI Health Guidelines'}
                    </DialogTitle>
                  </DialogHeader>
                  <ScrollArea className="h-[400px] p-4 border rounded-md bg-muted/50">
                    <div className="space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div key={index} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`p-3 rounded-lg max-w-[80%] ${msg.sender === 'user' ? 'bg-primary text-primary-foreground' : 'bg-background border'}`}>
                            <p className="text-sm">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                      {isAiResponding && (
                        <div className="flex justify-start">
                          <div className="p-3 rounded-lg bg-background border">
                            <Loader2 className="w-5 h-5 text-primary animate-spin" />
                          </div>
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                  <DialogFooter className="flex-col sm:flex-row gap-2">
                    <Input 
                      placeholder="Type your question..."
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !isAiResponding && handleSendAiMessage()}
                      disabled={isAiResponding}
                    />
                    <Button onClick={handleSendAiMessage} disabled={isAiResponding}>Send</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}