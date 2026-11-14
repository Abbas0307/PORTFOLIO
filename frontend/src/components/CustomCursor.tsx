import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [followerPosition, setFollowerPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch-primary
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Check if hovering over clickable element
      const target = e.target as HTMLElement | null;
      if (target) {
        const isClickable = !!target.closest('a, button, input, textarea, select, [data-interactive="true"]');
        setIsHovered(isClickable);
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  // Smooth follower interpolation
  useEffect(() => {
    if (isTouch) return;
    let animationFrameId: number;

    const follow = () => {
      setFollowerPosition((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.18,
        y: prev.y + (position.y - prev.y) * 0.18,
      }));
      animationFrameId = requestAnimationFrame(follow);
    };

    animationFrameId = requestAnimationFrame(follow);
    return () => cancelAnimationFrame(animationFrameId);
  }, [position, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Precision Core Dot */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-50 transition-transform duration-75 ease-out"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full bg-cobalt-400 shadow-[0_0_12px_#0047AB] transition-all duration-200 ${
            isHovered ? 'w-2 h-2 opacity-90' : 'w-2 h-2 opacity-100'
          }`}
        />
      </div>

      {/* Glowing Cobalt Aura Follower */}
      <div
        className="fixed top-0 left-0 pointer-events-none z-40 transition-transform duration-150 ease-out"
        style={{
          transform: `translate3d(${followerPosition.x}px, ${followerPosition.y}px, 0) translate(-50%, -50%)`,
        }}
      >
        <div
          className={`rounded-full border border-cobalt-500/60 transition-all duration-300 ${
            isHovered
              ? 'w-12 h-12 bg-cobalt-500/15 shadow-[0_0_35px_rgba(0,71,171,0.5)] scale-110'
              : 'w-8 h-8 bg-cobalt-500/5 shadow-[0_0_20px_rgba(0,71,171,0.25)] scale-100'
          }`}
        />
      </div>
    </>
  );
};
