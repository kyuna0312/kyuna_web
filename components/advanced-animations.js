import { motion, useAnimation, useInView, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';
import { Box } from '@chakra-ui/react';

// Enhanced Motion Components with pre-configured animations
export const MotionBox = motion(Box);

// Advanced Animation Variants
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInDown = {
  hidden: {
    opacity: 0,
    y: -60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInLeft = {
  hidden: {
    opacity: 0,
    x: -60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const fadeInRight = {
  hidden: {
    opacity: 0,
    x: 60,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const scaleIn = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotateX: -15
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const slideInRotate = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    rotate: -10,
    y: 50
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItem = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Advanced Scroll-Triggered Animation Hook
export const useScrollAnimation = (threshold = 0.1) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    threshold,
    once: true,
    margin: "0px 0px -100px 0px"
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  return { ref, controls, isInView };
};

// Parallax Animation Hook
export const useParallaxScroll = (offset = 50) => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, offset]);

  return y;
};

// Advanced Scroll-Triggered Component
export const ScrollAnimationWrapper = ({
  children,
  variant = fadeInUp,
  delay = 0,
  threshold = 0.1,
  ...props
}) => {
  const { ref, controls } = useScrollAnimation(threshold);

  const animationVariant = {
    hidden: variant.hidden,
    visible: {
      ...variant.visible,
      transition: {
        ...variant.visible.transition,
        delay: delay
      }
    }
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariant}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// Stagger Animation Component
export const StaggerAnimationWrapper = ({
  children,
  staggerDelay = 0.1,
  initialDelay = 0.3,
  threshold = 0.1,
  ...props
}) => {
  const { ref, controls } = useScrollAnimation(threshold);

  const containerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };

  return (
    <MotionBox
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={containerVariant}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// Parallax Component
export const ParallaxWrapper = ({
  children,
  offset = 50,
  reverse = false,
  ...props
}) => {
  const y = useParallaxScroll(reverse ? -offset : offset);

  return (
    <MotionBox
      style={{ y }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// Advanced Hover Animations
export const hoverScale = {
  scale: 1.05,
  transition: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
};

export const hoverLift = {
  y: -8,
  scale: 1.02,
  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
  transition: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
};

export const hoverRotate = {
  scale: 1.05,
  rotate: 2,
  transition: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
};

export const hoverGlow = {
  scale: 1.02,
  boxShadow: "0 0 30px rgba(236, 72, 153, 0.4)",
  transition: {
    duration: 0.3,
    ease: [0.25, 0.46, 0.45, 0.94]
  }
};

// Page Transition Variants
export const pageTransition = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.98,
    transition: {
      duration: 0.4,
      ease: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

// Loading Animation Component
export const LoadingSpinner = ({ size = 40, color = "#ec4899" }) => {
  return (
    <MotionBox
      width={`${size}px`}
      height={`${size}px`}
      border="3px solid"
      borderColor="transparent"
      borderTopColor={color}
      borderRadius="50%"
      animate={{ rotate: 360 }}
      transition={{
        duration: 1,
        repeat: Infinity,
        ease: "linear"
      }}
    />
  );
};

// Floating Animation Component
export const FloatingElement = ({
  children,
  duration = 3,
  y = [-10, 10],
  ...props
}) => {
  return (
    <MotionBox
      animate={{
        y: y,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// Pulse Animation Component
export const PulseElement = ({
  children,
  scale = [1, 1.05],
  duration = 2,
  ...props
}) => {
  return (
    <MotionBox
      animate={{
        scale: scale,
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "easeInOut"
      }}
      {...props}
    >
      {children}
    </MotionBox>
  );
};

// Text Animation Component
export const AnimatedText = ({
  text,
  delay = 0,
  duration = 0.5,
  ...props
}) => {
  const letters = Array.from(text);

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: {
        staggerChildren: 0.03,
        delayChildren: delay
      }
    })
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: duration
      }
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
        duration: duration
      }
    }
  };

  return (
    <MotionBox
      variants={container}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </MotionBox>
  );
};
