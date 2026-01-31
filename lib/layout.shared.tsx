import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';

export const SITE_SLOGAN = '面向 LeetCode 的语法与基础';

function NavLogo({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
    >
      <circle cx="11" cy="16" r="9" fill="#3776ab" />
      <circle cx="21" cy="16" r="9" fill="#ffd43b" />
      <circle cx="9" cy="14" r="2.2" fill="#3776ab" />
      <circle cx="23" cy="18" r="2.2" fill="#ffd43b" />
    </svg>
  );
}

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <span className="flex items-center gap-2 font-semibold">
          <NavLogo className="h-7 w-7 shrink-0" />
          Python 学习
        </span>
      ),
      url: '/docs',
    },
    links: [
      {
        text: '文档',
        url: '/docs',
      },
    ],
  };
}
