import React, { useEffect, useRef } from 'react';

interface Coin {
  x: number;
  y: number;
  radius: number;
  speedY: number;
  speedX: number;
  rotation: number;
  rotSpeed: number;
  scaleX: number;
  alpha: number;
  symbol: string;
}

export const CoinShowerCanvas: React.FC = () => {
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

    const isMobile = window.innerWidth < 768;
    const coinCount = isMobile ? 16 : 28;
    const coins: Coin[] = [];

    const symbols = ['₹', '卐', '✨', '🪙'];

    for (let i = 0; i < coinCount; i++) {
      coins.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        radius: Math.random() * 8 + 12,
        speedY: Math.random() * 1.5 + 0.8,
        speedX: (Math.random() - 0.5) * 0.8,
        rotation: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.05,
        scaleX: Math.cos(Math.random() * Math.PI),
        alpha: Math.random() * 0.4 + 0.6,
        symbol: symbols[Math.floor(Math.random() * symbols.length)],
      });
    }

    // Add extra coins on touch/click
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      for (let i = 0; i < 6; i++) {
        coins.push({
          x: clientX + (Math.random() - 0.5) * 40,
          y: clientY + (Math.random() - 0.5) * 40,
          radius: Math.random() * 7 + 11,
          speedY: -(Math.random() * 3 + 1), // initial upward pop
          speedX: (Math.random() - 0.5) * 4,
          rotation: Math.random() * Math.PI * 2,
          rotSpeed: (Math.random() - 0.5) * 0.1,
          scaleX: 1,
          alpha: 1,
          symbol: symbols[Math.floor(Math.random() * symbols.length)],
        });
      }
      if (coins.length > 55) {
        coins.splice(0, coins.length - 55);
      }
    };

    window.addEventListener('click', handlePointerDown);

    const render = () => {
      if (!isVisible) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < coins.length; i++) {
        const c = coins[i];

        c.y += c.speedY;
        c.x += c.speedX;
        c.rotation += c.rotSpeed;
        c.scaleX = Math.cos(c.rotation);

        // Gravity pull for popped coins
        if (c.speedY < 1.6) {
          c.speedY += 0.08;
        }

        // Reset if fell below bottom
        if (c.y > canvas.height + 40) {
          c.y = -30;
          c.x = Math.random() * canvas.width;
          c.speedY = Math.random() * 1.5 + 0.8;
          c.speedX = (Math.random() - 0.5) * 0.8;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(c.scaleX, 1);
        ctx.globalAlpha = c.alpha;

        // Outer Gold Rim
        ctx.beginPath();
        ctx.arc(0, 0, c.radius, 0, Math.PI * 2);
        const rimGrad = ctx.createLinearGradient(-c.radius, -c.radius, c.radius, c.radius);
        rimGrad.addColorStop(0, '#FFF275');
        rimGrad.addColorStop(0.5, '#FF8A00');
        rimGrad.addColorStop(1, '#D97706');
        ctx.fillStyle = rimGrad;
        ctx.shadowColor = '#FFD166';
        ctx.shadowBlur = 8;
        ctx.fill();

        // Inner Face
        ctx.beginPath();
        ctx.arc(0, 0, c.radius * 0.82, 0, Math.PI * 2);
        const faceGrad = ctx.createRadialGradient(0, 0, 1, 0, 0, c.radius);
        faceGrad.addColorStop(0, '#FFE873');
        faceGrad.addColorStop(1, '#E67E22');
        ctx.fillStyle = faceGrad;
        ctx.fill();

        // Center Symbol (Rupee or Swastika or sparkle)
        if (Math.abs(c.scaleX) > 0.35) {
          ctx.fillStyle = '#6B2D02';
          ctx.font = `bold ${Math.floor(c.radius * 0.9)}px serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillText(c.symbol, 0, 1);
        }

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
