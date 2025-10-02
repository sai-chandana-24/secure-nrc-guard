import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { DashboardLayout } from '@/components/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

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

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const q = params.get('q') || '';
  const [query, setQuery] = React.useState(q);

  useSEO('Search - NRC E-Finance', `Search results for ${q}`, window.location.origin + '/search');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <DashboardLayout>
      <main className="space-y-6">
        <header>
          <h1 className="text-2xl font-bold text-primary">Search Results</h1>
          <p className="text-sm text-muted-foreground">Showing results for: <span className="font-medium">{q}</span></p>
        </header>

        <form onSubmit={onSubmit} className="flex gap-2 max-w-md">
          <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search again..." className="flex-1" />
          <Button type="submit">Search</Button>
        </form>

        {/* Placeholder results */}
        <section className="text-sm text-muted-foreground">
          No indexed results yet. Use the sidebar to navigate to specific modules.
        </section>
      </main>
    </DashboardLayout>
  );
}
