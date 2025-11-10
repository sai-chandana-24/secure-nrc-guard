import React, { useMemo, useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  Users, 
  Plus,
  Package,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Activity,
  UserPlus,
  Send,
  Bot,
  AlertTriangle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';

// Unified data structure
const initialChildrenData = [
  { id: 'CH001', name: 'Aarav Kumar', age: 3, weight: 8.5, height: 85, muac: 10.5, status: 'SAM', lastEntry: '2025-10-19', weeklyChange: -0.2, trend: 'declining', referred: false },
  { id: 'CH002', name: 'Priya Singh', age: 4, weight: 11.2, height: 92, muac: 12.8, status: 'MAM', lastEntry: '2025-11-1', weeklyChange: 0.3, trend: 'improving', referred: false },
  { id: 'CH003', name: 'Ravi Patel', age: 2, weight: 7.8, height: 78, muac: 9.8, status: 'SAM', lastEntry: '2025-09-18', weeklyChange: 0.1, trend: 'stable', referred: true },
  { id: 'CH004', name: 'Meera Sharma', age: 5, weight: 13.1, height: 98, muac: 14.2, status: 'Normal', lastEntry: '2025-10-01', weeklyChange: 0.4, trend: 'improving', referred: false },
];

type AllocationRow = {
  _id: string;
  districtName: string;
  amount: number;
  purpose?: string;
  status: 'approved' | 'transferred' | 'utilized' | 'audited';
  createdAt: string;
  schoolName?: string;
  utilized?: boolean;
};

export default function TeacherDashboard() {
  // 1. State Management
  const [children, setChildren] = useState(initialChildrenData);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newChild, setNewChild] = useState({ name: '', age: '', weight: '', height: '', muac: '' });
  
  // Kit State
  const [kitStats, setKitStats] = useState({ received: 50, distributed: 45 });
  const [isKitRequestPending, setIsKitRequestPending] = useState(false);

  // AI Support State
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [aiQuery, setAiQuery] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { toast } = useToast();

  // 2. Data Fetching (Allocations)
  const { data: allocationData, isLoading: isAllocLoading } = useQuery({
    queryKey: ['allocations', 'teacher-view'],
    queryFn: async () => {
      try {
         // Uncomment when backend is ready: const res = await axiosInstance.get('/allocations'); return res.data.allocations;
         return []; // Returning empty for now to use mock data in render
      } catch (e) { return []; }
    }
  });

  const rows = useMemo(() => allocationData ?? [], [allocationData]);

  // 3. Mutations & Actions

  // Mark Allocation Utilized
  const markUtilized = useMutation({
    mutationFn: async ({ id }: { id: string }) => {
      // await axiosInstance.patch(`/allocations/${id}/utilize`);
      await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allocations', 'teacher-view'] });
      toast({ title: 'Marked utilized', className: 'bg-success text-white' });
    },
    onError: () => toast({ title: 'Failed to update', variant: 'destructive' })
  });

  // Register New Child
  const handleAddChild = async () => {
    if (!newChild.name || !newChild.age || !newChild.weight || !newChild.muac) {
        toast({ title: "Missing Information", description: "Please fill in Name, Age, Weight and MUAC.", variant: "destructive" });
        return;
    }

    const muacVal = parseFloat(newChild.muac);
    let calculatedStatus = 'Normal';
    if (muacVal < 11.5) calculatedStatus = 'SAM';
    else if (muacVal >= 11.5 && muacVal < 12.5) calculatedStatus = 'MAM';

    const childEntry = {
        id: `CH00${children.length + 1}`,
        name: newChild.name,
        age: parseInt(newChild.age) || 0,
        weight: parseFloat(newChild.weight) || 0,
        height: parseFloat(newChild.height) || 0,
        muac: muacVal || 0,
        status: calculatedStatus,
        lastEntry: new Date().toISOString().split('T')[0],
        weeklyChange: 0,
        trend: 'stable',
        referred: false
    };

    // Simulate API call
    try {
        // await axiosInstance.post('/children', childEntry);
        setChildren(prev => [...prev, childEntry]);
        setShowAddForm(false);
        setNewChild({ name: '', age: '', weight: '', height: '', muac: '' });
        toast({ 
            title: "Registration Successful", 
            description: `${childEntry.name} has been registered with status: ${calculatedStatus}`,
            className: calculatedStatus === 'SAM' ? 'border-destructive' : 'border-success'
        });
    } catch (error) {
        toast({ title: "Registration Failed", variant: "destructive" });
    }
  };

  // Refer Child
  const handleRefer = (childId: string, childName: string) => {
    toast({
        title: "Processing Referral",
        description: <div className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin"/> Contacting Block Medical Officer...</div>,
    });

    setTimeout(() => {
        setChildren(prev => prev.map(c => c.id === childId ? { ...c, referred: true } : c));
        toast({
            title: "Referral Sent Successfully",
            description: `Referral ticket #REF-${Math.floor(Math.random()*1000)} created for ${childName}. ambulance requested if marked critical.`,
            className: "bg-success text-white"
        });
    }, 1500);
  };

  // Request Kits
  const handleRequestKits = () => {
    setIsKitRequestPending(true);
    toast({
        title: "Request Sent",
        description: "Requisition for 50 Nutrition Kits sent to CDPO.",
    });
    // Simulate fulfillment after some time in a real app
  };

  // Send Weekly Updates
  const handleSendUpdates = () => {
    const parentCount = children.length;
    toast({
        title: "Broadcast Initiated",
        description: `Sending weekly progress SMS/WhatsApp to ${parentCount} registered parents...`,
    });
    setTimeout(() => {
         toast({ title: "Updates Delivered", className: "bg-success text-white" });
    }, 2000);
  };

  // AI Support
  const handleaskAI = () => {
    if(!aiQuery.trim()) return;
    setAiLoading(true);
    // Simulate AI response
    setTimeout(() => {
        setAiResponse(`Based on standard NRC guidelines: For a ${children[0].age}-year-old with SAM (Weight ${children[0].weight}kg), immediate referral to NRC is recommended if they have medical complications. Otherwise, start standard community-based protocol: 1 packet RUTF/day and weekly monitoring. (This is an AI generated suggestion, please consult MO)`);
        setAiLoading(false);
    }, 2000);
  };


  // 4. Helper Functions
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Normal': return <Badge className="bg-success hover:bg-success/90 text-white">Normal</Badge>;
      case 'MAM': return <Badge className="bg-warning hover:bg-warning/90 text-black">MAM</Badge>;
      case 'SAM': return <Badge variant="destructive" className="animate-pulse">SAM</Badge>;
      default: return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'improving': return <TrendingUp className="w-4 h-4 text-success" />;
      case 'declining': return <TrendingDown className="w-4 h-4 text-destructive" />;
      default: return <Activity className="w-4 h-4 text-warning" />;
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div id="top" className="govt-card-gradient p-6 rounded-lg govt-shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">Anganwadi Teacher Dashboard</h1>
              <p className="text-muted-foreground text-lg">First point of data collection and reporting - AWC Raipur-001</p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full border border-success/20">
              <UserPlus className="w-5 h-5 text-success" />
              <span className="text-sm font-semibold text-success">Teacher Active</span>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="govt-shadow-lg border-l-4 border-l-primary">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Children</p>
                  <p className="text-3xl font-bold text-primary">{children.length}</p>
                </div>
                <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                </div>
            </CardContent>
          </Card>
          <Card className="govt-shadow-lg border-l-4 border-l-destructive">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">SAM Cases</p>
                  <p className="text-3xl font-bold text-destructive">{children.filter(c => c.status === 'SAM').length}</p>
                </div>
                <div className="h-12 w-12 bg-destructive/10 rounded-full flex items-center justify-center">
                    <AlertTriangle className="w-6 h-6 text-destructive" />
                </div>
            </CardContent>
          </Card>
          <Card className="govt-shadow-lg border-l-4 border-l-warning">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">MAM Cases</p>
                  <p className="text-3xl font-bold text-warning">{children.filter(c => c.status === 'MAM').length}</p>
                </div>
                <div className="h-12 w-12 bg-warning/10 rounded-full flex items-center justify-center">
                    <Activity className="w-6 h-6 text-warning" />
                </div>
            </CardContent>
          </Card>
          <Card className="govt-shadow-lg border-l-4 border-l-blue-500">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Stock Remaining</p>
                  <p className="text-3xl font-bold text-blue-500">{kitStats.received - kitStats.distributed}</p>
                </div>
                <div className="h-12 w-12 bg-blue-500/10 rounded-full flex items-center justify-center">
                    <Package className="w-6 h-6 text-blue-500" />
                </div>
            </CardContent>
          </Card>
        </div>

        {/* Allocations Table */}
        <Card id="entry" className="govt-shadow-lg">
          <CardHeader><CardTitle>Financial Allocations (Utilize at School)</CardTitle></CardHeader>
          <CardContent>
            {isAllocLoading && <div className="flex justify-center p-4"><Loader2 className="animate-spin"/></div>}
            {!isAllocLoading && (
              <div className="overflow-auto max-h-[300px]">
                <Table>
                  <TableHeader className="bg-muted/50 sticky top-0">
                    <TableRow>
                      <TableHead>Purpose</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Date Received</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {(rows.length > 0 ? rows : [
                        { _id: 'mock1', amount: 5000, purpose: 'Vegetable Purchase', createdAt: '2025-11-08', utilized: false },
                        { _id: 'mock2', amount: 2500, purpose: 'Medical Kits', createdAt: '2025-11-05', utilized: true }
                    ]).map((r) => (
                      <TableRow key={r._id}>
                        <TableCell className="font-medium">{r.purpose || 'General Funds'}</TableCell>
                        <TableCell>{new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(r.amount)}</TableCell>
                        <TableCell>{new Date(r.createdAt).toLocaleDateString('en-IN')}</TableCell>
                        <TableCell>
                            {r.utilized ? <Badge variant="outline" className="bg-success/10 text-success border-success/20">Utilized</Badge> : <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>}
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant={r.utilized ? "ghost" : "default"} disabled={markUtilized.isPending || !!r.utilized} onClick={() => markUtilized.mutate({ id: r._id })}>
                            {markUtilized.isPending && <Loader2 className="mr-2 h-3 w-3 animate-spin" />}
                            {r.utilized ? <CheckCircle2 className="w-4 h-4 text-success"/> : 'Mark Utilized'}
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

        {/* Add Child Form */}
        <Card className={`govt-shadow-lg transition-all duration-300 ${showAddForm ? 'ring-2 ring-primary' : ''}`}>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-primary" /> Child Health Registration
              </CardTitle>
              <Button onClick={() => setShowAddForm(!showAddForm)} variant={showAddForm ? "secondary" : "govt"} className="gap-2">
                {showAddForm ? 'Cancel Registration' : <><Plus className="w-4 h-4" /> Register New Child</>}
              </Button>
            </div>
          </CardHeader>
          {showAddForm && (
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 p-6 border rounded-lg bg-muted/30 animate-in slide-in-from-top-2">
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" value={newChild.name} onChange={(e) => setNewChild({...newChild, name: e.target.value})} placeholder="e.g., Aarav Kumar" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age (Years) *</Label>
                  <Input id="age" type="number" value={newChild.age} onChange={(e) => setNewChild({...newChild, age: e.target.value})} placeholder="3" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input id="weight" type="number" step="0.1" value={newChild.weight} onChange={(e) => setNewChild({...newChild, weight: e.target.value})} placeholder="10.5" className="bg-background" />
                </div>
                 <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input id="height" type="number" value={newChild.height} onChange={(e) => setNewChild({...newChild, height: e.target.value})} placeholder="95" className="bg-background" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="muac">MUAC (cm) *</Label>
                  <Input id="muac" type="number" step="0.1" value={newChild.muac} onChange={(e) => setNewChild({...newChild, muac: e.target.value})} placeholder="12.5" className="bg-background border-primary/30" />
                  <p className="text-xs text-muted-foreground">{'<'}11.5 is SAM, 11.5-12.5 is MAM</p>
                </div>
                <div className="md:col-span-4 flex items-end">
                   <Button onClick={handleAddChild} variant="govt" className="w-full md:w-auto min-w-[200px] gap-2">
                     <Save className="w-4 h-4" /> Save Record
                   </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {/* Children List with Refer Functionality */}
          <Card id="children" className="govt-shadow-lg flex flex-col h-[600px]">
            <CardHeader className="shrink-0 border-b bg-muted/10">
              <CardTitle className="flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Registered Children & Referrals</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 p-0">
              <ScrollArea className="h-full p-6">
                <div className="space-y-4">
                  {children.map((child, index) => (
                    <div key={index} className={`p-4 border rounded-lg bg-card ${child.status === 'SAM' ? 'border-destructive/50 bg-destructive/5' : ''}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-lg flex items-center gap-2">
                              {child.name}
                              {child.referred && <Badge variant="secondary" className="text-xs"><CheckCircle2 className="w-3 h-3 mr-1 text-success"/> Referred</Badge>}
                          </h4>
                          <p className="text-sm text-muted-foreground">ID: {child.id} | Age: {child.age}y</p>
                        </div>
                        {getStatusBadge(child.status)}
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm bg-background/50 p-3 rounded-md">
                        <div><span className="text-muted-foreground block">Weight</span><span className="font-semibold">{child.weight} kg</span></div>
                        <div><span className="text-muted-foreground block">Height</span><span className="font-semibold">{child.height} cm</span></div>
                        <div><span className="text-muted-foreground block">MUAC</span><span className={`font-semibold ${child.status === 'SAM' ? 'text-destructive' : ''}`}>{child.muac} cm</span></div>
                      </div>
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">Last Vist: {child.lastEntry}</span>
                        {child.status === 'SAM' && !child.referred && (
                          <Button size="sm" variant="destructive" onClick={() => handleRefer(child.id, child.name)} className="gap-1 shadow-sm">
                             <Send className="w-3 h-3" /> Refer to NRC/Hospital
                          </Button>
                        )}
                        {child.referred && (
                            <Button size="sm" variant="outline" disabled className="gap-1 opacity-70">
                             <Activity className="w-3 h-3" /> Referral Active
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>

          {/* Resource & Communication & AI */}
          <div className="space-y-6">
             {/* Progress (Condensed) */}
            <Card className="govt-shadow-lg max-h-[300px] flex flex-col">
                <CardHeader className="py-4 shrink-0"><CardTitle className="text-base flex items-center gap-2"><Activity className="w-4 h-4 text-primary"/> Recent Progress Trends</CardTitle></CardHeader>
                <CardContent className="overflow-auto flex-1 py-0 pb-4">
                     <div className="space-y-2">
                        {children.slice(0,3).map((child,i) => (
                            <div key={i} className="flex items-center justify-between text-sm p-2 border rounded bg-muted/10">
                                <span className="font-medium">{child.name}</span>
                                <div className="flex items-center gap-4">
                                    <span className={`flex items-center gap-1 ${child.weeklyChange > 0 ? 'text-success' : 'text-destructive'}`}>
                                        {child.weeklyChange > 0 ? '+' : ''}{child.weeklyChange}kg {getTrendIcon(child.trend)}
                                    </span>
                                </div>
                            </div>
                        ))}
                     </div>
                </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Kit Tracker */}
                <Card id="kits" className="govt-shadow-lg flex flex-col">
                  <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><Package className="w-4 h-4 text-primary" /> Nutrition Kit Stock</CardTitle></CardHeader>
                  <CardContent className="space-y-3 flex-1">
                    <div className="flex justify-between text-sm border-b pb-2"><span>Received:</span> <span className="font-semibold">{kitStats.received}</span></div>
                    <div className="flex justify-between text-sm border-b pb-2"><span>Distributed:</span> <span className="font-semibold">{kitStats.distributed}</span></div>
                    <div className="flex justify-between text-lg font-bold text-primary pt-1"><span>In Hand:</span> <span>{kitStats.received - kitStats.distributed}</span></div>
                  </CardContent>
                  <CardFooter>
                       <Button onClick={handleRequestKits} disabled={isKitRequestPending} variant={isKitRequestPending ? "outline" : "default"} className="w-full">
                         {isKitRequestPending ? <><Loader2 className="w-4 h-4 mr-2 animate-spin"/> Request Pending</> : 'Request Re-stock'}
                       </Button>
                  </CardFooter>
                </Card>

                {/* Communication */}
                <Card id="communication" className="govt-shadow-lg flex flex-col">
                  <CardHeader className="pb-2"><CardTitle className="text-base flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> Parent Connect</CardTitle></CardHeader>
                  <CardContent className="space-y-3 flex-1">
                    <div className="p-2 bg-primary/5 rounded text-xs border-l-2 border-primary">
                      <strong>Next Broadcast:</strong> Diet Plan (Due tomorrow)
                    </div>
                     <Button onClick={handleSendUpdates} variant="accent" className="w-full gap-2 text-sm">
                      <Send className="w-3 h-3" /> Send Weekly Updates
                    </Button>
                  </CardContent>
                  <CardFooter>
                      {/* AI Support Dialog */}
                      <Dialog open={isAIOpen} onOpenChange={setIsAIOpen}>
                          <DialogTrigger asChild>
                             <Button variant="outline" className="w-full gap-2 border-primary/30 hover:bg-primary/5">
                              <Bot className="w-4 h-4 text-primary" /> AI Nutrition Assistant
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                              <DialogHeader>
                                  <DialogTitle className="flex items-center gap-2"><Bot className="w-5 h-5 text-primary"/> Sahayika AI</DialogTitle>
                                  <DialogDescription>Ask questions about SAM/MAM diet plans or guidelines.</DialogDescription>
                              </DialogHeader>
                              <div className="grid gap-4 py-4">
                                  <div className="space-y-2">
                                       {aiResponse ? (
                                           <div className="p-3 bg-muted rounded-lg text-sm">
                                               <p className="font-semibold text-primary mb-1">Sahayika:</p>
                                               {aiResponse}
                                                <Button variant="link" onClick={() => { setAiResponse(null); setAiQuery(''); }} className="p-0 h-auto text-xs mt-2">Ask another question</Button>
                                           </div>
                                       ) : (
                                           <>
                                            <Label htmlFor="ai-query">Your Question</Label>
                                            <Input id="ai-query" placeholder="e.g., What is the diet for 3yr old SAM child?" value={aiQuery} onChange={e => setAiQuery(e.target.value)} />
                                           </>
                                       )}
                                  </div>
                              </div>
                              {!aiResponse && (
                                  <DialogFooter>
                                      <Button onClick={handleaskAI} disabled={aiLoading || !aiQuery.trim()} className="gap-2">
                                          {aiLoading ? <Loader2 className="w-4 h-4 animate-spin"/> : <Bot className="w-4 h-4"/>}
                                          {aiLoading ? 'Thinking...' : 'Ask AI'}
                                      </Button>
                                  </DialogFooter>
                              )}
                          </DialogContent>
                      </Dialog>
                  </CardFooter>
                </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

// Simple Save icon component if not imported from lucide-react
function Save(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  )
}