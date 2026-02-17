'use client';

import React, { useState, useEffect } from 'react';

const NeonCursor: React.FC = () => {
  const [pos, setPos] = useState({ x: -50, y: -50 });
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouch(true);
      return;
    }
    const handler = (e: MouseEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  if (isTouch) return null;

  return (
    <div
      className="fixed pointer-events-none z-[9999]"
      style={{ left: pos.x - 6, top: pos.y - 6 }}
    >
      <div className="w-3 h-3 rounded-full bg-green-400 shadow-[0_0_8px_rgba(0,255,65,0.9),0_0_20px_rgba(0,255,65,0.4),0_0_40px_rgba(0,255,65,0.15)]" />
    </div>
  );
};

export default NeonCursor;
