const nextConfig = {
  reactStrictMode: true,
  experimental: {},
  onDemandEntries: {
    pagesBufferLength: 1,
  },
  devIndicators: {
    autoPrerender: false,
  },
  webpack(config: { optimization: { runtimeChunk: boolean; }; }) {
    config.optimization.runtimeChunk = false; // reduce reload pressure
    return config;
  },
};

module.exports = nextConfig;
