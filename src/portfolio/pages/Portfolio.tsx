import PortfolioHeader from '../../portfolio/layouts/PortfolioHeader';
import PortfolioMain from '../../portfolio/layouts/PortfolioMain';
import PortfolioFooter from '../../portfolio/layouts/PortfolioFooter';
import PortfolioResume from '../components/features/PortfolioResume';
import PortfolioContact from '../components/features/PortfolioContact';
import useLocalStorage from '../../shared/hooks/useLocalStorage';
import { useEffect } from 'react';

const Portfolio = () => {
  const [theme] = useLocalStorage('theme', '');

  useEffect(() => {
    const useTheme = () => {
      theme === 'neumorphicLight' ? 'neumorphicDark' : 'neumorphicLight';
    };

    window.addEventListener('theme', useTheme);

    return () => {
      window.removeEventListener('theme', useTheme);
    };
  }, [theme]);

  return (
    <div className="portfolio themeToggler" data-theme={theme}>
      <PortfolioHeader />
      <PortfolioMain />
      <PortfolioFooter />
      <PortfolioResume />
      <PortfolioContact />
    </div>
  );
};

export default Portfolio;
