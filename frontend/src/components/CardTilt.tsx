import React, { useRef, useState } from 'react';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  glowColor?: string;
}

export const CardTilt: React.FC<CardTiltProps> = ({
  children,
  className = '',
  maxTilt = 12,
  glowColor = 'rgba(0, 71, 171, 0.45)',
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const percentX = (x / rect.width) * 100;
    const percentY = (y / rect.height) * 100;

    const tiltX = ((y / rect.height) - 0.5) * -maxTilt;
    const tiltY = ((x / rect.width) - 0.5) * maxTilt;

    setTilt({ x: tiltX, y: tiltY });
    setMousePos({ x: percentX, y: percentY });
  };

  const handleMouseEnter = () => setIsHovered(true);

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      style={{ perspective: 1000 }}
      className="relative transition-transform"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: isHovered
            ? `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(1.02, 1.02, 1.02)`
            : 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)',
          transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
          transformStyle: 'preserve-3d',
        }}
        className={`relative overflow-hidden rounded-2xl ${className}`}
      >
        {/* Dynamic Specular Light Following Pointer */}
        {isHovered && (
          <div
            className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-2xl z-10"
            style={{
              background: `radial-gradient(400px circle at ${mousePos.x}% ${mousePos.y}%, ${glowColor}, transparent 70%)`,
              opacity: 0.85,
            }}
          />
        )}
        <div className="relative z-20 h-full">{children}</div>
      </div>
    </div>
  );
};
