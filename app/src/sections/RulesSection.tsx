import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const rules = [
  'മത്സരത്തിൽ പങ്കെടുക്കുന്ന വ്യക്തി Prediction Groupൽ അംഗമായിരിക്കണം.',
  'പങ്കെടുക്കുന്നതിന് 15 SR എൻട്രി ഫീ ഉണ്ടായിരിക്കുന്നതാണ്.',
  'ICAD & MBL ഗ്രൂപ്പിലെ എല്ലാ കമ്പനി എംപ്ലോയീസിനും EX-എംപ്ലോയീസിനും പങ്കെടുക്കാം.',
  'നിയമാവലികൾ കൃത്യമായി പാലിക്കണം.',
  'ടൂർണമെൻറ് അവസാനം വരെ എല്ലാ പ്രവചനങ്ങളും നൽകണം.',
  'ഓരോ അംഗത്തിനും ഒരു പ്രവചനം മാത്രം.',
  'ഒന്നിലധികം എൻട്രികൾ അസാധുവാക്കും.',
  'ചോദ്യങ്ങൾ ഗ്രൂപ്പിൽ നൽകുന്ന ലിങ്ക് വഴി സമർപ്പിക്കണം.',
  'മത്സരദിന പ്രവചനങ്ങളും ബോണസ് ചോദ്യങ്ങളും ഉണ്ടായിരിക്കും.',
  'മത്സരത്തിന് 2 മണിക്കൂർ മുമ്പ് പ്രവചനം സമർപ്പിക്കണം.',
  '3 പോയിന്റ് ചോദ്യങ്ങളും 5 പോയിന്റ് ബോണസ് ചോദ്യങ്ങളും ഉണ്ടായിരിക്കും.',
  'വ്യത്യസ്ത പ്രവചന ചോദ്യങ്ങൾ ടൂർണമെൻറ് മുഴുവൻ ഉണ്ടായിരിക്കും.',
  'ഓരോ മത്സരദിനത്തിനും ശേഷം പോയിന്റ് പട്ടിക പ്രസിദ്ധീകരിക്കും.',
  'കൂടുതൽ പോയിന്റ് നേടുന്നവർക്ക് ആകർഷക സമ്മാനങ്ങൾ ലഭിക്കും.',
];

export default function RulesSection() {
  return (
    <section id="rules" className="py-24 md:py-32 px-6 hex-pattern" style={{ backgroundColor: 'var(--deep-black)' }}>
      <div className="max-w-[900px] mx-auto">
        <div className="text-center mb-12" data-aos="fade-up">
          <p className="section-eyebrow mb-3">CONTEST RULES</p>
          <h2 className="font-malayalam text-2xl md:text-3xl font-bold tracking-tight mb-3" style={{ color: 'var(--white)' }} lang="ml">
            ഫിഫാ വേൾഡ്‌ കപ്പ് മെഗാ പ്രവചന മത്സരം 2026
          </h2>
          <p className="font-malayalam text-base md:text-lg" style={{ color: 'var(--gold)' }} lang="ml">
            നിബന്ധനകൾ / മത്സരിക്കേണ്ട രീതി
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {rules.map((rule, index) => (
            <AccordionItem key={index} value={`rule-${index}`} className="rounded-xl border overflow-hidden" style={{ borderColor: 'var(--glass-border)', backgroundColor: 'var(--charcoal)' }} data-aos="fade-up" data-aos-delay={index * 80}>
              <AccordionTrigger className="px-5 py-4 hover:no-underline group">
                <div className="flex items-center gap-4 text-left">
                  <span className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-['Montserrat'] font-bold text-sm" style={{ backgroundColor: 'var(--brand-green)', color: 'var(--white)' }}>
                    {index + 1}
                  </span>
                  <span className="font-malayalam text-base md:text-lg font-bold" style={{ color: 'var(--white)' }} lang="ml">
                    {rule.length > 60 ? rule.substring(0, 60) + '...' : rule}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-5 pt-0" style={{ paddingLeft: '68px' }}>
                <p className="font-malayalam text-base leading-relaxed" style={{ color: 'var(--football-white)' }} lang="ml">{rule}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
