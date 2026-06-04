import { MessageCircle, Send, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import SectionHeader from '../components/SectionHeader';

const contacts = [
  { icon: MessageCircle, label: 'WhatsApp', value: '+966-XX-XXX-XXXX', color: '#25D366' },
  { icon: Send, label: 'Telegram', value: '@icad_fifa2026', color: '#0088CC' },
  { icon: Mail, label: 'Email', value: 'fifa2026@icad.com', color: 'var(--gold)' },
];

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6" style={{ background: 'linear-gradient(to bottom, var(--charcoal), var(--deep-black))', borderTop: '1px solid var(--glass-border)' }}>
      <div className="max-w-[600px] mx-auto">
        <SectionHeader eyebrow="GET IN TOUCH" title="Contact the Committee" />
        <Card className="rounded-3xl" style={{ background: 'var(--glass-fill)', border: '1px solid var(--glass-border)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }} data-aos="zoom-in" data-aos-duration="500">
          <CardContent className="p-8 md:p-12">
            <h3 className="text-xl md:text-2xl font-bold text-center mb-8" style={{ color: 'var(--white)', fontFamily: "'Montserrat', sans-serif" }}>ICAD FIFA 2026 Prediction Committee</h3>
            <div className="flex flex-col gap-5">
              {contacts.map((contact) => (
                <div key={contact.label} className="flex items-center gap-4 p-4 rounded-xl" style={{ backgroundColor: 'rgba(26, 26, 26, 0.4)' }}>
                  <contact.icon className="w-6 h-6 flex-shrink-0" style={{ color: contact.color }} />
                  <div>
                    <p className="text-xs uppercase tracking-wider font-semibold" style={{ color: 'var(--muted-white)' }}>{contact.label}</p>
                    <p className="text-base" style={{ color: 'var(--football-white)' }}>{contact.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
