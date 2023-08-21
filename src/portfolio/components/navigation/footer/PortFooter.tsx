import { Link } from 'react-router-dom';
import CurrentTimeCDT from './CurrentTimeCDT';

type ProjectNavPropType = {
  stateIndex: number;
};

const PortFooter = ({ stateIndex }: ProjectNavPropType) => {
  const getExtendedInfo = () => {
    switch (stateIndex) {
      case 0:
        return true;
      case 1:
        return true;
      default:
        return false;
    }
  };

  const getAbridgedInfo = () => {
    switch (stateIndex) {
      case 0:
        return true;
      case 1:
        return true;
      default:
        return false;
    }
  };

  const getDemoLink = () => {
    switch (stateIndex) {
      case 0:
        return '/hyundai-n';
      case 1:
        return '/ecommerce';
      default:
        return '';
    }
  };

  return (
    <footer className="portFooter">
      <nav className="portFooter__nav">
        <section className="portFooter__nav__left">
          {getExtendedInfo() ? <button>Project Overview</button> : <span className="portfoliofooterigation__unavailable">this content is unavailable</span>}
          {getAbridgedInfo() ? <button>Project Summary</button> : null}
          {getDemoLink() ? (
            <Link to={getDemoLink()}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.2em" height="1.2em" viewBox="0 0 24 24">
                <g fill="none" stroke="#ffffff" strokeLinecap="round" strokeWidth="1.5">
                  <path d="m12.792 15.8l1.43-1.432a6.076 6.076 0 0 0 0-8.59a6.067 6.067 0 0 0-8.583 0L2.778 8.643A6.076 6.076 0 0 0 6.732 19"></path>
                  <path d="m11.208 8.2l-1.43 1.432a6.076 6.076 0 0 0 0 8.59a6.067 6.067 0 0 0 8.583 0l2.861-2.864A6.076 6.076 0 0 0 17.268 5"></path>
                </g>
              </svg>
              Demo Link
            </Link>
          ) : null}
        </section>
        <section className="portFooter__nav__right">
          <span className="portFooter__nav__right--timezone">
            <CurrentTimeCDT />
          </span>
        </section>
      </nav>
    </footer>
  );
};

export default PortFooter;
