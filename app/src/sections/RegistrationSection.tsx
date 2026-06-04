import { CheckCircle } from 'lucide-react';
import ConfettiButton from '../components/ConfettiButton';
import { Badge } from '@/components/ui/badge';

const eligibilityItems = ['ICAD Employees', 'MBL Employees', 'Ex-Employees'];

export default function RegistrationSection() {
  return (
    <section id="register" className="py-24 md:py-32 px-6" style={{ background: 'linear-gradient(to bottom, var(--charcoal), var(--deep-black))' }}>
      <div className="max-w-[700px] mx-auto" data-aos="zoom-in" data-aos-duration="600">
        <div className="rounded-3xl p-8 md:p-12 lg:p-16" style={{ background: 'var(--glass-fill)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)' }}>
          <p className="section-eyebrow mb-3 text-center">JOIN THE COMPETITION</p>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-center mb-6" style={{ color: 'var(--white)', fontFamily: "'Oswald', sans-serif" }}>Register Now</h2>
          <div className="flex justify-center mb-8">
            <Badge className="px-5 py-2 text-sm font-semibold rounded-full" style={{ backgroundColor: 'var(--brand-green)', color: 'var(--white)' }}>Entry Fee: 15 Saudi Riyals</Badge>
          </div>
          <div className="flex flex-col gap-3 mb-8 max-w-xs mx-auto">
            {eligibilityItems.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 flex-shrink-0" style={{ color: 'var(--brand-green)' }} />
                <span style={{ color: 'var(--football-white)' }}>{item}</span>
              </div>
            ))}
          </div>
          <ConfettiButton href="https://strawpoll.com/jVyG2aRKzZ7" variant="primary" fullWidth className="!py-5 !text-base">Register on Strawpoll</ConfettiButton>
          <p className="text-center mt-6 text-sm italic" style={{ color: 'var(--muted-white)' }}>Registration closes before tournament starts</p>
        </div>
      </div>
    </section>
  );
}
