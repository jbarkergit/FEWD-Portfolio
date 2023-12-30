import EcommerceInsights from '../project-insights/EcommerceInsights';
import PortfolioInsights from '../project-insights/PortfolioInsights';

export const projectDatabase = [
  {
    key: 'ecommerce',
    url: 'http://localhost:5173/ecommerce',
    technologies: {
      libraries: ['react', 'react router', 'uuid'],
      web_technologies: ['html', 'css', 'sass', 'javascript', 'typescript'],
      code_quality: ['eslint', 'prettier'],
    },
    insights: <EcommerceInsights />,
    imgSrc: '/src/portfolio/assets/media/ecommerce-poster.png',
    imgAlt: 'Ecommerce Web Development Project',
    dataStatus: 'active',
  },
  {
    key: '2024 portfolio',
    url: '',
    technologies: {
      libraries: ['react', 'react router', 'lenis', 'uuid'],
      web_technologies: ['html', 'css', 'sass', 'javascript', 'typescript'],
      code_quality: ['eslint', 'prettier'],
      build_tools: ['vite'],
      package_managers: ['npm'],
      version_control: ['git', 'github'],
    },
    insights: <PortfolioInsights />,
    imgSrc: '/src/portfolio/assets/media/portfolio-poster.png',
    imgAlt: 'Portfolio Project Hub',
    dataStatus: 'disabled',
  },
];
