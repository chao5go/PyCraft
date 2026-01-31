// 从生成目录导入，避免 API 路由构建时解析 fumadocs-mdx 虚拟模块
import { docs } from '../.source/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});
