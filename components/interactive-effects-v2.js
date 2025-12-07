import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Box, useColorModeValue } from '@chakra-ui/react';
import { motion, useMotionValue, useSpring, useTransform, useAnimation } from 'framer-motion';

const MotionBox = motion(Box);

// Simple client-side hook to check if we're in the browser
const useClientSide = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

// Enhanced 3D Tilt Card with optimized performance and hydration safety
export const TiltCard = ({
  children,
  tiltStrength = 15,
  scale = 1.05,
  perspective = 1000,
  glareEffect = true,
  shadow = true,
  className,
  ...props
}) => {
  const isClient = useClientSide();
  const ref = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Motion values for smooth animations
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [tiltStrength, -tiltStrength]), {
    stiffness: 300,
    damping: 30
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-tiltStrength, tiltStrength]), {
    stiffness: 300,
    damping: 30
  });

  // Optimized mouse move handler with requestAnimationFrame
  const handleMouseMove = useCallback((event) => {
    if (!isClient || !ref.current) return;

    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        x.set((event.clientX - centerX) / rect.width);
        y.set((event.clientY - centerY) / rect.height);
      });
    }
  }, [isClient, x, y]);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }, [x, y]);

  const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
  const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

  // During SSR, render without motion
  if (!isClient) {
    return (
      <Box ref={ref} className={className} {...props}>
        {children}
      </Box>
    );
  }

  return (
    <MotionBox
      ref={ref}
      style={{
        perspective: `${perspective}px`,
      }}
      css={{
        transformStyle: 'preserve-3d'
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={className}
      {...props}
    >
      <MotionBox
        style={{
          rotateX,
          rotateY,
        }}
        css={{
          transformStyle: 'preserve-3d'
        }}
        animate={{
          scale: isHovered ? scale : 1,
        }}
        transition={{
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        position="relative"
        overflow="hidden"
        filter={shadow && isHovered ? 'drop-shadow(0 20px 40px rgba(0, 0, 0, 0.1))' : 'none'}
      >
        {children}

        {/* Enhanced Glare Effect */}
        {glareEffect && (
          <MotionBox
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            pointerEvents="none"
            opacity={isHovered ? 0.1 : 0}
            background="linear-gradient(135deg, rgba(255, 255, 255, 0.8) 0%, transparent 50%, rgba(255, 255, 255, 0.8) 100%)"
            style={{
              backgroundPosition: `${glareX.get()}% ${glareY.get()}%`,
              backgroundSize: '200% 200%'
            }}
            transition={{
              opacity: { duration: 0.3 }
            }}
          />
        )}
      </MotionBox>
    </MotionBox>
  );
};

// Enhanced Magnetic Button with improved performance and hydration safety
export const MagneticButton = ({
  children,
  magnetStrength = 0.3,
  maxDistance = 100,
  ...props
}) => {
  const isClient = useClientSide();
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    if (!isClient || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2)
    );

    if (distance > maxDistance) return;

    const deltaX = (e.clientX - centerX) * magnetStrength;
    const deltaY = (e.clientY - centerY) * magnetStrength;

    if (typeof window !== 'undefined') {
      requestAnimationFrame(() => {
        setPosition({ x: deltaX, y: deltaY });
      });
    }
  }, [isClient, magnetStrength, maxDistance]);

  const handleMouseLeave = useCallback(() => {
    setPosition({ x: 0, y: 0 });
  }, []);

  // Filter out custom props to prevent DOM warnings
  const { magnetStrength: _, maxDistance: __, ...domProps } = props;

  // During SSR, render without motion
  if (!isClient) {
    return (
      <Box ref={ref} {...domProps}>
        {children}
      </Box>
    );
  }

  return (
    <MotionBox
      ref={ref}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...domProps}
    >
      {children}
    </MotionBox>
  );
};

// Enhanced Ripple Effect with better performance
export const RippleEffect = ({
  color = 'rgba(236, 72, 153, 0.3)',
  duration = 0.6,
  size = 100,
  ...props
}) => {
  const [ripples, setRipples] = useState([]);

  const createRipple = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size
    };

    setRipples(prev => [...prev, newRipple]);

    // Clean up ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, duration * 1000);
  }, [duration, size]);

  return (
    <Box
      position="absolute"
      top={0}
      left={0}
      right={0}
      bottom={0}
      overflow="hidden"
      pointerEvents="none"
      onClick={createRipple}
      {...props}
    >
      {ripples.map((ripple) => (
        <MotionBox
          key={ripple.id}
          position="absolute"
          left={ripple.x - ripple.size / 2}
          top={ripple.y - ripple.size / 2}
          width={`${ripple.size}px`}
          height={`${ripple.size}px`}
          borderRadius="50%"
          background={color}
          initial={{ scale: 0, opacity: 0.8 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration, ease: 'easeOut' }}
        />
      ))}
    </Box>
  );
};

// Enhanced Parallax Element with intersection observer
export const ParallaxElement = ({
  children,
  offset = 50,
  speed = 0.5,
  className,
  ...props
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const y = useMotionValue(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(element);

    return () => observer.unobserve(element);
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const handleScroll = () => {
      requestAnimationFrame(() => {
        if (ref.current) {
          const rect = ref.current.getBoundingClientRect();
          const scrolled = window.pageYOffset;
          const rate = scrolled * speed;
          y.set(rate);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isVisible, speed, y]);

  return (
    <MotionBox
      ref={ref}
      style={{ y }}
      className={className}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// Optimized Floating Action Button
export const FloatingActionButton = ({
  children,
  amplitude = 10,
  duration = 3,
  delay = 0,
  className,
  ...props
}) => {
  return (
    <MotionBox
      animate={{
        y: [-amplitude, amplitude],
      }}
      transition={{
        duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut",
        delay
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// Advanced Hover Card with multiple effects
export const HoverCard = ({
  children,
  hoverScale = 1.05,
  rotateOnHover = false,
  glowEffect = false,
  shadowEffect = true,
  className,
  ...props
}) => {
  const glowColor = useColorModeValue(
    'rgba(236, 72, 153, 0.4)',
    'rgba(254, 128, 160, 0.4)'
  );

  return (
    <MotionBox
      whileHover={{
        scale: hoverScale,
        rotate: rotateOnHover ? 2 : 0,
        boxShadow: glowEffect
          ? `0 0 30px ${glowColor}`
          : shadowEffect
            ? "0 20px 40px rgba(0, 0, 0, 0.1)"
            : undefined,
        y: shadowEffect ? -5 : 0
      }}
      transition={{
        duration: 0.3,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
      className={className}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// Performance-optimized gesture handler
export const useOptimizedGestures = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });

  const onDragStart = useCallback((event, info) => {
    setIsDragging(true);
    setStartPosition({ x: info.point.x, y: info.point.y });
  }, []);

  const onDragEnd = useCallback((event, info) => {
    setIsDragging(false);

    const deltaX = info.point.x - startPosition.x;
    const deltaY = info.point.y - startPosition.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Trigger swipe detection if moved more than 50px
    if (distance > 50) {
      const angle = Math.atan2(deltaY, deltaX) * 180 / Math.PI;

      if (angle >= -45 && angle <= 45) {
        // Swipe right
        return 'right';
      } else if (angle >= 135 || angle <= -135) {
        // Swipe left
        return 'left';
      } else if (angle >= 45 && angle <= 135) {
        // Swipe down
        return 'down';
      } else if (angle >= -135 && angle <= -45) {
        // Swipe up
        return 'up';
      }
    }

    return null;
  }, [startPosition]);

  return {
    isDragging,
    onDragStart,
    onDragEnd
  };
};

// Advanced Morphing Shape Animation
export const MorphingShape = ({
  shapes = ['circle', 'square', 'triangle'],
  duration = 2,
  delay = 0,
  size = 100,
  color = 'brand.500',
  ...props
}) => {
  const [currentShape, setCurrentShape] = useState(0);

  const pathVariants = {
    circle: {
      d: `M ${size/2} 0 A ${size/2} ${size/2} 0 1 1 ${size/2} ${size} A ${size/2} ${size/2} 0 1 1 ${size/2} 0 Z`
    },
    square: {
      d: `M 0 0 L ${size} 0 L ${size} ${size} L 0 ${size} Z`
    },
    triangle: {
      d: `M ${size/2} 0 L ${size} ${size} L 0 ${size} Z`
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length);
    }, (duration + delay) * 1000);

    return () => clearInterval(interval);
  }, [shapes.length, duration, delay]);

  return (
    <Box {...props}>
      <motion.svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
      >
        <motion.path
          variants={pathVariants}
          animate={shapes[currentShape]}
          transition={{ duration, ease: "easeInOut" }}
          fill={color}
        />
      </motion.svg>
    </Box>
  );
};

// Advanced Text Reveal Animation
export const TextReveal = ({
  children,
  delay = 0,
  duration = 0.8,
  staggerChildren = 0.05,
  className,
  ...props
}) => {
  const text = typeof children === 'string' ? children : '';
  const words = text.split(' ');

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren,
        delayChildren: delay
      }
    }
  };

  const wordVariants = {
    hidden: {
      y: 20,
      opacity: 0,
      rotateX: -90
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        perspective: '1000px'
      }}
      {...props}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={wordVariants}
          style={{
            display: 'inline-block',
            marginRight: '0.25em',
            transformOrigin: 'bottom'
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// Liquid Button Effect
export const LiquidButton = ({
  children,
  liquidColor = '#ff6b9d',
  intensity = 0.8,
  className,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <MotionBox
      position="relative"
      overflow="hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
      {...props}
    >
      {/* Liquid Effect SVG */}
      <motion.svg
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        style={{ pointerEvents: 'none' }}
      >
        <motion.circle
          cx="50%"
          cy="50%"
          r="0%"
          fill={liquidColor}
          animate={{
            r: isHovered ? '120%' : '0%'
          }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
        />
      </motion.svg>

      {/* Button Content */}
      <Box position="relative" zIndex={1}>
        {children}
      </Box>
    </MotionBox>
  );
};
