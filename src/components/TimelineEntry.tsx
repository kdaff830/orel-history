import type { ReactNode } from 'react';
import FadeIn from './FadeIn';

type Props = {
  date: string;
  children: ReactNode;
  side?: 'left' | 'right';
};

export default function TimelineEntry({ date, children, side = 'right' }: Props) {
  const isRight = side === 'right';

  return (
    <FadeIn>
      <div className="relative flex flex-col md:flex-row md:items-start mb-16 md:mb-24">
        {/* Timeline dot */}
        <div className="timeline-dot" />

        {/* Контентная карточка — увеличенная ширина */}
        <div className={`ml-14 md:ml-0 md:w-2/3 ${isRight ? 'md:ml-auto' : ''}`}>
          <div className="paper-card p-5 md:p-8">
            <span className="inline-block font-heading text-blood-500 text-lg md:text-2xl font-semibold tracking-wide mb-3">
              {date}
            </span>
            <div className="space-y-4 text-parchment-900 text-sm md:text-base leading-relaxed font-body">
              {children}
            </div>
          </div>
        </div>
      </div>
    </FadeIn>
  );
}