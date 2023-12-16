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
    imgSrc:
      'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    posterSrc:
      'https://images.unsplash.com/photo-1594904351111-a072f80b1a71?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imgAlt: 'Portfolio Project Hub',
    dataStatus: 'disabled',
  },
];
