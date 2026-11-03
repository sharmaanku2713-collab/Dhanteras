import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  color: string;
  size: number;
  decay: number;
  gravity: number;
}

interface Rocket {
  x: number;
  y: number;
  targetY: number;
  speedY: number;
  color: string;
}

export const FireworksCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let isVisible = true;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: Particle[] = [];
    const rockets: Rocket[] = [];

    const palette = [
      '#FF8A00', // ASAI Orange
      '#FFD166', // Gold
      '#FF006E', // Festive Magenta
      '#00F5D4', // Radiant Cyan
      '#9D4EDD', // Royal Violet
      '#FFE29F', // Bright Gold
      '#E63946', // Vermillion Red
    ];

    const createExplosion = (x: number, y: number, color?: string) => {
      const chosenColor = color || palette[Math.floor(Math.random() * palette.length)];
      const count = window.innerWidth < 768 ? 32 : 55;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.2;
        const speed = Math.random() * 4.5 + 1.5;

        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1,
          color: Math.random() > 0.3 ? chosenColor : '#FFF8E7',
          size: Math.random() * 2 + 1.2,
          decay: Math.random() * 0.015 + 0.012,
          gravity: 0.06,
        });
      }
    };

    const launchRocket = (startX?: number, targetY?: number) => {
      const x = startX !== undefined ? startX : Math.random() * (canvas.width - 100) + 50;
      const tY = targetY !== undefined ? targetY : Math.random() * (canvas.height * 0.45) + 60;
      const color = palette[Math.floor(Math.random() * palette.length)];

      rockets.push({
        x,
        y: canvas.height,
        targetY: tY,
        speedY: -(Math.random() * 3 + 8),
        color,
      });
    };

    // Auto-launch rockets periodically
    let lastLaunch = 0;
    const launchInterval = window.innerWidth < 768 ? 1600 : 1200;

    // Click/Touch to explode or launch
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      createExplosion(clientX, clientY);
    };

    window.addEventListener('click', handlePointerDown);

    const render = (timestamp: number) => {
      if (!isVisible) return;

      // Subtle dark trail fade
      ctx.fillStyle = 'rgba(7, 9, 13, 0.25)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      if (timestamp - lastLaunch > launchInterval) {
        launchRocket();
        lastLaunch = timestamp;
      }

      // Update rockets
      for (let i = rockets.length - 1; i >= 0; i--) {
        const r = rockets[i];
        r.y += r.speedY;

        // Draw rocket spark
        ctx.save();
        ctx.beginPath();
        ctx.arc(r.x, r.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = r.color;
        ctx.shadowColor = r.color;
        ctx.shadowBlur = 10;
        ctx.fill();

        // Rocket smoke/spark tail
        ctx.beginPath();
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x + (Math.random() - 0.5) * 2, r.y + 12);
        ctx.strokeStyle = '#FFD166';
        ctx.lineWidth = 1.5;
        ctx.stroke();
        ctx.restore();

        if (r.y <= r.targetY) {
          createExplosion(r.x, r.y, r.color);
          rockets.splice(i, 1);
        }
      }

      // Update particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animId = requestAnimationFrame(render);
    };

    const handleVisibility = () => {
      isVisible = !document.hidden;
      if (isVisible) animId = requestAnimationFrame(render);
    };

    document.addEventListener('visibilitychange', handleVisibility);
    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('click', handlePointerDown);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
    />
  );
};
