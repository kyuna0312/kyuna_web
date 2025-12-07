import { useState, useEffect } from 'react';
import { Box } from '@chakra-ui/react';
import Image from 'next/image';

// Optimized Image Component using Next.js Image
const OptimizedImage = ({
  src,
  alt,
  width,
  height,
  priority = false,
  quality = 85,
  objectFit = 'cover',
  objectPosition = 'center',
  borderRadius = 0,
  onLoad,
  onError,
  fallbackSrc,
  className,
  style,
  sizes,
  fill = false,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // Reset state when src changes
  useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleLoad = (event) => {
    setIsLoaded(true);
    onLoad?.(event);
  };

  const handleError = () => {
    setHasError(true);
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    }
    onError?.();
  };

  // For external images or when fill mode is used
  const isExternalImage = currentSrc?.startsWith('http');
  const useNextImage = !isExternalImage;

  return (
    <Box
      position="relative"
      width={fill ? '100%' : width}
      height={fill ? '100%' : height}
      borderRadius={borderRadius}
      overflow="hidden"
      {...props}
    >
      {/* Loading placeholder - static color to avoid hydration issues */}
      <Box
        position="absolute"
        top={0}
        left={0}
        width="100%"
        height="100%"
        bg="gray.700"
        borderRadius={borderRadius}
        opacity={isLoaded ? 0 : 1}
        transition="opacity 0.3s ease"
      />

      {useNextImage ? (
        <Image
          src={currentSrc}
          alt={alt || ''}
          width={fill ? undefined : width}
          height={fill ? undefined : height}
          fill={fill}
          priority={priority}
          quality={quality}
          sizes={sizes || (fill ? '100vw' : undefined)}
          onLoad={handleLoad}
          onError={handleError}
          className={className}
          style={{
            objectFit,
            objectPosition,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
            ...style,
          }}
        />
      ) : (
        // Fallback for external images
        <Box
          as="img"
          src={currentSrc}
          alt={alt || ''}
          width="100%"
          height="100%"
          objectFit={objectFit}
          objectPosition={objectPosition}
          onLoad={handleLoad}
          onError={handleError}
          className={className}
          loading={priority ? 'eager' : 'lazy'}
          style={{
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease, transform 0.4s ease',
            transform: isLoaded ? 'scale(1)' : 'scale(1.05)',
            display: 'block',
            ...style,
          }}
        />
      )}

      {/* Error state */}
      {hasError && !fallbackSrc && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          display="flex"
          alignItems="center"
          justifyContent="center"
          bg="gray.800"
          color="gray.400"
          fontSize="sm"
          borderRadius={borderRadius}
        >
          ✕
        </Box>
      )}
    </Box>
  );
};

// Image Gallery Component with optimizations
export const ImageGallery = ({
  images,
  columns = 3,
  spacing = 4,
  aspectRatio = 1,
  ...props
}) => {
  return (
    <Box
      display="grid"
      gridTemplateColumns={`repeat(${columns}, 1fr)`}
      gap={spacing}
      {...props}
    >
      {images.map((image, index) => (
        <Box
          key={index}
          aspectRatio={aspectRatio}
          borderRadius="xl"
          overflow="hidden"
          _hover={{
            transform: 'scale(1.05)',
            transition: 'transform 0.3s ease'
          }}
        >
          <OptimizedImage
            src={image.src}
            alt={image.alt || `Gallery image ${index + 1}`}
            fill
            objectFit="cover"
            borderRadius="xl"
            priority={index < 6}
          />
        </Box>
      ))}
    </Box>
  );
};

// Avatar component with optimization
export const OptimizedAvatar = ({
  src,
  name,
  size = 'md',
  borderRadius = 'full',
  showBorder = false,
  borderColor = 'feminine.300',
  ...props
}) => {
  const sizeMap = {
    xs: 24,
    sm: 32,
    md: 48,
    lg: 64,
    xl: 96,
    '2xl': 128
  };

  const avatarSize = sizeMap[size] || sizeMap.md;

  return (
    <Box
      position="relative"
      width={`${avatarSize}px`}
      height={`${avatarSize}px`}
      {...props}
    >
      <OptimizedImage
        src={src}
        alt={name || 'Avatar'}
        width={avatarSize}
        height={avatarSize}
        borderRadius={borderRadius}
        objectFit="cover"
        style={{
          border: showBorder ? `2px solid` : 'none',
          borderColor: showBorder ? borderColor : 'transparent'
        }}
        fallbackSrc={`https://ui-avatars.com/api/?name=${encodeURIComponent(name || 'User')}&size=${avatarSize}&background=ec4899&color=ffffff&bold=true`}
      />
    </Box>
  );
};

export default OptimizedImage;
