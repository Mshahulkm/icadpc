import { Users, Calendar, Globe, LayoutGrid } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '../components/SectionHeader';

const newsItems = [
  { icon: Users, title: '48 Teams', description: 'Expanded from 32 to 48 teams — the biggest World Cup ever.' },
  { icon: Calendar, title: '104 Matches', description: 'Tournament increased from 64 matches to 104 matches across 40 days.' },
  { icon: Globe, title: 'Three Host Nations', description: 'USA, Canada and Mexico jointly host the tournament across 16 cities.' },
  { icon: LayoutGrid, title: 'New Format', description: '12 groups of 4 teams, with Round of 32 added before Round of 16.' },
];

export default function NewsSection() {
  return (
    <section id="news" className="py-24 md:py-32 px-6" style={{ background: 'linear-gradient(to bottom, var(--deep-black), var(--charcoal))' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="TOURNAMENT UPDATES" title="FIFA World Cup 2026 Updates" />
        <div className="grid sm:grid-cols-2 gap-6">
          {newsItems.map((item, index) => (
            <Card key={item.title} className="rounded-2xl p-8 transition-all duration-400 cursor-default group" style={{ backgroundColor: 'var(--charcoal)', border: '1px solid var(--glass-border)' }} data-aos="fade-up" data-aos-delay={index * 150}>
              <CardContent className="p-0">
                <item.icon className="w-12 h-12 mb-4 transition-transform duration-300 group-hover:scale-110" style={{ color: 'var(--gold)' }} />
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: 'var(--white)', fontFamily: "'Montserrat', sans-serif" }}>{item.title}</h3>
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-white)' }}>{item.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
