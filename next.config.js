const { i18n } = require('./next-i18next.config')

module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  i18n,

  // Enhanced Image Optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'drive.google.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'ui-avatars.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 86400,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Performance optimizations
  experimental: {
    optimizePackageImports: ['@chakra-ui/react', '@chakra-ui/icons', 'framer-motion', 'next-i18next', 'react-icons'],
  },

  // Single unified webpack configuration
  webpack: (config, { dev, isServer }) => {
    // Enable source maps in development
    if (dev && !isServer) {
      config.devtool = 'eval-source-map';
    }

    // Optimize bundle size for production
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          default: false,
          vendors: false,
          // Framework chunk for React/Next.js (highest priority)
          framework: {
            name: 'framework',
            chunks: 'all',
            test: /(?<!node_modules.*)[\\/]node_modules[\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\/]/,
            priority: 40,
            enforce: true,
          },
          // Chakra UI chunk
          chakra: {
            name: 'chakra',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](@chakra-ui|@emotion)[\\/]/,
            priority: 35,
            enforce: true,
          },
          // Framer Motion chunk
          motion: {
            name: 'motion',
            chunks: 'all',
            test: /[\\/]node_modules[\\/]framer-motion[\\/]/,
            priority: 30,
            enforce: true,
          },
          // i18n chunk
          i18n: {
            name: 'i18n',
            chunks: 'all',
            test: /[\\/]node_modules[\\/](i18next|react-i18next|next-i18next)[\\/]/,
            priority: 25,
            enforce: true,
          },
          // Vendor chunk for other dependencies
          vendor: {
            name: 'vendor',
            chunks: 'all',
            test: /node_modules/,
            priority: 20,
          },
          // Common chunk for shared code
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
            enforce: true,
          },
        },
      };
    }

    return config;
  },

  // PWA and Security Headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/sw.js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, must-revalidate',
          },
          {
            key: 'Service-Worker-Allowed',
            value: '/',
          },
        ],
      },
      {
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Compression
  compress: true,
  // Generate ETags for better caching
  generateEtags: true,
  // Power by header removal for security
  poweredByHeader: false,
}
