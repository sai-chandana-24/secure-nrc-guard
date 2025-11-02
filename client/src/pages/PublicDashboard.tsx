import React, { useState } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { 
  Eye, 
  DollarSign,
  Users,
  FileText,
  MessageSquare,
  Download,
  AlertCircle,
  TrendingUp,
  Shield,
  Send
} from 'lucide-react';

const fundUtilizationData = [
  { district: 'Raipur', allocated: 25000000, used: 21750000, percentage: 87 },
  { district: 'Bilaspur', allocated: 18000000, used: 16200000, percentage: 90 },
  { district: 'Durg', allocated: 32000000, used: 25600000, percentage: 80 },
  { district: 'Korba', allocated: 15000000, used: 13500000, percentage: 90 },
];

const healthStatistics = [
  { metric: 'Total SAM Children Identified', value: '2,456', change: '+12%' },
  { metric: 'Children Recovered', value: '1,890', change: '+18%' },
  { metric: 'Active NRC Admissions', value: '156', change: '-5%' },
  { metric: 'Overall Recovery Rate', value: '77%', change: '+3%' },
];

export default function PublicDashboard() {
  const [complaint, setComplaint] = useState({
    name: '',
    email: '',
    location: '',
    issue: '',
    description: ''
  });

  const handleSubmitComplaint = () => {
    // Submit complaint logic here
    setComplaint({ name: '', email: '', location: '', issue: '', description: '' });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="govt-card-gradient p-6 rounded-lg govt-shadow-md border">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">
                Public Transparency Dashboard
              </h1>
              <p className="text-muted-foreground text-lg">
                Transparency & monitoring for public trust - Chhattisgarh NRC Program
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-success/10 rounded-full">
              <Eye className="w-5 h-5 text-success" />
              <span className="text-sm font-semibold text-success">Public Access</span>
            </div>
          </div>
        </div>

        {/* Key Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {healthStatistics.map((stat, index) => (
            <Card key={index} className="govt-shadow-lg">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.metric}</p>
                    <p className="text-2xl font-bold text-primary">{stat.value}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="w-3 h-3 text-success" />
                      <span className="text-xs text-success">{stat.change}</span>
                    </div>
                  </div>
                  <Users className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Fund Utilization View */}
        <Card className="govt-shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary" />
              District-wise Fund Utilization
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {fundUtilizationData.map((fund, index) => (
                <div key={index} className="p-4 border rounded-lg govt-transition hover:govt-shadow-md">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-lg">{fund.district} District</h4>
                    <Badge className={fund.percentage >= 85 ? "bg-success text-success-foreground" : "bg-warning text-warning-foreground"}>
                      {fund.percentage}% Utilized
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="p-3 bg-muted/50 rounded">
                      <span className="text-muted-foreground">Total Allocated</span>
                      <p className="font-bold text-lg">₹{(fund.allocated / 10000000).toFixed(1)} Cr</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <span className="text-muted-foreground">Amount Utilized</span>
                      <p className="font-bold text-lg text-primary">₹{(fund.used / 10000000).toFixed(1)} Cr</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded">
                      <span className="text-muted-foreground">Remaining</span>
                      <p className="font-bold text-lg">₹{((fund.allocated - fund.used) / 10000000).toFixed(1)} Cr</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Reports & Complaint System */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Downloadable Reports */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-primary" />
                Public Reports
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">Monthly District Summary - January 2024</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Comprehensive report covering fund utilization, child health outcomes, and program effectiveness.
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download PDF Report
                </Button>
              </div>
              
              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">Block Performance Analysis</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Block-wise performance metrics, recovery rates, and resource allocation details.
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download Excel Report
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <h5 className="font-semibold mb-2">Annual Transparency Report 2023</h5>
                <p className="text-sm text-muted-foreground mb-3">
                  Complete annual overview of program impact, financial transparency, and success stories.
                </p>
                <Button variant="outline" className="w-full gap-2">
                  <Download className="w-4 h-4" />
                  Download Annual Report
                </Button>
              </div>

              <Button variant="govt" className="w-full gap-2">
                <FileText className="w-4 h-4" />
                View All Public Reports
              </Button>
            </CardContent>
          </Card>

          {/* Complaint/Feedback System */}
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-primary" />
                Report Issues / Feedback
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name"
                    value={complaint.name}
                    onChange={(e) => setComplaint({...complaint, name: e.target.value})}
                    placeholder="Enter your full name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input 
                    id="email"
                    type="email"
                    value={complaint.email}
                    onChange={(e) => setComplaint({...complaint, email: e.target.value})}
                    placeholder="Enter your email"
                  />
                </div>
                
                <div>
                  <Label htmlFor="location">Location (District/Block)</Label>
                  <Input 
                    id="location"
                    value={complaint.location}
                    onChange={(e) => setComplaint({...complaint, location: e.target.value})}
                    placeholder="Enter district/block name"
                  />
                </div>
                
                <div>
                  <Label htmlFor="issue">Issue Category</Label>
                  <Input 
                    id="issue"
                    value={complaint.issue}
                    onChange={(e) => setComplaint({...complaint, issue: e.target.value})}
                    placeholder="e.g., Kit Distribution, Fund Delay, etc."
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea 
                    id="description"
                    value={complaint.description}
                    onChange={(e) => setComplaint({...complaint, description: e.target.value})}
                    placeholder="Describe the issue in detail"
                    rows={4}
                  />
                </div>
                
                <Button onClick={handleSubmitComplaint} variant="govt" className="w-full gap-2">
                  <Send className="w-4 h-4" />
                  Submit Complaint
                </Button>
              </div>

              <div className="p-3 border-l-4 border-primary bg-primary/5 rounded">
                <p className="font-medium text-primary">Track Your Complaint</p>
                <p className="text-sm text-muted-foreground">Use complaint ID to track status and responses</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support & FAQ */}
        <Card className="govt-shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-primary" />
              Public Support & Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h5 className="font-semibold">Frequently Asked Questions</h5>
                <div className="space-y-3">
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">How is fund allocation determined?</p>
                    <p className="text-xs text-muted-foreground">Based on district population, malnutrition rates, and infrastructure needs.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">How can I verify kit distribution?</p>
                    <p className="text-xs text-muted-foreground">Use our complaint system or contact local Anganwadi teacher.</p>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <p className="font-medium text-sm">What is the NRC admission criteria?</p>
                    <p className="text-xs text-muted-foreground">Children with SAM (Severe Acute Malnutrition) as per WHO guidelines.</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h5 className="font-semibold">Program Information</h5>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Total Program Budget</span>
                    <span className="font-bold">₹890 Cr</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Districts Covered</span>
                    <span className="font-bold">28</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Active NRCs</span>
                    <span className="font-bold">156</span>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <span className="text-sm">Transparency Score</span>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-success" />
                      <span className="font-bold text-success">95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 pt-6 border-t">
              <Button variant="outline" className="w-full gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat with AI Assistant for Quick Information
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}