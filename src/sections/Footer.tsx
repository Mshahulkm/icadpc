import { MessageCircle, Send, Mail } from 'lucide-react';
import { useVisitorCount } from '../hooks/useVisitorCount';

const quickLinks = [
  { id: 'home', label: 'Home' },
  { id: 'rules', label: 'Rules' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'faq', label: 'FAQ' },
];

const socialLinks = [
  { icon: MessageCircle, label: 'WhatsApp', href: '#' },
  { icon: Send, label: 'Telegram', href: '#' },
  { icon: Mail, label: 'Email', href: '#' },
];

export default function Footer() {
  const visitorCount = useVisitorCount();

  const handleLinkClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer style={{ backgroundColor: 'var(--charcoal)', borderTop: '1px solid var(--glass-border)' }}>
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-6">
        <div className="grid md:grid-cols-3 gap-10 mb-10" data-aos="fade-up">
          <div>
            <img src="/assets/icad-logo.jpg" alt="ICAD Logo" className="h-9 w-auto object-contain mb-4" />
            <p className="text-sm mb-1" style={{ color: 'var(--muted-white)' }}>ICAD FIFA World Cup 2026 Prediction Contest</p>
            <p className="text-sm" style={{ color: 'var(--muted-white)' }}>Designed for ICAD &amp; MBL Community</p>
            <p className="text-xs mt-3" style={{ color: 'var(--muted-white)' }}>Visitors: <span style={{ color: 'var(--gold)' }}>{visitorCount.toLocaleString()}</span></p>
          </div>
          <div>
            <h4 className="font-['Montserrat'] font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--white)' }}>Quick Links</h4>
            <div className="flex flex-col gap-2">
              {quickLinks.map((link) => (
                <button key={link.id} onClick={() => handleLinkClick(link.id)} className="text-left text-sm transition-colors duration-200 hover:text-[#C8A84E]" style={{ color: 'var(--football-white)' }}>{link.label}</button>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-['Montserrat'] font-semibold text-sm uppercase tracking-wider mb-4" style={{ color: 'var(--white)' }}>Follow Us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110" style={{ border: '1px solid var(--glass-border)' }}
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--brand-green)'; e.currentTarget.style.borderColor = 'var(--brand-green)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.borderColor = 'var(--glass-border)'; }}>
                  <social.icon className="w-5 h-5" style={{ color: 'var(--muted-white)' }} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="pt-6 text-center" style={{ borderTop: '1px solid var(--glass-border)' }}>
          <p className="text-xs" style={{ color: 'var(--muted-white)' }}>&copy; 2026 ICAD FIFA Prediction Contest. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
