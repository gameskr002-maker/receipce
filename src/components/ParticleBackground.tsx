import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  alpha: number;
  alphaDir: number;
  hue: number; // 40-140 for gold-to-green spectrum
  blur: number;
}

const NUM_PARTICLES = 55;

export default function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef   = useRef<number>(0);
  const particles = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Spawn particles
    const spawn = (): Particle => {
      const hue = Math.random() > 0.65
        ? 40 + Math.random() * 25   // gold range 40–65
        : 100 + Math.random() * 40; // green range 100–140
      return {
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        radius: 1.5 + Math.random() * 3.5,
        alpha: 0.04 + Math.random() * 0.35,
        alphaDir: Math.random() > 0.5 ? 1 : -1,
        hue,
        blur: 2 + Math.random() * 8,
      };
    };

    particles.current = Array.from({ length: NUM_PARTICLES }, spawn);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles.current) {
        // Drift
        p.x += p.vx;
        p.y += p.vy;

        // Wrap
        if (p.x < -20) p.x = canvas.width  + 20;
        if (p.x > canvas.width  + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // Breathe alpha
        p.alpha += p.alphaDir * 0.003;
        if (p.alpha > 0.45) { p.alpha = 0.45; p.alphaDir = -1; }
        if (p.alpha < 0.04) { p.alpha = 0.04; p.alphaDir =  1; }

        // Draw with radial gradient (soft bloom)
        ctx.save();
        ctx.filter = `blur(${p.blur}px)`;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 65%, ${p.alpha})`);
        grad.addColorStop(1, `hsla(${p.hue}, 80%, 65%, 0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.restore();

        // Crisp core
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 90%, 75%, ${Math.min(p.alpha * 2.5, 0.85)})`;
        ctx.fill();
        ctx.restore();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="particle-canvas"
      aria-hidden="true"
    />
  );
}
