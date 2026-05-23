type Props = {
  src: string;
  caption: string;
  oppositeSide?: 'left' | 'right';
};

export default function TimelinePhoto({ src, caption, oppositeSide }: Props) {
  // Если фото противоположное
  if (oppositeSide) {
    const isLeft = oppositeSide === 'left';
    return (
      <div
        className={`my-4 md:my-0 md:w-[45%] lg:w-[40%] flex-shrink-0 ${
          isLeft ? 'md:pr-6 md:self-start' : 'md:pl-6 md:self-start'
        }`}
      >
        <figure>
          <img
            src={src}
            alt={caption}
            className="w-full rounded border border-parchment-300 shadow-md object-contain"
            loading="lazy"
          />
          {caption && <figcaption className="text-parchment-600 text-xs md:text-sm mt-2 italic">{caption}</figcaption>}
        </figure>
      </div>
    );
  }

  // Обычное фото внутри карточки
  return (
    <figure className="my-4">
      <img
        src={src}
        alt={caption}
        className="w-full rounded border border-parchment-300 shadow-md object-contain"
        loading="lazy"
      />
      {caption && <figcaption className="text-parchment-600 text-xs md:text-sm mt-2 italic">{caption}</figcaption>}
    </figure>
  );
}