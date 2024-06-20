import EcommerceInsights from '../components/insights/EcommerceInsights';
import FilmDatabaseInsights from '../components/insights/FilmDatabaseInsights';
import PortfolioInsights from '../components/insights/PortfolioInsights';

export const projectData = [
  {
    key: 'film database',
    url: 'http://localhost:5173/film-database',
    technologies: {
      api: ['tmdb'],
      libraries: ['uuid', 'react-youtube'],
      core_libraries: ['vite', 'react', 'react router dom', 'sass'],
      web_technologies: ['html', 'css', 'javascript', 'typescript'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: <FilmDatabaseInsights />,
    imgSrc: '/src/portfolio/assets/carousel-posters/film-db-temp.png',
    imgAlt: 'Film Database Development Project',
  },
  {
    key: 'ecommerce',
    url: 'http://localhost:5173/ecommerce',
    technologies: {
      libraries: ['uuid'],
      core_libraries: ['vite', 'react', 'react router dom', 'sass'],
      web_technologies: ['html', 'css', 'javascript', 'typescript'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: <EcommerceInsights />,
    imgSrc: '/src/portfolio/assets/carousel-posters/ecommerce-poster.png',
    imgAlt: 'Ecommerce Web Development Project',
  },
  {
    key: '2024 portfolio',
    url: '',
    technologies: {
      data: ['Custom JSON Store'],
      libraries: ['uuid'],
      core_libraries: ['vite', 'react', 'react router dom', 'sass'],
      web_technologies: ['html', 'css', 'javascript', 'typescript'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: <PortfolioInsights />,
    imgSrc: '/src/portfolio/assets/carousel-posters/portfolio-poster.png',
    imgAlt: 'Portfolio Project Hub',
  },
];
