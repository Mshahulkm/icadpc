import { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '../components/SectionHeader';

interface Announcement {
  title: string;
  date: string;
  message: string;
  category: string;
}

const categoryColors: Record<string, { bg: string; text: string }> = {
  'Admin Updates': { bg: 'rgba(27, 94, 32, 0.2)', text: '#4CAF50' },
  'Important Notices': { bg: 'rgba(200, 168, 78, 0.15)', text: '#C8A84E' },
  'Schedule Changes': { bg: 'rgba(33, 150, 243, 0.15)', text: '#64B5F6' },
  'Prize Announcements': { bg: 'rgba(156, 39, 176, 0.15)', text: '#CE93D8' },
};

export default function AnnouncementsSection() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/data/announcements.json')
      .then((res) => res.json())
      .then((data: Announcement[]) => { setAnnouncements(data); setLoading(false); })
      .catch(() => { setAnnouncements([]); setLoading(false); });
  }, []);

  if (loading) {
    return (
      <section className="py-24 md:py-32 px-6" style={{ backgroundColor: 'var(--deep-black)', borderTop: '1px solid var(--glass-border)' }}>
        <div className="max-w-[800px] mx-auto text-center"><p style={{ color: 'var(--muted-white)' }}>Loading announcements...</p></div>
      </section>
    );
  }

  return (
    <section id="announcements" className="py-24 md:py-32 px-6" style={{ backgroundColor: 'var(--deep-black)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="max-w-[800px] mx-auto">
        <SectionHeader eyebrow="STAY INFORMED" title="Admin Announcements" />
        <div className="flex flex-col gap-4">
          {announcements.map((item, index) => {
            const catColors = categoryColors[item.category] || categoryColors['Admin Updates'];
            return (
              <Card key={index} className="rounded-xl overflow-hidden" style={{ background: 'var(--glass-fill)', border: '1px solid var(--glass-border)', borderLeft: '4px solid var(--brand-green)' }} data-aos="fade-right" data-aos-delay={index * 100}>
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <Badge className="rounded-full px-3 py-1 text-xs font-medium" style={{ backgroundColor: catColors.bg, color: catColors.text }}>{item.category}</Badge>
                    <span className="text-xs font-medium" style={{ color: 'var(--muted-white)' }}>{item.date}</span>
                  </div>
                  <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--white)', fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--muted-white)' }}>{item.message}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
