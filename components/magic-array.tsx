import React from 'react';
import { Box } from '@chakra-ui/react';

interface MagicArrayProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  opacity?: number;
  animate?: boolean;
  color?: string;
}

const SIZES = { sm: 60, md: 120, lg: 240, xl: 400 };

/**
 * Mahouka-inspired activation array — concentric circles with geometric division lines.
 * Used as decorative background elements throughout the portfolio.
 */
export const MagicArray: React.FC<MagicArrayProps> = ({
  size = 'lg',
  opacity = 0.18,
  animate = true,
  color = '#4db8d4',
}) => {
  const px = SIZES[size];
  const cx = px / 2;
  const strokeW = px > 200 ? 0.8 : 0.6;

  // 8 radial lines at 45° increments
  const radialLines = Array.from({ length: 8 }, (_, i) => {
    const angle = (i * 45 * Math.PI) / 180;
    const innerR = cx * 0.22;
    const outerR = cx * 0.92;
    return {
      x1: cx + innerR * Math.cos(angle),
      y1: cx + innerR * Math.sin(angle),
      x2: cx + outerR * Math.cos(angle),
      y2: cx + outerR * Math.sin(angle),
    };
  });

  // 4 concentric circles at different radii
  const circles = [0.92, 0.72, 0.52, 0.28].map(r => cx * r);

  // 8 small tick marks on the outer ring
  const ticks = Array.from({ length: 16 }, (_, i) => {
    const angle = (i * 22.5 * Math.PI) / 180;
    const r1 = cx * 0.92;
    const r2 = cx * 0.97;
    return {
      x1: cx + r1 * Math.cos(angle),
      y1: cx + r1 * Math.sin(angle),
      x2: cx + r2 * Math.cos(angle),
      y2: cx + r2 * Math.sin(angle),
    };
  });

  // 4 corner diamond marks inside inner ring
  const diamonds = [0, 90, 180, 270].map(deg => {
    const angle = (deg * Math.PI) / 180;
    const r = cx * 0.40;
    return { cx: cx + r * Math.cos(angle), cy: cx + r * Math.sin(angle) };
  });

  return (
    <Box
      as="span"
      display="inline-block"
      width={`${px}px`}
      height={`${px}px`}
      style={{
        opacity,
        animation: animate ? `arrayRotate 80s linear infinite` : undefined,
        flexShrink: 0,
      }}
      aria-hidden="true"
    >
      <svg
        width={px}
        height={px}
        viewBox={`0 0 ${px} ${px}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Concentric circles */}
        {circles.map((r, i) => (
          <circle
            key={i}
            cx={cx}
            cy={cx}
            r={r}
            stroke={color}
            strokeWidth={strokeW}
          />
        ))}
        {/* Radial division lines */}
        {radialLines.map((l, i) => (
          <line
            key={i}
            x1={l.x1}
            y1={l.y1}
            x2={l.x2}
            y2={l.y2}
            stroke={color}
            strokeWidth={strokeW}
          />
        ))}
        {/* Outer tick marks */}
        {ticks.map((t, i) => (
          <line
            key={i}
            x1={t.x1}
            y1={t.y1}
            x2={t.x2}
            y2={t.y2}
            stroke={color}
            strokeWidth={strokeW * 1.5}
          />
        ))}
        {/* Inner diamond markers */}
        {diamonds.map((d, i) => (
          <rect
            key={i}
            x={d.cx - 2}
            y={d.cy - 2}
            width={4}
            height={4}
            stroke={color}
            strokeWidth={strokeW}
            fill="none"
            transform={`rotate(45, ${d.cx}, ${d.cy})`}
          />
        ))}
        {/* Center dot */}
        <circle cx={cx} cy={cx} r={2} fill={color} opacity={0.6} />
      </svg>
    </Box>
  );
};

/** Counter-rotating outer ring for layered array effect */
export const MagicArrayDouble: React.FC<MagicArrayProps> = (props) => {
  const { size = 'lg', opacity = 0.15, color = '#4db8d4' } = props;
  const px = SIZES[size];
  return (
    <Box position="relative" width={`${px}px`} height={`${px}px`} aria-hidden="true">
      <Box position="absolute" inset={0}>
        <MagicArray size={size} opacity={opacity} color={color} animate />
      </Box>
      <Box
        position="absolute"
        inset={0}
        style={{ animation: 'arrayRotate 120s linear infinite reverse' }}
      >
        <MagicArray size={size} opacity={opacity * 0.6} color="#c4a55a" animate={false} />
      </Box>
    </Box>
  );
};

export default MagicArray;
