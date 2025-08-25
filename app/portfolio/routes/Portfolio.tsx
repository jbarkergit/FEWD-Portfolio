import { PortfolioProvider } from '~/portfolio/context/PortfolioContext';
import PortfolioContainer from '~/portfolio/features/PortfolioContainer';

export default function () {
  return (
    <PortfolioProvider>
      <PortfolioContainer />
    </PortfolioProvider>
  );
}
