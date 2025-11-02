import React, { useEffect } from 'react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, MessageSquare } from 'lucide-react';

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

export default function SupportPage() {
  useSEO('Support & Help - NRC E-Finance', 'Get support, FAQs, and contact the help desk for NRC E-Finance.', window.location.origin + '/support');

  return (
    <DashboardLayout>
      <main className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-primary">Support & Help Center</h1>
          <p className="text-sm text-muted-foreground">Find answers or reach our support team.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-sm">
                <li>How to allocate funds to districts?</li>
                <li>How to generate performance reports?</li>
                <li>How to update user roles and permissions?</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="govt-shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-primary" />
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p>Email: support@nrc-chhattisgarh.gov.in</p>
              <p>Phone: +91-771-000-0000</p>
              <p>Hours: Mon-Fri, 9:00 AM - 6:00 PM IST</p>
            </CardContent>
          </Card>
        </div>
      </main>
    </DashboardLayout>
  );
}
