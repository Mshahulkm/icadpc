interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  titleClassName?: string;
}

export default function SectionHeader({ eyebrow, title, subtitle, align = 'center', titleClassName = '' }: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`} data-aos="fade-up">
      <p className="section-eyebrow mb-3">{eyebrow}</p>
      <h2 className={`text-3xl md:text-5xl font-bold tracking-tight ${titleClassName}`} style={{ color: 'var(--white)' }}>{title}</h2>
      {subtitle && <p className="mt-4 text-base md:text-lg max-w-2xl mx-auto" style={{ color: 'var(--muted-white)' }}>{subtitle}</p>}
    </div>
  );
}
