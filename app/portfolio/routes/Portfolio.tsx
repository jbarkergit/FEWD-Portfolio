import { PortfolioProvider } from '~/portfolio/context/PortfolioContext';
import PortfolioContainer from '~/portfolio/pages/PortfolioContainer';

export default function () {
  return (
    <PortfolioProvider>
      <PortfolioContainer />
    </PortfolioProvider>
  );
}
