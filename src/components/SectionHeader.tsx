type Props = {
  title: string;
  subtitle?: string;
  accent?: 'blood' | 'victory';
};

const accentMap = {
  blood: 'text-blood-500',
  victory: 'text-victory-500',
};

const lineMap = {
  blood: 'bg-blood-400/30',
  victory: 'bg-victory-400/30',
};

const dotMap = {
  blood: 'bg-blood-500',
  victory: 'bg-victory-500',
};

export default function SectionHeader({ title, subtitle, accent = 'blood' }: Props) {
  return (
    <div className="section-divider">
      <div className="flex items-center justify-center gap-4 mb-4">
        <span className={`block h-px w-16 md:w-24 ${lineMap[accent]}`} />
        <span className={`block w-2 h-2 rotate-45 ${dotMap[accent]}`} />
        <span className={`block h-px w-16 md:w-24 ${lineMap[accent]}`} />
      </div>
      <h2 className={`section-title ${accentMap[accent]}`}>{title}</h2>
      {subtitle && (
        <p className="mt-3 text-parchment-600 text-sm md:text-base font-body tracking-wide">
          {subtitle}
        </p>
      )}
    </div>
  );
}
