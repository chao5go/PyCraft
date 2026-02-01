import type { ReactNode } from 'react';
import { RootProvider } from 'fumadocs-ui/provider';
import './globals.css';

export const metadata = {
  title: { default: 'PyCraft', template: '%s · PyCraft' },
  description: '面向 LeetCode 的语法与基础 — 用 Python 刷题会用到的语法与基础知识，示例可在线运行。',
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
