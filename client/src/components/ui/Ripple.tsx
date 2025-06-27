import React, { useState, useEffect } from 'react';

interface RippleProps {
  duration?: number;
  color?: string;
}

interface RippleEffect {
  id: number;
  x: number;
  y: number;
}

const Ripple: React.FC<RippleProps> = ({ duration = 600, color = 'rgba(255, 255, 255, 0.6)' }) => {
  const [ripples, setRipples] = useState<RippleEffect[]>([]);

  const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const rect = container.getBoundingClientRect();
    
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    const newRipple: RippleEffect = {
      id: Date.now(),
      x,
      y,
    };

    setRipples(prev => [...prev, newRipple]);
  };

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples(prev => prev.slice(1));
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [ripples, duration]);

  return (
    <div 
      className="ripple-container"
      onMouseDown={createRipple}
    >
      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          className="ripple-effect"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: color,
            animationDuration: `${duration}ms`,
          }}
        />
      ))}
    </div>
  );
};

export default Ripple; 