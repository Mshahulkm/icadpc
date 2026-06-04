import { useState } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useActiveSection } from '../hooks/useActiveSection';
import ConfettiButton from '../components/ConfettiButton';

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'rules', label: 'Rules' },
  { id: 'leaderboard', label: 'Leaderboard' },
  { id: 'prizes', label: 'Prizes' },
  { id: 'winners', label: 'Winners' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const activeSection = useActiveSection();

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[1000] h-[72px] flex items-center justify-between px-4 md:px-6" style={{ backgroundColor: 'rgba(10, 10, 10, 0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(200, 168, 78, 0.1)' }}>
        <a href="#home" onClick={() => handleNavClick('home')} className="flex items-center">
          <img src="/assets/icad-logo.jpg" alt="ICAD Logo" className="h-10 w-auto object-contain" />
        </a>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => handleNavClick(link.id)} className={`nav-link font-['Montserrat'] font-semibold text-xs uppercase tracking-[0.1em] transition-colors duration-200 ${activeSection === link.id ? 'text-[#C8A84E] active' : 'text-[#E8E8E0] hover:text-[#C8A84E]'}`}>
              {link.label}
            </button>
          ))}
        </div>

        <div className="hidden lg:flex items-center gap-3">
          <button onClick={toggleTheme} className="p-2 rounded-lg transition-colors duration-200 hover:bg-[rgba(200,168,78,0.1)]" aria-label="Toggle theme">
            {theme === 'dark' ? <Sun className="w-5 h-5 text-[#C8A84E]" /> : <Moon className="w-5 h-5 text-[#C8A84E]" />}
          </button>
          <ConfettiButton href="https://strawpoll.com/jVyG2aRKzZ7" variant="primary" className="!py-3 !px-7 !text-xs">Register Now</ConfettiButton>
        </div>

        <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          {mobileOpen ? <X className="w-6 h-6 text-[#C8A84E]" /> : <Menu className="w-6 h-6 text-[#C8A84E]" />}
        </button>
      </nav>

      {mobileOpen && <div className="fixed inset-0 z-[999] bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />}

      <div className={`fixed top-[72px] right-0 bottom-0 w-[280px] z-[1001] transition-transform duration-300 ease-out lg:hidden ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}`} style={{ backgroundColor: 'var(--charcoal)' }}>
        <div className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <button key={link.id} onClick={() => handleNavClick(link.id)} className={`text-left font-['Montserrat'] font-semibold text-sm transition-colors duration-200 ${activeSection === link.id ? 'text-[#C8A84E]' : 'text-[#E8E8E0] hover:text-[#C8A84E]'}`}>
              {link.label}
            </button>
          ))}
          <div className="border-t pt-4 mt-2" style={{ borderColor: 'rgba(200,168,78,0.15)' }}>
            <button onClick={toggleTheme} className="flex items-center gap-2 text-[#E8E8E0] hover:text-[#C8A84E] transition-colors mb-4">
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              <span className="text-sm font-['Montserrat']">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </button>
            <ConfettiButton href="https://strawpoll.com/jVyG2aRKzZ7" variant="primary" fullWidth className="!py-3">Register Now</ConfettiButton>
          </div>
        </div>
      </div>
    </>
  );
}
