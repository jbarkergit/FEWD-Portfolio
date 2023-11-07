import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';
import CurrentTimeCDT from './CurrentTimeCDT';
import { myProjects } from '../../../assets/projects-data/myProjects';

type ProjectNavPropType = {
  projectSlideIndex: number;
};

const PortFooter = ({ projectSlideIndex }: ProjectNavPropType) => {
  return (
    <footer className='portFooter'>
      <nav className='portFooter__nav'>
        <section className='portFooter__nav__mobileLeft'>
          {myProjects[projectSlideIndex].projectUrl !== '' ? (
            <button aria-label='Open Demo Link'>
              <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
                <path fill='#ffffff' d='M16 18v2H5v-2h11Zm5-7v2H3v-2h18Zm-2-7v2H8V4h11Z'></path>
              </svg>
            </button>
          ) : (
            <span className='projectUnavailable'>This project is unavailable</span>
          )}
        </section>
        <section className='portFooter__nav__left'>
          {myProjects[projectSlideIndex].projectUrl !== '' ? (
            <h2>{myProjects[projectSlideIndex].key}</h2>
          ) : (
            <span className='projectUnavailable'>This project is unavailable</span>
          )}
          {myProjects[projectSlideIndex].projectExtended ? <button aria-label='Open Project Insights'>Project Insights</button> : null}
          {myProjects[projectSlideIndex].projectUrl ? (
            <Link to={myProjects[projectSlideIndex].projectUrl}>
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
