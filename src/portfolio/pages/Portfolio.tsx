//import useLocalStorage from '../../shared/hooks/useLocalStorage';

import PortfolioHeader from '../../portfolio/layouts/PortfolioHeader';
import PortfolioMain from '../../portfolio/layouts/PortfolioMain';
import PortfolioFooter from '../../portfolio/layouts/PortfolioFooter';
import PortfolioResume from '../components/features/PortfolioResume';
import PortfolioContact from '../components/features/PortfolioContact';

//const [theme] = useLocalStorage('theme', '');

const Portfolio = () => {
  return (
    <div className="portfolio" data-theme="neumorphicLight">
      <PortfolioHeader />
      <PortfolioMain />
      <PortfolioFooter />
      <PortfolioResume />
      <PortfolioContact />
    </div>
  );
};
export default Portfolio;
