import NextLink from 'next/link';
import Image from 'next/image';
import { Box, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Global } from '@emotion/react';
import { useState, useEffect } from 'react';

// Simple client-side hook to check if we're in the browser
const useClientSide = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return isClient;
};

export const GridItem = ({ children, href, title, thumbnail }) => {
  return (
    <Box w="100%" textAlign="center">
      <LinkBox cursor="pointer">
        <Image src={thumbnail} alt={title} className="grid-item-thumbnail" placeholder="blur" loading="lazy" />
        <LinkOverlay href={href} target="_blank">
          <Text mt={2}>{title}</Text>
        </LinkOverlay>
        <Text fontSize={14}>{children}</Text>
      </LinkBox>
    </Box>
  );
};

export const ProjectGridItem = ({ children, url = "#", title, thumbnail }) => {
  const isClient = useClientSide();

  return (
    <Box w="100%" textAlign="center" suppressHydrationWarning>
      <LinkBox cursor="pointer">
        {/* Use regular img during SSR to avoid hydration mismatch with Next.js Image */}
        {isClient ? (
          <Image src={thumbnail} alt={title} className="grid-item-thumbnail" placeholder="blur" />
        ) : (
          <Box className="grid-item-thumbnail" position="relative" width="100%" height="auto" paddingBottom="56.25%" overflow="hidden" borderRadius="12px">
            {/* Empty during SSR, will be replaced by Image on client */}
          </Box>
        )}
        <NextLink href={url} scroll={false} passHref legacyBehavior>
          <LinkOverlay>
            <Text mt={2} fontSize={20}>{title}</Text>
          </LinkOverlay>
        </NextLink>
        <Text fontSize={14}>{children}</Text>
      </LinkBox>
    </Box>
  );
};


export const GridItemStyle = () => (
  <Global styles={`
    .grid-item-thumbnail {
      border-radius: 12px;
      background-color: #ffe4e1; /* Light pink background */
      border: 2px solid #ffb6c1; /* Pink border */
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Subtle shadow */
      transition: transform 0.3s; /* Smooth transform on hover */
    }

    .grid-item-thumbnail:hover {
      transform: scale(1.05); /* Slightly larger on hover */
    }
  `} />
);
