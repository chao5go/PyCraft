import type { SVGProps } from 'react';

/**
 * Python 风格 Logo：蓝黄重叠双圆 + 圆点
 */
export function SiteLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden
      {...props}
    >
      <circle cx="11" cy="16" r="9" fill="#3776ab" />
      <circle cx="21" cy="16" r="9" fill="#ffd43b" />
      <circle cx="9" cy="14" r="2.2" fill="#3776ab" />
      <circle cx="23" cy="18" r="2.2" fill="#ffd43b" />
    </svg>
  );
}
