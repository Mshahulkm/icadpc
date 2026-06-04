import { Medal, Award, Star, Gift } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '../components/SectionHeader';

const prizes = [
  { icon: Medal, title: 'Champion', prize: 'Cash Prize + Trophy', color: '#FFD700', borderColor: '#C8A84E' },
  { icon: Award, title: 'Runner Up', prize: 'Cash Prize', color: '#C0C0C0', borderColor: '#C0C0C0' },
  { icon: Star, title: 'Third Place', prize: 'Cash Prize', color: '#CD7F32', borderColor: '#CD7F32' },
];

export default function PrizesSection() {
  return (
    <section id="prizes" className="py-24 md:py-32 px-6" style={{ background: 'linear-gradient(to bottom, var(--deep-black), var(--charcoal))' }}>
      <div className="max-w-[900px] mx-auto">
        <SectionHeader eyebrow="WHAT'S AT STAKE" title="Prizes & Rewards" />
        <div className="grid sm:grid-cols-3 gap-6">
          {prizes.map((prize, index) => (
            <Card key={prize.title} className="rounded-3xl p-8 md:p-10 text-center transition-all duration-300 group cursor-default relative overflow-hidden" style={{ background: 'var(--glass-fill)', border: '1px solid var(--glass-border)', borderTop: `3px solid ${prize.borderColor}` }} data-aos="fade-up" data-aos-delay={index * 200}>
              <CardContent className="p-0 relative z-10">
                <prize.icon className="w-16 h-16 mx-auto mb-6 transition-transform duration-300 group-hover:scale-110" style={{ color: prize.color }} />
                <h3 className="text-xl md:text-2xl font-bold mb-3" style={{ color: prize.color, fontFamily: "'Montserrat', sans-serif" }}>{prize.title}</h3>
                <p className="text-base" style={{ color: 'var(--white)' }}>{prize.prize}</p>
              </CardContent>
              {index === 0 && <div className="absolute inset-0 rounded-3xl pointer-events-none gold-shimmer opacity-20" />}
            </Card>
          ))}
        </div>
        <Card className="rounded-2xl p-8 mt-8 text-center" style={{ backgroundColor: 'rgba(27, 94, 32, 0.1)', border: '1px solid rgba(27, 94, 32, 0.3)' }} data-aos="fade-up" data-aos-delay="600">
          <CardContent className="p-0 flex flex-col items-center">
            <Gift className="w-10 h-10 mb-4" style={{ color: 'var(--brand-green)' }} />
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--brand-green)', fontFamily: "'Montserrat', sans-serif" }}>Special Bonus Winners</h3>
            <p className="text-sm max-w-lg" style={{ color: 'var(--muted-white)' }}>Additional prizes for bonus question winners throughout the tournament</p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
