import EcommerceInsights from '../../application/project-details/data/EcommerceInsights';
import PortfolioInsights from '../../application/project-details/data/PortfolioInsights';

export const myProjects = [
  {
    key: 'ecommerce',
    url: 'http://localhost:5173/ecommerce',
    technologies: {
      libraries: ['react', 'react router'],
      webTechnologies: ['html', 'css', 'sass', 'javascript', 'typescript'],
      codeQuality: ['eslint', 'prettier'],
    },
    insights: <EcommerceInsights />,
    imgSrc: '/src/portfolio/assets/compressed-project-images/ecommerce-landing.png',
    posterSrc: 'src/ecommerce/assets/production-images/compressed-home-page/infographic/infographic-3.jpg',
    imgAlt: 'Ecommerce Web Development Project',
    dataStatus: 'active',
  },
  {
    key: '2024 portfolio',
    url: '',
    technologies: {
      libraries: ['react', 'react router'],
      webTechnologies: ['html', 'css', 'sass', 'javascript', 'typescript'],
      codeQuality: ['eslint', 'prettier'],
      buildtools: ['vite'],
      packageManagers: ['npm'],
      versionControl: ['git', 'github'],
    },
    insights: <PortfolioInsights />,
    imgSrc: '/src/portfolio/assets/compressed-project-images/portfolio-landing.png',
    posterSrc: '',
    imgAlt: 'Portfolio Project Hub',
    dataStatus: 'disabled',
  },
];
