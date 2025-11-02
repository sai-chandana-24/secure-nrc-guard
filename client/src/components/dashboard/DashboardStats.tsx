import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  IndianRupee, 
  Users, 
  TrendingUp, 
  Shield, 
  Building,
  AlertTriangle 
} from 'lucide-react';

const stats = [
  {
    title: "Total Funds Allocated",
    value: "₹24.5 Cr",
    change: "+12.5%",
    trend: "up",
    icon: IndianRupee,
    description: "Current fiscal year",
    bgClass: "govt-gradient"
  },
  {
    title: "Active NRCs",
    value: "156",
    change: "+8",
    trend: "up",
    icon: Building,
    description: "Across 28 districts",
    bgClass: "govt-accent-gradient"
  },
  {
    title: "Children Recovered",
    value: "3,247",
    change: "+15.2%",
    trend: "up",
    icon: Users,
    description: "This quarter",
    bgClass: "bg-success"
  },
  {
    title: "Recovery Rate",
    value: "87.3%",
    change: "+2.1%",
    trend: "up",
    icon: TrendingUp,
    description: "State average",
    bgClass: "bg-warning"
  },
  {
    title: "Blockchain Transactions",
    value: "12,847",
    change: "100%",
    trend: "up",
    icon: Shield,
    description: "Secure & immutable",
    bgClass: "bg-primary"
  },
  {
    title: "Pending Audits",
    value: "7",
    change: "-3",
    trend: "down",
    icon: AlertTriangle,
    description: "Requires attention",
    bgClass: "bg-destructive"
  }
];

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index} className="govt-shadow-md hover:govt-shadow-lg govt-transition overflow-hidden">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <div className={`p-2 rounded-md ${stat.bgClass}`}>
                <stat.icon className="w-4 h-4 text-white" />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">{stat.value}</span>
                <Badge 
                  variant={stat.trend === 'up' ? 'default' : 'destructive'}
                  className="text-xs"
                >
                  {stat.change}
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">{stat.description}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}