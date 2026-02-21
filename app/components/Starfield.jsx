"use client";

import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const points = [];
    const POINTS = 90; // subtle, not noisy
    const MAX_LINK = 140; // link distance
    const SPEED = 0.10; // drift speed

    function resize() {
      const { innerWidth, innerHeight } = window;
      w = innerWidth;
      h = innerHeight;
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function rnd(min, max) {
      return min + Math.random() * (max - min);
    }

    function init() {
      points.length = 0;
      for (let i = 0; i < POINTS; i++) {
        points.push({
          x: rnd(0, w),
          y: rnd(0, h),
          vx: rnd(-SPEED, SPEED),
          vy: rnd(-SPEED, SPEED),
          r: rnd(0.6, 1.6),
          a: rnd(0.25, 0.85),
        });
      }
    }

    // occasional shooting line (very subtle)
    let shootT = 0;
    let shoot = null;

    function spawnShoot() {
      if (Math.random() > 0.015) return;
      const fromLeft = Math.random() > 0.5;
      shoot = {
        x: fromLeft ? -80 : w + 80,
        y: rnd(40, h * 0.55),
        vx: fromLeft ? rnd(6, 9) : rnd(-9, -6),
        vy: rnd(0.2, 0.7),
        life: 0,
        max: rnd(40, 55),
      };
    }

    function step() {
      ctx.clearRect(0, 0, w, h);

      // points
      for (const p of points) {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -20) p.x = w + 20;
        if (p.x > w + 20) p.x = -20;
        if (p.y < -20) p.y = h + 20;
        if (p.y > h + 20) p.y = -20;

        ctx.beginPath();
        ctx.globalAlpha = p.a;
        ctx.fillStyle = "#FFFFFF";
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // links (very soft)
      ctx.globalAlpha = 0.14;
      ctx.strokeStyle = "#FFFFFF";
      ctx.lineWidth = 1;

      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_LINK) {
            const alpha = 1 - dist / MAX_LINK;
            ctx.globalAlpha = 0.12 * alpha;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // shoot
      spawnShoot();
      if (shoot) {
        shoot.x += shoot.vx;
        shoot.y += shoot.vy;
        shoot.life++;

        const tail = 70;
        ctx.globalAlpha = 0.28;
        ctx.strokeStyle = "#FFFFFF";
        ctx.lineWidth = 1.2;

        ctx.beginPath();
        ctx.moveTo(shoot.x, shoot.y);
        ctx.lineTo(shoot.x - shoot.vx * (tail / 10), shoot.y - shoot.vy * (tail / 10));
        ctx.stroke();

        if (shoot.life > shoot.max) shoot = null;
      }

      raf = requestAnimationFrame(step);
    }

    resize();
    init();
    step();

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="bg-wrap" aria-hidden="true">
      <canvas ref={ref} className="bg-canvas" />
    </div>
  );
}
