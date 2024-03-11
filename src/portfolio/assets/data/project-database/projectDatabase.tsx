import EcommerceInsights from '../project-insights/EcommerceInsights';
import FilmDatabaseInsights from '../project-insights/FilmDatabaseInsights';
import PortfolioInsights from '../project-insights/PortfolioInsights';

export const projectDatabase = [
  {
    key: 'film database',
    url: 'http://localhost:5173/film-database',
    technologies: {
      libraries: ['react', 'react router', 'uuid'],
      web_technologies: ['html', 'css', 'sass', 'javascript', 'typescript'],
      code_quality: ['eslint', 'prettier'],
      api: ['tmdb', 'youtube player', 'react-youtube'],
    },
    insights: <FilmDatabaseInsights />,
    imgSrc: 'src/portfolio/assets/media/film-db-temp.png',
    imgAlt: 'Film Database Development Project',
    dataStatus: 'active',
  },
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
      libraries: ['react', 'react router', 'uuid'],
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
