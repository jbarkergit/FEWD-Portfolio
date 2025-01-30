import type { Config } from '@react-router/dev/config';

export default {
  ssr: false,
  prerender: ['/app/portfolio/pages/Portfolio.tsx'],
} satisfies Config;
