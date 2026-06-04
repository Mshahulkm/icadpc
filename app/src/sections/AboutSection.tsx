export default function AboutSection() {
  return (
    <section className="py-24 md:py-32 px-6" style={{ backgroundColor: 'var(--deep-black)' }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="grid md:grid-cols-5 gap-12 items-center">
          <div className="md:col-span-3" data-aos="fade-right">
            <p className="section-eyebrow mb-3">ABOUT THE CONTEST</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6" style={{ color: 'var(--white)', fontFamily: "'Oswald', sans-serif" }}>
              Bring Your Football Knowledge to the Ultimate Test
            </h2>
            <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted-white)' }}>
              The ICAD FIFA World Cup 2026 Prediction Contest brings together football enthusiasts
              from ICAD &amp; MBL Group to predict match outcomes throughout the FIFA World Cup 2026
              tournament. Participants earn points through accurate predictions and compete for
              exciting prizes while enjoying the world&apos;s biggest football event.
            </p>
            <button onClick={() => document.getElementById('rules')?.scrollIntoView({ behavior: 'smooth' })} className="inline-flex items-center gap-2 font-['Montserrat'] font-semibold text-sm transition-all duration-200 hover:underline" style={{ color: 'var(--gold)' }}>
              Learn the Rules <span className="text-lg">&rarr;</span>
            </button>
          </div>
          <div className="md:col-span-2 flex justify-center md:justify-end" data-aos="fade-left" data-aos-delay="300">
            <div className="relative w-48 h-48 md:w-64 md:h-64 slow-rotate opacity-20">
              <svg viewBox="0 0 200 200" className="w-full h-full">
                <circle cx="100" cy="100" r="95" fill="none" stroke="#C8A84E" strokeWidth="1.5" />
                <polygon points="100,35 130,75 115,115 85,115 70,75" fill="none" stroke="#C8A84E" strokeWidth="1" />
                <polygon points="100,5 115,20 115,35 100,35 85,35 85,20" fill="none" stroke="#C8A84E" strokeWidth="0.8" />
                <polygon points="155,50 170,65 165,80 150,75 145,60 150,45" fill="none" stroke="#C8A84E" strokeWidth="0.8" />
                <polygon points="155,130 170,145 165,160 150,155 145,140 150,125" fill="none" stroke="#C8A84E" strokeWidth="0.8" />
                <polygon points="100,165 115,180 115,195 100,195 85,195 85,180" fill="none" stroke="#C8A84E" strokeWidth="0.8" />
                <polygon points="45,130 60,145 55,160 40,155 35,140 40,125" fill="none" stroke="#C8A84E" strokeWidth="0.8" />
                <polygon points="45,50 60,65 55,80 40,75 35,60 40,45" fill="none" stroke="#C8A84E" strokeWidth="0.8" />
                <line x1="100" y1="35" x2="100" y2="5" stroke="#C8A84E" strokeWidth="0.5" />
                <line x1="130" y1="75" x2="155" y2="50" stroke="#C8A84E" strokeWidth="0.5" />
                <line x1="115" y1="115" x2="155" y2="130" stroke="#C8A84E" strokeWidth="0.5" />
                <line x1="85" y1="115" x2="100" y2="165" stroke="#C8A84E" strokeWidth="0.5" />
                <line x1="70" y1="75" x2="45" y2="130" stroke="#C8A84E" strokeWidth="0.5" />
                <line x1="70" y1="75" x2="45" y2="50" stroke="#C8A84E" strokeWidth="0.5" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
