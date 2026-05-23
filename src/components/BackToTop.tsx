import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full bg-parchment-200 hover:bg-blood-500 border border-parchment-300 hover:border-blood-400 text-parchment-700 hover:text-parchment-50 flex items-center justify-center transition-all duration-300 shadow-lg"
      aria-label="Наверх"
    >
      <ArrowUp size={20} />
    </button>
  );
}
