const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  onDemandEntries: {
    pagesBufferLength: 1,
  },
  devIndicators: {
    autoPrerender: false,
  },
  // ✅ Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
  // ✅ Ignore ESLint errors during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack(config: { optimization: { runtimeChunk: boolean; }; }) {
    config.optimization.runtimeChunk = false;
    return config;
  },
};

module.exports = nextConfig;
