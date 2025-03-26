import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  // 如果要部署到非根目录，需要配置 basePath
  // basePath: '/your-base-path'
};

export default nextConfig;
