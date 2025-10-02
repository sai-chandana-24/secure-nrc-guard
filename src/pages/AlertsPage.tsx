import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Bell } from 'lucide-react';

function useSEO(title: string, description: string, canonical: string) {
  useEffect(() => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    else {
      const m = document.createElement('meta');
      m.name = 'description';
      m.content = description;
      document.head.appendChild(m);
    }
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', canonical);
  }, [title, description, canonical]);
}

export default function AlertsPage() {
  useSEO('System Alerts - NRC E-Finance', 'View and manage all system alerts in the NRC E-Finance portal.', window.location.origin + '/alerts');

  const sample = [
    { id: 1, title: 'Audit Required - Aurangabad', severity: 'High', time: '2h ago' },
    { id: 2, title: 'Low Fund Utilization - Nashik District', severity: 'Medium', time: '4h ago' },
    { id: 3, title: 'Transaction Verified - ₹2.5Cr', severity: 'Low', time: '6h ago' },
  ];

  return (
    <DashboardLayout>
      <section className="space-y-6" role="region" aria-label="System Alerts">
        <header>
          <h1 className="text-2xl font-bold text-primary">System Alerts</h1>
          <p className="text-sm text-muted-foreground">Real-time notifications and audit findings across the state.</p>
        </header>

        <Card className="govt-shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-primary" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {sample.map((a) => (
              <div key={a.id} className="flex items-center justify-between p-3 rounded border">
                <div className="flex items-center gap-2">
                  <Badge variant={a.severity === 'High' ? 'destructive' : a.severity === 'Medium' ? 'secondary' : 'outline'}>
                    {a.severity}
                  </Badge>
                  <span className="text-sm">{a.title}</span>
                </div>
                <span className="text-xs text-muted-foreground">{a.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </DashboardLayout>
  );
}
