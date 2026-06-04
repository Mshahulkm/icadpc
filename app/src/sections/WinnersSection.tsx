import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '../components/SectionHeader';

interface Winner {
  name: string;
  year: string;
  position: string;
  photo: string;
}

const defaultWinners: Winner[] = [
  { name: 'Mohammed Ali', year: '2022', position: 'Champion', photo: '/assets/winner-placeholder-1.jpg' },
  { name: 'Ahmed Hassan', year: '2022', position: 'Runner Up', photo: '/assets/winner-placeholder-2.jpg' },
  { name: 'Omar Farooq', year: '2022', position: 'Third Place', photo: '/assets/winner-placeholder-3.jpg' },
];

export default function WinnersSection() {
  const [winners, setWinners] = useState<Winner[]>(defaultWinners);

  useEffect(() => {
    fetch('/data/winners.json')
      .then((res) => res.json())
      .then((data: Winner[]) => { if (data && data.length > 0) setWinners(data); })
      .catch(() => {});
  }, []);

  return (
    <section id="winners" className="py-24 md:py-32 px-6" style={{ backgroundColor: 'var(--deep-black)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="max-w-[1200px] mx-auto">
        <SectionHeader eyebrow="HALL OF FAME" title="Previous Winners" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {winners.map((winner, index) => (
            <Card key={winner.name} className="rounded-3xl overflow-hidden transition-all duration-300 group" style={{ backgroundColor: 'var(--charcoal)', border: '1px solid var(--glass-border)' }} data-aos="zoom-in" data-aos-delay={index * 200}>
              <div className="h-[280px] relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A1A1A, #2A2A2A)' }}>
                <img src={winner.photo} alt={winner.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--charcoal), transparent)' }} />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--white)', fontFamily: "'Montserrat', sans-serif" }}>{winner.name}</h3>
                <p className="section-eyebrow mb-1 !text-xs">World Cup {winner.year}</p>
                <p className="text-sm" style={{ color: 'var(--muted-white)' }}>{winner.position}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
