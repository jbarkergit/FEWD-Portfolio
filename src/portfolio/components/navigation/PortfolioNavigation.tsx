import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type ProjectNavPropType = {
  setClosestIndex: Dispatch<SetStateAction<number>>;
  closestIndex: number;
};

const PortfolioNavigation = ({ closestIndex, setClosestIndex }: ProjectNavPropType) => {
  const getExtendedInfo = () => {
    switch (closestIndex) {
      case 0:
        return true;
      default:
        return false;
    }
  };

  const getAbridgedInfo = () => {
    switch (closestIndex) {
      case 0:
        return true;
      default:
        return false;
    }
  };

  const getDemoLink = () => {
    switch (closestIndex) {
      case 0:
        return '/ecommerce';
      default:
        return '';
    }
  };

  return (
    <nav className="portfolioNavigation">
      {getExtendedInfo() ? <button>Project Overview</button> : <span className="portfolioNavigation__unavailable">this content is unavailable</span>}
      {getAbridgedInfo() ? <button>Project Summary</button> : null}
      {getDemoLink() ? (
        <Link to={getDemoLink()}>
          <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M9 12h6m-6 6H8A6 6 0 0 1 8 6h1m6 0h1a6 6 0 0 1 0 12h-1"></path>
          </svg>
          Demo Link
        </Link>
      ) : null}
    </nav>
  );
};

export default PortfolioNavigation;
