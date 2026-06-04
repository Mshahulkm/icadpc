import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const TARGET_DATE = new Date('2026-06-11T00:00:00Z').getTime();

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function calculateTimeLeft(): TimeLeft {
  const diff = TARGET_DATE - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountdownUnit({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <Card className="rounded-2xl min-w-[100px] md:min-w-[140px]" style={{ backgroundColor: 'var(--charcoal)', border: '1px solid var(--glass-border)' }} data-aos="fade-up" data-aos-delay={delay}>
      <CardContent className="p-6 md:p-8 text-center">
        <div className="text-4xl md:text-6xl lg:text-7xl font-bold tabular-nums" style={{ color: 'var(--gold)', fontFamily: "'Oswald', sans-serif" }}>
          {String(value).padStart(2, '0')}
        </div>
        <div className="mt-2 font-['Montserrat'] font-semibold text-xs uppercase tracking-[0.1em]" style={{ color: 'var(--muted-white)' }}>{label}</div>
      </CardContent>
    </Card>
  );
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calculateTimeLeft()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-16 md:py-20 px-6" style={{ backgroundColor: 'var(--deep-black)', borderBottom: '1px solid var(--glass-border)' }}>
      <div className="max-w-[800px] mx-auto text-center">
        <p className="section-eyebrow mb-3" data-aos="fade-up">COUNTDOWN TO KICKOFF</p>
        <h2 className="text-xl md:text-2xl font-bold mb-10" style={{ color: 'var(--white)', fontFamily: "'Oswald', sans-serif" }} data-aos="fade-up" data-aos-delay="100">
          FIFA World Cup 2026 Opening Match
        </h2>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <CountdownUnit value={timeLeft.days} label="Days" delay={0} />
          <CountdownUnit value={timeLeft.hours} label="Hours" delay={100} />
          <CountdownUnit value={timeLeft.minutes} label="Minutes" delay={200} />
          <CountdownUnit value={timeLeft.seconds} label="Seconds" delay={300} />
        </div>
      </div>
    </section>
  );
}
