import React, { useEffect, useRef } from 'react';

interface FestiveParticlesProps {
  particleType?: 'gold' | 'sparkle' | 'mixed';
  density?: 'low' | 'medium' | 'high';
}

export const FestiveParticles: React.FC<FestiveParticlesProps> = ({
  particleType = 'mixed',
  density = 'medium',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let isVisible = true;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const baseCount = density === 'low' ? 18 : density === 'medium' ? (isMobile ? 24 : 45) : (isMobile ? 35 : 70);

    const particles: Array<{
      x: number;
      y: number;
      radius: number;
      color: string;
      speedY: number;
      speedX: number;
      alpha: number;
      maxAlpha: number;
      alphaStep: number;
      isSparkle: boolean;
    }> = [];

    const colors =
      particleType === 'gold'
        ? ['#FFD166', '#FFE29F', '#FF8A00', '#F39C12']
        : ['#FFD166', '#FF8A00', '#FF6A00', '#FFE29F', '#FF4D6D', '#48CAE4'];

    for (let i = 0; i < baseCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 0.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        speedY: -(Math.random() * 0.45 + 0.15), // gently float upward
        speedX: (Math.random() - 0.5) * 0.35,
        alpha: Math.random() * 0.7 + 0.2,
        maxAlpha: Math.random() * 0.6 + 0.3,
        alphaStep: (Math.random() * 0.015 + 0.005) * (Math.random() > 0.5 ? 1 : -1),
        isSparkle: Math.random() > 0.6,
      });
    }

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.speedX;
        p.y += p.speedY;
        p.alpha += p.alphaStep;

        if (p.alpha > p.maxAlpha || p.alpha < 0.1) {
          p.alphaStep = -p.alphaStep;
        }

        // Wrap around screen
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }
        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, p.alpha));
        ctx.fillStyle = p.color;
        ctx.shadowColor = p.color;
        ctx.shadowBlur = p.isSparkle ? 10 : 4;

        if (p.isSparkle) {
          // 4-point golden star
          const r = p.radius * 1.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y - r);
          ctx.lineTo(p.x + r * 0.3, p.y - r * 0.3);
          ctx.lineTo(p.x + r, p.y);
          ctx.lineTo(p.x + r * 0.3, p.y + r * 0.3);
          ctx.lineTo(p.x, p.y + r);
          ctx.lineTo(p.x - r * 0.3, p.y + r * 0.3);
          ctx.lineTo(p.x - r, p.y);
          ctx.lineTo(p.x - r * 0.3, p.y - r * 0.3);
          ctx.closePath();
          ctx.fill();
        } else {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    const handleVisibilityChange = () => {
      isVisible = !document.hidden;
      if (isVisible) {
        animationFrameId = requestAnimationFrame(render);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [particleType, density]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10 w-full h-full"
      style={{ opacity: 0.85 }}
    />
  );
};
