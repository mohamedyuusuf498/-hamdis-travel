interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  light?: boolean;
}

export default function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  light = false,
}: SectionHeaderProps) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {badge && (
        <span className={`inline-block text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-4 ${
          light
            ? 'bg-white/20 text-white'
            : 'bg-blue-50 text-blue-600'
        }`}>
          {badge}
        </span>
      )}
      <h2 className={`section-title mb-4 ${light ? 'text-white' : ''}`}>
        {title}
      </h2>
      {subtitle && (
        <p className={`section-subtitle ${centered ? 'mx-auto' : ''} ${light ? 'text-white/70' : ''}`}>
          {subtitle}
        </p>
      )}
      <div className={`divider ${centered ? '' : 'mx-0'} mt-4`} />
    </div>
  );
}
