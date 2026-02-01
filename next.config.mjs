import { createMDX } from 'fumadocs-mdx/next';

// GitHub Pages 部署在子路径，如 https://username.github.io/pycraft
// 仅在有 BASE_PATH 时启用静态导出（CI 部署 Pages 时设置）
const basePath = process.env.BASE_PATH || '';
const isStaticExport = basePath.length > 0;

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  ...(isStaticExport && { output: 'export' }),
  ...(basePath && { basePath, assetPrefix: `${basePath}/` }),
};

const withMDX = createMDX({});
export default withMDX(config);
