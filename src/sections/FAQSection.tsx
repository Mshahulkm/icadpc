import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import SectionHeader from '../components/SectionHeader';

const faqs = [
  { question: 'Who can participate?', answer: 'ICAD Employees, MBL Employees, and Ex-Employees of both groups are eligible to participate.' },
  { question: 'What is the entry fee?', answer: 'The entry fee is 15 Saudi Riyals per participant. This must be paid before registration is confirmed.' },
  { question: 'How are points calculated?', answer: 'Each matchday prediction is worth 3 points. Bonus questions are worth 5 points. The participant with the most points at the end of the tournament wins.' },
  { question: 'Can I submit multiple predictions?', answer: 'No. Each member can submit only one prediction. Multiple entries will be disqualified.' },
  { question: 'When is the leaderboard updated?', answer: 'The leaderboard is updated after each matchday. Points are calculated and published in the prediction group.' },
];

export default function FAQSection() {
  return (
    <section id="faq" className="py-24 md:py-32 px-6" style={{ backgroundColor: 'var(--deep-black)' }}>
      <div className="max-w-[800px] mx-auto">
        <SectionHeader eyebrow="QUESTIONS?" title="Frequently Asked Questions" />
        <Accordion type="single" collapsible>
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-b" style={{ borderColor: 'var(--glass-border)' }} data-aos="fade-up" data-aos-delay={index * 80}>
              <AccordionTrigger className="py-6 hover:no-underline text-left">
                <span className="text-base md:text-lg font-semibold" style={{ color: 'var(--white)', fontFamily: "'Montserrat', sans-serif" }}>{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="pb-6">
                <p className="text-base leading-relaxed" style={{ color: 'var(--muted-white)' }}>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
