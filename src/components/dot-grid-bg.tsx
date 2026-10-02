"use client";

import * as React from "react";
import { useReducedMotion } from "framer-motion";

type Particle = {
  ox: number;
  oy: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  rot: number;
  color: string;
  alpha: number;
};

const BRONZE_COLORS = [
  "#9a8b72",
  "#c4b49a",
  "#7d705c",
  "#b3a488",
  "#8a7a63",
];

interface DotGridBgProps {
  /** Average spacing between particles in px. */
  dotGap?: number;
  /** Radius around pointer where particles repel (px). */
  interactionRadius?: number;
  repulsionStrength?: number;
  springK?: number;
  damping?: number;
  className?: string;
}

export function DotGridBg({
  dotGap = 58,
  interactionRadius = 110,
  repulsionStrength = 7,
  springK = 0.065,
  damping = 0.8,
  className,
}: DotGridBgProps) {
  const reduceMotion = useReducedMotion() === true;
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const mouseRef = React.useRef({ x: -9999, y: -9999, active: false });
  const particlesRef = React.useRef<Particle[]>([]);
  const rafRef = React.useRef(0);

  // Pointer tracking (window-level so it works under pointer-events-none, incl. touch)
  React.useEffect(() => {
    const updatePointer = (cx: number, cy: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const r = canvas.getBoundingClientRect();
      mouseRef.current = { x: cx - r.left, y: cy - r.top, active: true };
    };
    const onMove = (e: MouseEvent) => updatePointer(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      if (e.touches[0]) updatePointer(e.touches[0].clientX, e.touches[0].clientY);
    };
    const onLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("touchstart", onTouch, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("touchend", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchstart", onTouch);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("touchend", onLeave);
    };
  }, []);

  // Canvas animation loop
  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const cvs = canvas;
    const c = ctx;

    let W = 0;
    let H = 0;
    let dpr = 1;

    function buildParticles(w: number, h: number): Particle[] {
      const jitter = dotGap * 0.55;
      const cols = Math.ceil(w / dotGap) + 1;
      const rows = Math.ceil(h / dotGap) + 1;
      const ps: Particle[] = [];

      for (let r = 0; r < rows; r++) {
        for (let col = 0; col < cols; col++) {
          const ox = col * dotGap + (Math.random() - 0.5) * jitter * 2;
          const oy = r * dotGap + (Math.random() - 0.5) * jitter * 2;
          ps.push({
            ox,
            oy,
            x: ox,
            y: oy,
            vx: 0,
            vy: 0,
            w: 1.6 + Math.random() * 1.4,
            h: 6 + Math.random() * 8,
            rot: Math.random() * Math.PI * 2,
            color:
              BRONZE_COLORS[Math.floor(Math.random() * BRONZE_COLORS.length)],
            alpha: 0.35 + Math.random() * 0.35,
          });
        }
      }
      return ps;
    }

    function resize() {
      dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      W = cvs.offsetWidth;
      H = cvs.offsetHeight;
      cvs.width = W * dpr;
      cvs.height = H * dpr;
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      particlesRef.current = buildParticles(W, H);
    }

    const isVisibleRef = { current: true };

    const io = new IntersectionObserver(
      ([e]) => {
        isVisibleRef.current = e?.isIntersecting ?? true;
        if (isVisibleRef.current && !document.hidden && !rafRef.current) {
          rafRef.current = requestAnimationFrame(draw);
        }
      },
      { threshold: 0.01 }
    );
    io.observe(cvs);

    function onVisibilityChange() {
      if (!document.hidden && isVisibleRef.current && !rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    }
    document.addEventListener("visibilitychange", onVisibilityChange);

    function draw() {
      if (document.hidden || !isVisibleRef.current) {
        rafRef.current = 0;
        return;
      }
      c.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const active = mouseRef.current.active && !reduceMotion;
      const ir = interactionRadius;
      const ir2 = ir * ir;

      for (const p of particlesRef.current) {
        if (active) {
          const dx = p.x - mx;
          const dy = p.y - my;
          const dist2 = dx * dx + dy * dy;

          if (dist2 < ir2 && dist2 > 0.01) {
            const dist = Math.sqrt(dist2);
            const force = ((ir - dist) / ir) ** 2 * repulsionStrength;
            p.vx += (dx / dist) * force;
            p.vy += (dy / dist) * force;
          }
        }

        p.vx += (p.ox - p.x) * springK;
        p.vy += (p.oy - p.y) * springK;
        p.vx *= damping;
        p.vy *= damping;
        p.x += p.vx;
        p.y += p.vy;

        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        const stretch = Math.min(speed * 0.6, 6);
        const drawH = p.h + stretch;

        c.save();
        c.translate(p.x, p.y);
        const velAngle =
          speed > 0.5 ? Math.atan2(p.vy, p.vx) + Math.PI / 2 : p.rot;
        c.rotate(speed > 0.5 ? velAngle : p.rot);
        c.globalAlpha = p.alpha;
        c.fillStyle = p.color;

        const hw = p.w / 2;
        const hh = drawH / 2;
        const cr = hw;
        c.beginPath();
        c.moveTo(-hw + cr, -hh);
        c.lineTo(hw - cr, -hh);
        c.quadraticCurveTo(hw, -hh, hw, -hh + cr);
        c.lineTo(hw, hh - cr);
        c.quadraticCurveTo(hw, hh, hw - cr, hh);
        c.lineTo(-hw + cr, hh);
        c.quadraticCurveTo(-hw, hh, -hw, hh - cr);
        c.lineTo(-hw, -hh + cr);
        c.quadraticCurveTo(-hw, -hh, -hw + cr, -hh);
        c.closePath();
        c.fill();
        c.restore();
      }

      c.globalAlpha = 1;
      rafRef.current = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(resize);
    ro.observe(cvs);
    resize();
    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, [
    dotGap,
    interactionRadius,
    repulsionStrength,
    springK,
    damping,
    reduceMotion,
  ]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ pointerEvents: "none" }}
    />
  );
}

export default DotGridBg;
