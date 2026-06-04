import { Users, Calendar, Globe, Trophy } from 'lucide-react';
import CountUp from 'react-countup';

const stats = [
  { icon: Users, value: 48, label: 'Teams' },
  { icon: Calendar, value: 104, label: 'Matches' },
  { icon: Globe, value: 3, label: 'Host Nations' },
  { icon: Trophy, value: 1, label: 'Champion' },
];

export default function StatsBar() {
  return (
    <section className="py-16 px-6" style={{ backgroundColor: 'var(--charcoal)', borderTop: '1px solid var(--glass-border)', borderBottom: '1px solid var(--glass-border)', background: 'linear-gradient(to right, var(--deep-black), var(--charcoal), var(--deep-black))' }}>
      <div className="max-w-[1000px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex flex-col items-center text-center" data-aos="fade-up" data-aos-delay={index * 100}>
            <stat.icon className="w-8 h-8 mb-3" style={{ color: 'var(--brand-green)' }} />
            <div className="text-4xl md:text-6xl font-bold tracking-tight" style={{ color: 'var(--gold)', fontFamily: "'Oswald', sans-serif" }}>
              <CountUp end={stat.value} duration={2} enableScrollSpy scrollSpyOnce />
            </div>
            <span className="mt-2 font-['Montserrat'] font-semibold text-xs uppercase tracking-[0.1em]" style={{ color: 'var(--muted-white)' }}>{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
