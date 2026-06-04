import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { ThemeProvider } from './context/ThemeContext';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import CountdownSection from './sections/CountdownSection';
import StatsBar from './sections/StatsBar';
import AboutSection from './sections/AboutSection';
import RegistrationSection from './sections/RegistrationSection';
import RulesSection from './sections/RulesSection';
import NewsSection from './sections/NewsSection';
import AnnouncementsSection from './sections/AnnouncementsSection';
import LeaderboardSection from './sections/LeaderboardSection';
import WinnersSection from './sections/WinnersSection';
import PrizesSection from './sections/PrizesSection';
import FAQSection from './sections/FAQSection';
import ContactSection from './sections/ContactSection';
import Footer from './sections/Footer';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      offset: 100,
      easing: 'ease-out-cubic',
    });
  }, []);

  return (
    <ThemeProvider>
      <ScrollProgress />
      <Navbar />
      <main>
        <HeroSection />
        <CountdownSection />
        <StatsBar />
        <AboutSection />
        <RegistrationSection />
        <RulesSection />
        <NewsSection />
        <AnnouncementsSection />
        <LeaderboardSection />
        <WinnersSection />
        <PrizesSection />
        <FAQSection />
        <ContactSection />
      </main>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
