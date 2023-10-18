import { Link } from 'react-router-dom';
import CurrentTimeCDT from './CurrentTimeCDT';
import { Dispatch, SetStateAction } from 'react';

type ProjectNavPropType = {
  projectSlideIndex: number;
  setProjectInfoStyle: Dispatch<SetStateAction<string>>;
};

const PortFooter = ({ projectSlideIndex, setProjectInfoStyle }: ProjectNavPropType) => {
  const useProjectInformation = (): {
    extended: boolean;
    summary: boolean;
    demoLink: string;
  } => {
    switch (projectSlideIndex) {
      case 0:
        return { extended: true, summary: true, demoLink: '/ecommerce' };
      default:
        return { extended: false, summary: false, demoLink: '' };
    }
  };

  return (
    <footer className='portFooter'>
      <nav className='portFooter__nav'>
        <section className='portFooter__nav__mobileLeft'>
          {useProjectInformation()?.demoLink ? (
            <button>
              <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
                <path fill='#ffffff' d='M16 18v2H5v-2h11Zm5-7v2H3v-2h18Zm-2-7v2H8V4h11Z'></path>
              </svg>
            </button>
          ) : (
            <span className='projectUnavailable'>this project is unavailable</span>
          )}
        </section>
        <section className='portFooter__nav__left'>
          {useProjectInformation()?.extended ? (
            <button onClick={() => setProjectInfoStyle('projectOverview')}>Project Insights</button>
          ) : (
            <span className='projectUnavailable'>this project is unavailable</span>
          )}
          {useProjectInformation()?.demoLink ? (
            <Link to={useProjectInformation()?.demoLink}>
              <svg xmlns='http://www.w3.org/2000/svg' width='1.2em' height='1.2em' viewBox='0 0 24 24'>
                <g fill='none' stroke='#ffffff' strokeLinecap='round' strokeWidth='1.5'>
                  <path d='m12.792 15.8l1.43-1.432a6.076 6.076 0 0 0 0-8.59a6.067 6.067 0 0 0-8.583 0L2.778 8.643A6.076 6.076 0 0 0 6.732 19'></path>
                  <path d='m11.208 8.2l-1.43 1.432a6.076 6.076 0 0 0 0 8.59a6.067 6.067 0 0 0 8.583 0l2.861-2.864A6.076 6.076 0 0 0 17.268 5'></path>
                </g>
              </svg>
              Demo Link
            </Link>
          ) : null}
        </section>
        <section className='portFooter__nav__right'>
          <span className='portFooter__nav__right--timezone'>
            <CurrentTimeCDT />
          </span>
        </section>
      </nav>
    </footer>
  );
};

export default PortFooter;
