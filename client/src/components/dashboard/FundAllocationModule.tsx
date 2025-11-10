import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  Search, 
  Filter, 
  Download, 
  Plus, 
  Eye,
  CheckCircle,
  Clock,
  XCircle 
} from 'lucide-react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '@/utils/axiosInstance';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

type Allocation = {
  _id: string;
  districtName: string;
  amount: number;
  purpose?: string;
  status: 'approved' | 'transferred' | 'utilized' | 'audited';
  createdAt: string;
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'Released':
      return <CheckCircle className="w-4 h-4 text-success" />;
    case 'Approved':
      return <Clock className="w-4 h-4 text-warning" />;
    case 'Pending':
      return <XCircle className="w-4 h-4 text-destructive" />;
    default:
      return null;
  }
};

const getStatusVariant = (status: string) => {
  switch (status) {
    case 'Released':
      return 'default';
    case 'Approved':
      return 'secondary';
    case 'Pending':
      return 'destructive';
    default:
      return 'outline';
  }
};

export function FundAllocationModule() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [open, setOpen] = useState(false);
  const [districtName, setDistrictName] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('');
  const { toast } = useToast();

  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery({
    queryKey: ['allocations'],
    queryFn: async () => {
      const res = await axiosInstance.get('/allocations');
      return res.data.allocations as Allocation[];
    }
  });

  const createAllocation = useMutation({
    mutationFn: async (payload: { districtName: string; amount: number; purpose?: string }) => {
      return axiosInstance.post('/allocations', payload);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['allocations'] });
      setOpen(false);
      setDistrictName('');
      setAmount('');
      setPurpose('');
      toast({ title: 'Allocation created', description: 'Funds allocated to district.' });
    },
    onError: (err: any) => {
      const status = err?.response?.status;
      toast({ title: 'Failed to create allocation', description: status ? `HTTP ${status}` : 'Try again.', variant: 'destructive' });
    }
  });

  const allocations = useMemo(() => data ?? [], [data]);
  const filtered = allocations.filter(item => {
    const matchesSearch = item.districtName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="govt-shadow-lg">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-xl font-semibold text-primary">
              Fund Allocation Management
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track and manage fund distribution across districts
            </p>
          </div>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="govt" className="gap-2">
                <Plus className="w-4 h-4" />
                New Allocation
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>New Fund Allocation</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>District</Label>
                  <Input placeholder="Enter district name" value={districtName} onChange={(e) => setDistrictName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Amount (INR)</Label>
                  <Input type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Purpose (optional)</Label>
                  <Input placeholder="Purpose" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setOpen(false)}>Cancel</Button>
                <Button
                  onClick={() => {
                    const amt = Number(amount);
                    if (!districtName || !amt) {
                      toast({ title: 'District and amount required', variant: 'destructive' });
                      return;
                    }
                    createAllocation.mutate({ districtName, amount: amt, purpose: purpose || undefined });
                  }}
                  disabled={createAllocation.isPending}
                >
                  Allocate
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by district or fund ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[200px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Released">Released</SelectItem>
              <SelectItem value="Approved">Approved</SelectItem>
              <SelectItem value="Pending">Pending</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export
          </Button>
        </div>
      </CardHeader>
      
      <CardContent>
        {isLoading && <div className="text-muted-foreground">Loading allocations…</div>}
        {isError && <div className="text-red-600">Failed to load allocations.</div>}
        {!isLoading && !isError && (
          <>
            <div className="overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>District</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Purpose</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.map((item) => (
                    <TableRow key={item._id} className="hover:bg-muted/50">
                      <TableCell className="font-medium">{item.districtName}</TableCell>
                      <TableCell className="font-semibold">{formatCurrency(item.amount)}</TableCell>
                      <TableCell>{item.purpose || '-'}</TableCell>
                      <TableCell>{new Date(item.createdAt).toLocaleDateString('en-IN')}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(item.status)}
                          <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="gap-1">
                            <Eye className="w-3 h-3" />
                            View
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-8">
                <p className="text-muted-foreground">No fund allocations found</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}