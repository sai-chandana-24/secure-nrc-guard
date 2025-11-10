import React, { useMemo, useState } from 'react';
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
  Activity,
  Loader2, // Added for loading states
  Check,    // Added for approval
  X         // Added for rejection
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

// Import modal and form components
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

// Static data for supervisors
const supervisorData = [
  { id: 'SUP001', name: 'Ramesh Kumar', villages: 8, samChildren: 45, nrcReferrals: 12, accuracy: 92 },
  { id: 'SUP002', name: 'Sunita Verma', villages: 6, samChildren: 38, nrcReferrals: 15, accuracy: 88 },
  { id: 'SUP003', name: 'Prakash Singh', villages: 10, samChildren: 62, nrcReferrals: 18, accuracy: 95 },
  { id: 'SUP004', name: 'Meera Patel', villages: 7, samChildren: 33, nrcReferrals: 9, accuracy: 90 },
];

// Initial state for fund requests modal
const initialFundRequests = [
  { id: 'FR001', supervisor: 'Ramesh Kumar', purpose: 'Medical Kits', amount: 25000, status: 'pending', priority: 'high' },
  { id: 'FR002', supervisor: 'Sunita Verma', purpose: 'Nutrition Supplements', amount: 18000, status: 'approved', priority: 'medium' },
  { id: 'FR003', supervisor: 'Prakash Singh', purpose: 'NRC Admission', amount: 35000, status: 'pending', priority: 'urgent' },
  { id: 'FR004', supervisor: 'Meera Patel', purpose: 'Food Supplies', amount: 12000, status: 'processing', priority: 'low' },
];

type AllocationRow = {
  _id: string;
  districtName: string;
  amount: number;
  purpose?: string;
  status: 'approved' | 'transferred' | 'utilized' | 'audited';
  createdAt: string;
  blockName?: string;
};

type ChatMessage = {
  sender: 'user' | 'ai';
  text: string;
};

export default function BlockDashboard() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { toast } = useToast();

  // State for Modals
  const [isApprovalModalOpen, setIsApprovalModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  
  // State for Approval Modal
  const [modalFundRequests, setModalFundRequests] = useState(initialFundRequests);

  // State for AI Chat Modal
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: 'ai', text: 'Welcome to the AI Medical Assistant. How can I help you today? You can ask about patient symptoms or supply chain issues.' }
  ]);
  const [aiInput, setAiInput] = useState("");
  const [isAiResponding, setIsAiResponding] = useState(false);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'approved':
        return <Badge className="bg-success text-success-foreground">Approved</Badge>;
      case 'pending':
        return <Badge variant="secondary">Pending</Badge>;
      case 'processing':
        return <Badge className="bg-primary text-primary-foreground">Processing</Badge>;
      case 'rejected':
        return <Badge variant="destructive">Rejected</Badge>;
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

  const { data, isLoading, isError } = useQuery({
    queryKey: ['allocations', 'block-view'],
    queryFn: async () => {
      const res = await axiosInstance.get('/allocations');
      return res.data.allocations as AllocationRow[];
    }
  });

  const assignBlock = useMutation({
    mutationFn: async ({ id, blockName }: { id: string; blockName: string }) => {
      await axiosInstance.patch(`/allocations/${id}/assign-block`, { blockName });
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['allocations', 'block-view'] });
      toast({ title: 'Assigned to block' });
    },
    onError: () => toast({ title: 'Failed to assign', variant: 'destructive' })
  });

  // --- MUTATIONS FOR NEW FUNCTIONALITY ---

  // 1. Generate Report Mutation
  const reportMutation = useMutation({
    mutationFn: async () => {
      // Simulate API call
      return new Promise(resolve => setTimeout(resolve, 2000));
    },
    onMutate: () => {
      toast({ title: 'Generating Report...', description: 'Your block report is being compiled.' });
    },
    onSuccess: () => {
      // Corrected: 'success' is not a default variant, 'default' is.
      toast({ title: 'Report Generated!', description: 'Your report is ready for download (simulated).', variant: 'default' });
    },
    onError: () => {
      toast({ title: 'Report Failed', description: 'Could not generate the report.', variant: 'destructive' });
    }
  });

  // 2. Approve/Reject Fund Request Mutation
  const approveRequestMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string, status: 'approved' | 'rejected' }) => {
      // Simulate API call
      console.log(`Setting request ${id} to ${status}`);
      return new Promise(resolve => setTimeout(resolve, 500));
    },
    onSuccess: (_, variables) => {
      // Update the state inside the modal for instant feedback
      setModalFundRequests(currentRequests =>
        currentRequests.map(req =>
          req.id === variables.id ? { ...req, status: variables.status } : req
        )
      );
      toast({
        title: `Request ${variables.status === 'approved' ? 'Approved' : 'Rejected'}`,
        // Use 'default' for approved if you haven't custom-defined a 'success' variant
        variant: variables.status === 'approved' ? 'default' : 'destructive',
      });
    } // <<< --- FIX: Added missing closing brace here
  });

  // 3. AI Chat Send Message Handler
  const handleSendAiMessage = () => {
    if (!aiInput.trim()) return;

    const userMessage: ChatMessage = { sender: 'user', text: aiInput };
    setChatMessages(prev => [...prev, userMessage]);
    setAiInput("");
    setIsAiResponding(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        sender: 'ai',
        text: "Based on the symptoms described (fever, persistent cough), please check for signs of dehydration and ensure the child's fluid intake. Refer to NRC guidelines section 4.2 for immediate protocols. A full assessment is recommended."
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
                  <p className="text-3xl font-bold text-primary">
                    {modalFundRequests.filter(req => req.status === 'pending').length}
                  </p>
                </div>
                <AlertCircle className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <Card id="fund-requests" className="govt-shadow-lg xl:col-span-2">
            <CardHeader>
              <CardTitle>Allocations (Assign to Block)</CardTitle>
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
                          <TableCell>{new Date(r.createdAt).toLocaleDateString('en-IN')}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" disabled={assignBlock.isPending || !!r.blockName} onClick={() => assignBlock.mutate({ id: r._id, blockName: 'My Block' })}>
                              {r.blockName ? 'Assigned' : 'Assign to My Block'}
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
          {/* Supervisor Monitoring */}
          <Card id="supervisors" className="govt-shadow-lg">
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
          <Card id="resource-distribution" className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Fund Requests
                </div>
                <Button variant="link" size="sm" onClick={() => setIsApprovalModalOpen(true)}>Manage All</Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* --- THIS IS THE FIX --- */}
                {/* Read from modalFundRequests state instead of initialFundRequests */}
                {modalFundRequests.slice(0, 3).map((request, index) => (
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
          <Card id="alerts" className="govt-shadow-lg">
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
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card id="quick-actions" className="govt-shadow-lg">
          <CardHeader>
            <CardTitle>Block Management Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* --- Button 1: Generate Report --- */}
              <Button 
                variant="govt" 
                className="justify-start gap-3"
                onClick={() => reportMutation.mutate()}
                disabled={reportMutation.isPending}
              >
                {reportMutation.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                {reportMutation.isPending ? "Generating..." : "Generate Block Report"}
              </Button>

              {/* --- Button 2: Approve Fund Requests (Modal Trigger) --- */}
              <Dialog open={isApprovalModalOpen} onOpenChange={setIsApprovalModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="accent" className="justify-start gap-3">
                    <DollarSign className="w-4 h-4" />
                    Approve Fund Requests
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Manage Fund Requests</DialogTitle>
                    <DialogDescription>
                      Approve or reject pending fund requests from supervisors.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-[400px] pr-4">
                    <div className="space-y-4 py-2">
                      {modalFundRequests.map((request) => (
                        <div key={request.id} className="p-4 border rounded-lg">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{request.supervisor} - ₹{request.amount.toLocaleString()}</h4>
                              <p className="text-sm text-muted-foreground">{request.purpose}</p>
                            </div>
                            <div className="flex gap-2">
                              {getPriorityBadge(request.priority)}
                              {getStatusBadge(request.status)}
                            </div>
                          </div>
                          {request.status === 'pending' && (
                            <div className="flex gap-2 mt-4">
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => approveRequestMutation.mutate({ id: request.id, status: 'rejected' })}
                                disabled={approveRequestMutation.isPending}
                              >
                                <X className="w-4 h-4 mr-2" /> Reject
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-success text-success-foreground hover:bg-success/90"
                                onClick={() => approveRequestMutation.mutate({ id: request.id, status: 'approved' })}
                                disabled={approveRequestMutation.isPending}
                              >
                                <Check className="w-4 h-4 mr-2" /> Approve
                              </Button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </DialogContent>
              </Dialog>

              {/* --- Button 3: AI Medical Support (Modal Trigger) --- */}
              <Dialog open={isAiModalOpen} onOpenChange={setIsAiModalOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="justify-start gap-3">
                    <MessageSquare className="w-4 h-4" />
                    AI Medical Support
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle>AI Medical Support</DialogTitle>
                    <DialogDescription>
                      Ask about patient symptoms, medical protocols, or supply chain issues.
                    </DialogDescription>
                  </DialogHeader>
                  <ScrollArea className="h-[400px] p-4 border rounded-md bg-muted/50">
                    <div className="space-y-4">
                      {chatMessages.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`p-3 rounded-lg max-w-[80%] ${
                              msg.sender === 'user' 
                                ? 'bg-primary text-primary-foreground' 
                                : 'bg-background border'
                            }`}
                          >
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
                    <Button onClick={handleSendAiMessage} disabled={isAiResponding}>
                      Send
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}