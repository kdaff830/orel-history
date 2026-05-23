import { useEffect, useRef, useCallback } from 'react';

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
};

const COLORS = ['#8b0000', '#a01020', '#c02030', '#d44050', '#c8a415', '#dab830', '#e8cc55', '#5a0011'];

export function useFireworks() {
  const triggered = useRef(false);
  const animating = useRef(false);
  const particles = useRef<Particle[]>([]);
  const raf = useRef<number>(0);

  const burst = useCallback(() => {
    if (animating.current) return;
    animating.current = true;

    const canvas = document.getElementById('fireworks-canvas') as HTMLCanvasElement;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const createBurst = (cx: number, cy: number) => {
      const count = 60 + Math.floor(Math.random() * 40);
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        particles.current.push({
          x: cx,
          y: cy,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 40 + Math.random() * 40,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          size: 1.5 + Math.random() * 2,
        });
      }
    };

    const w = canvas.width;
    const h = canvas.height;

    // Create 5 staggered bursts
    const bursts = [
      { x: w * 0.3, y: h * 0.25, delay: 0 },
      { x: w * 0.7, y: h * 0.3, delay: 300 },
      { x: w * 0.5, y: h * 0.2, delay: 600 },
      { x: w * 0.2, y: h * 0.35, delay: 900 },
      { x: w * 0.8, y: h * 0.25, delay: 1200 },
    ];

    bursts.forEach((b) => {
      setTimeout(() => createBurst(b.x, b.y), b.delay);
    });

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      particles.current = particles.current.filter((p) => {
        p.life++;
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04; // gravity
        p.vx *= 0.99;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) return false;

        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * alpha, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        return true;
      });

      if (particles.current.length > 0) {
        raf.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, w, h);
        animating.current = false;
      }
    };

    raf.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    const target = document.getElementById('salute-trigger');
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered.current) {
          triggered.current = true;
          burst();
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(target);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, [burst]);
}
