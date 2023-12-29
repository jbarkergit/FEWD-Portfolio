import EcommerceInsights from '../insights/EcommerceInsights';
import PortfolioInsights from '../insights/PortfolioInsights';

export const myProjects = [
  {
    key: 'ecommerce',
    url: 'http://localhost:5173/ecommerce',
    technologies: {
      libraries: ['react', 'react router', 'uuid'],
      web_technologies: ['html', 'css', 'sass', 'javascript', 'typescript'],
      code_quality: ['eslint', 'prettier'],
    },
    insights: <EcommerceInsights />,
    imgSrc: '/src/portfolio/assets/compressed-project-images/ecommerce-landing.png',
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
    imgSrc: '/src/portfolio/assets/compressed-project-images/ecommerce-landing.png',
    imgAlt: 'Portfolio Project Hub',
    dataStatus: 'disabled',
  },
];
