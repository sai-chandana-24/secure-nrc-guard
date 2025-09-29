import React, { useState } from 'react';
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

const fundAllocationData = [
  {
    fundId: "FND-2024-001",
    district: "Mumbai",
    amountSanctioned: 85000000,
    date: "2024-01-15",
    status: "Released",
    disbursed: 85000000,
    pending: 0
  },
  {
    fundId: "FND-2024-002", 
    district: "Pune",
    amountSanctioned: 65000000,
    date: "2024-01-20",
    status: "Approved",
    disbursed: 45000000,
    pending: 20000000
  },
  {
    fundId: "FND-2024-003",
    district: "Nagpur",
    amountSanctioned: 72000000,
    date: "2024-01-22",
    status: "Pending",
    disbursed: 0,
    pending: 72000000
  },
  {
    fundId: "FND-2024-004",
    district: "Nashik",
    amountSanctioned: 58000000,
    date: "2024-01-25",
    status: "Released",
    disbursed: 58000000,
    pending: 0
  },
  {
    fundId: "FND-2024-005",
    district: "Aurangabad",
    amountSanctioned: 63000000,
    date: "2024-01-28",
    status: "Approved",
    disbursed: 30000000,
    pending: 33000000
  }
];

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

  const filteredData = fundAllocationData.filter(item => {
    const matchesSearch = item.district.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.fundId.toLowerCase().includes(searchTerm.toLowerCase());
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
          <Button variant="govt" className="gap-2">
            <Plus className="w-4 h-4" />
            New Allocation
          </Button>
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
        <div className="overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Fund ID</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Amount Sanctioned</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Disbursed</TableHead>
                <TableHead>Pending</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((item) => (
                <TableRow key={item.fundId} className="hover:bg-muted/50">
                  <TableCell className="font-medium text-primary">
                    {item.fundId}
                  </TableCell>
                  <TableCell className="font-medium">{item.district}</TableCell>
                  <TableCell className="font-semibold">
                    {formatCurrency(item.amountSanctioned)}
                  </TableCell>
                  <TableCell>{new Date(item.date).toLocaleDateString('en-IN')}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(item.status)}
                      <Badge variant={getStatusVariant(item.status)}>
                        {item.status}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-success font-medium">
                    {formatCurrency(item.disbursed)}
                  </TableCell>
                  <TableCell className="text-warning font-medium">
                    {formatCurrency(item.pending)}
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
        
        {filteredData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">No fund allocations found</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}