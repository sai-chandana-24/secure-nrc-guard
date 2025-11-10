import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';

const malnutritionData = [
  { month: 'Jan', current: 23.4, previous: 25.8, target: 20 },
  { month: 'Feb', current: 22.1, previous: 25.2, target: 19.5 },
  { month: 'Mar', current: 21.3, previous: 24.7, target: 19 },
  { month: 'Apr', current: 20.8, previous: 24.1, target: 18.5 },
  { month: 'May', current: 19.9, previous: 23.6, target: 18 },
  { month: 'Jun', current: 19.2, previous: 23.1, target: 17.5 }
];

const recoveryData = [
  { month: 'Jan', percentage: 78.2 },
  { month: 'Feb', percentage: 81.4 },
  { month: 'Mar', percentage: 83.7 },
  { month: 'Apr', percentage: 85.1 },
  { month: 'May', percentage: 87.3 },
  { month: 'Jun', percentage: 89.1 }
];

const districtFundData = [
  { district: 'Raipur', allocated: 85000000, utilized: 82000000, percentage: 96.5 },
  { district: 'Bilaspur', allocated: 65000000, utilized: 58000000, percentage: 89.2 },
  { district: 'Durg', allocated: 72000000, utilized: 68000000, percentage: 94.4 },
  { district: 'Korba', allocated: 58000000, utilized: 54000000, percentage: 93.1 },
  { district: 'Kanker', allocated: 63000000, utilized: 57000000, percentage: 90.5 },
];

const performanceDistribution = [
  { name: 'Excellent (>90%)', value: 35, color: '#059669' },
  { name: 'Good (80-90%)', value: 42, color: '#0891b2' },
  { name: 'Average (70-80%)', value: 18, color: '#ca8a04' },
  { name: 'Needs Improvement (<70%)', value: 5, color: '#dc2626' }
];

export function PerformanceDashboard() {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <Card className="govt-shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-primary">
            Performance Analytics Dashboard
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Real-time insights into NRC performance across the state
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="malnutrition" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="malnutrition" className="text-xs">Malnutrition Rates</TabsTrigger>
            <TabsTrigger value="recovery" className="text-xs">Recovery Rates</TabsTrigger>
            <TabsTrigger value="funding" className="text-xs">Fund Utilization</TabsTrigger>
            <TabsTrigger value="performance" className="text-xs">Performance Distribution</TabsTrigger>
          </TabsList>
            
            <TabsContent value="malnutrition" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Statewide Malnutrition Trends</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Comparison with previous year and target rates
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={malnutritionData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Malnutrition Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value, name) => [`${value}%`, name]}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="previous" 
                        stackId="1" 
                        stroke="#94a3b8" 
                        fill="#94a3b8" 
                        fillOpacity={0.3}
                        name="Previous Year"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="current" 
                        stackId="2" 
                        stroke="#0369a1" 
                        fill="#0369a1" 
                        fillOpacity={0.6}
                        name="Current Year"
                      />
                      <Area 
                        type="monotone" 
                        dataKey="target" 
                        stackId="3" 
                        stroke="#059669" 
                        fill="#059669" 
                        fillOpacity={0.4}
                        name="Target"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="recovery" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">NRC Recovery Percentage</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Monthly recovery rates across all NRCs
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <AreaChart data={recoveryData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis label={{ value: 'Recovery Rate (%)', angle: -90, position: 'insideLeft' }} />
                      <Tooltip 
                        formatter={(value) => [`${value}%`, 'Recovery Rate']}
                        labelFormatter={(label) => `Month: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="percentage" 
                        stroke="#059669" 
                        fill="url(#colorRecovery)" 
                      />
                      <defs>
                        <linearGradient id="colorRecovery" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#059669" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#059669" stopOpacity={0.1}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="funding" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">District-wise Fund Usage</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Fund allocation vs utilization by district
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <BarChart data={districtFundData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="district" />
                      <YAxis tickFormatter={(value) => `₹${(value/10000000).toFixed(0)}Cr`} />
                      <Tooltip 
                        formatter={(value, name) => [
                          formatCurrency(Number(value)), 
                          name === 'allocated' ? 'Allocated' : 'Utilized'
                        ]}
                      />
                      <Bar dataKey="allocated" fill="#0369a1" name="allocated" />
                      <Bar dataKey="utilized" fill="#059669" name="utilized" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="performance" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">NRC Performance Distribution</CardTitle>
                  <p className="text-sm text-muted-foreground">
                    Distribution of NRCs by performance levels
                  </p>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={400}>
                    <PieChart>
                      <Pie
                        data={performanceDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {performanceDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}