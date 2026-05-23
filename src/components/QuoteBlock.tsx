type Props = {
  text: string;
  author?: string;
};

export default function QuoteBlock({ text, author }: Props) {
  return (
    <blockquote className="quote-block">
      {/* СЮДА ЦИТАТУ */}
      <p>&laquo;{text}&raquo;</p>
      {author && (
        <footer className="mt-2 text-parchment-600 not-italic text-sm">
          &mdash; {author}
        </footer>
      )}
    </blockquote>
  );
}
