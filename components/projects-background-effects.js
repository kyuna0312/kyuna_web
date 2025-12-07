import React, { useState, useEffect } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

// Unique Grid Pattern Background
export const ProjectsGridBackground = () => {
  const gridColor = useColorModeValue(
    'rgba(236, 72, 153, 0.1)',
    'rgba(254, 128, 160, 0.2)'
  );

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      pointerEvents="none"
      zIndex="-2"
      overflow="hidden"
    >
      {/* Animated Grid */}
      <Box
        position="absolute"
        top="0"
        left="0"
        width="120%"
        height="120%"
        backgroundImage={`
          linear-gradient(${gridColor} 1px, transparent 1px),
          linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
        `}
        backgroundSize="40px 40px"
        transform="rotate(12deg) translate(-10%, -10%)"
        animation="gridMove 20s ease-in-out infinite"
      />

      {/* Flowing Lines */}
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 1000 1000"
        preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(236, 72, 153, 0.3)" />
            <stop offset="50%" stopColor="rgba(254, 128, 160, 0.2)" />
            <stop offset="100%" stopColor="rgba(244, 63, 94, 0.1)" />
          </linearGradient>
        </defs>

        <motion.path
          d="M0,300 Q250,100 500,200 T1000,250"
          stroke="url(#flowGradient)"
          strokeWidth="2"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.path
          d="M0,600 Q300,400 600,500 T1000,550"
          stroke="url(#flowGradient)"
          strokeWidth="1.5"
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" }}
        />
      </svg>

      {/* CSS for grid animation */}
      <style jsx>{`
        @keyframes gridMove {
          0%, 100% { transform: rotate(12deg) translate(-10%, -10%); }
          50% { transform: rotate(15deg) translate(-5%, -15%); }
        }
      `}</style>
    </Box>
  );
};

// Constellation Effect - Client-side only to avoid hydration issues
export const ConstellationBackground = () => {
  const [mounted, setMounted] = useState(false);

  // Call hooks at top level
  const lineColor = useColorModeValue('rgba(236, 72, 153, 0.2)', 'rgba(254, 128, 160, 0.3)');
  const starColor = useColorModeValue('rgba(236, 72, 153, 0.6)', 'rgba(254, 128, 160, 0.8)');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render on server to avoid hydration mismatch with Math.random()
  if (!mounted) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        pointerEvents="none"
        zIndex="-1"
        overflow="hidden"
      />
    );
  }

  // Generate stars only on client
  const stars = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    animationDuration: Math.random() * 3 + 2,
  }));

  const connections = [
    [0, 5], [5, 12], [12, 18], [18, 25],
    [1, 8], [8, 15], [15, 22],
    [3, 9], [9, 16], [16, 24],
    [6, 11], [11, 19], [19, 27],
  ];

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      pointerEvents="none"
      zIndex="-1"
      overflow="hidden"
    >
      <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Constellation Lines */}
        {connections.map(([start, end], index) => {
          const startStar = stars[start];
          const endStar = stars[end];
          if (!startStar || !endStar) return null;

          return (
            <motion.line
              key={index}
              x1={startStar.x}
              y1={startStar.y}
              x2={endStar.x}
              y2={endStar.y}
              stroke={lineColor}
              strokeWidth="0.1"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.7, 0] }}
              transition={{
                duration: 4,
                delay: index * 0.2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          );
        })}

        {/* Stars */}
        {stars.map((star) => (
          <motion.circle
            key={star.id}
            cx={star.x}
            cy={star.y}
            r={star.size * 0.1}
            fill={starColor}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1, 1.2, 1],
            }}
            transition={{
              duration: star.animationDuration,
              delay: star.id * 0.1,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </svg>
    </Box>
  );
};

// Code Rain Effect (Matrix-style) - Client-side only
export const CodeRainBackground = () => {
  const [drops, setDrops] = useState([]);
  const dropColor = useColorModeValue('rgba(236, 72, 153, 0.6)', 'rgba(254, 128, 160, 0.8)');

  useEffect(() => {
    const chars = ['0', '1', '{', '}', '<', '>', '(', ')', ';', ':', '=', '+', '-', '*', '/', '?'];
    const columns = Math.floor(window.innerWidth / 20);

    const newDrops = Array.from({ length: columns }, (_, i) => ({
      id: i,
      x: i * 20,
      chars: Array.from({ length: 30 }, () => chars[Math.floor(Math.random() * chars.length)]),
      speed: Math.random() * 2 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }));

    setDrops(newDrops);
  }, []);

  if (drops.length === 0) {
    return (
      <Box
        position="fixed"
        top="0"
        left="0"
        width="100vw"
        height="100vh"
        pointerEvents="none"
        zIndex="-1"
        overflow="hidden"
        opacity={0.3}
      />
    );
  }

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      pointerEvents="none"
      zIndex="-1"
      overflow="hidden"
      opacity={0.3}
    >
      {drops.map((drop) => (
        <MotionBox
          key={drop.id}
          position="absolute"
          left={drop.x}
          top="-100%"
          color={dropColor}
          fontSize="14px"
          fontFamily="monospace"
          opacity={drop.opacity}
          animate={{
            y: ['0vh', '110vh'],
          }}
          transition={{
            duration: 8 / drop.speed,
            repeat: Infinity,
            ease: "linear",
            delay: Math.random() * 5,
          }}
        >
          {drop.chars.map((char, index) => (
            <Box key={index} mb={1}>
              {char}
            </Box>
          ))}
        </MotionBox>
      ))}
    </Box>
  );
};
