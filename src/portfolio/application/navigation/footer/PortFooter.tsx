import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CurrentTimeCDT from './components/CurrentTimeCDT';
import { myProjects } from '../../../assets/projects-data/myProjects';

type ProjectNavPropType = {
  mountAnimation: boolean;
  projectSlideIndex: number;
  featureState: {
    projectDetailsActive: boolean;
    contactFormActive: boolean;
    techStackActive: boolean;
  };
  setFeatureState: Dispatch<
    SetStateAction<{
      projectDetailsActive: boolean;
      contactFormActive: boolean;
      techStackActive: boolean;
    }>
  >;
};

const PortFooter = ({ mountAnimation, projectSlideIndex, featureState, setFeatureState }: ProjectNavPropType) => {
  const footerNavigation = useRef<HTMLElement>(null);
  const [navigationIndicator, setNavigationIndicator] = useState({ key: myProjects[projectSlideIndex].key, insights: 'Project Insights', demoLink: 'Demo Link' });

  useEffect(() => {
    const setFooterDataAttr = (transitionStatus: string) => {
      footerNavigation.current?.setAttribute('data-transition', transitionStatus);
    };

    footerNavigation.current?.getAttribute('data-transition') === 'false' ? setFooterDataAttr('true') : setFooterDataAttr('false');

    setTimeout(() => {
      if (myProjects[projectSlideIndex].projectUrl !== '') {
        setNavigationIndicator({ key: myProjects[projectSlideIndex].key, insights: 'Project Insights', demoLink: 'Demo Link' });
      } else {
        setNavigationIndicator({ key: 'This project is unavailable', insights: '', demoLink: '' });
      }
    }, 360);
  }, [projectSlideIndex]);

  return (
    <footer className={`portFooter ${mountAnimation ? 'data-mount-animation-fade-in' : ''}`}>
      <nav className='portFooter__nav'>
        <section className='portFooter__nav__mobileLeft'>
          <h2>Project links and information</h2>
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

        <section className='portFooter__nav__left' ref={footerNavigation}>
          <h2>{navigationIndicator.key}</h2>
          <button
            aria-label='Open Project Insights'
            onClick={() =>
              featureState.projectDetailsActive
                ? setFeatureState({ ...featureState, projectDetailsActive: false })
                : setFeatureState({ ...featureState, projectDetailsActive: true })
            }>
            {navigationIndicator.insights}
          </button>
          <Link to={myProjects[projectSlideIndex].projectUrl}>{navigationIndicator.demoLink}</Link>
        </section>

        <section className='portFooter__nav__right'>
          <CurrentTimeCDT />
        </section>
      </nav>
    </footer>
  );
};

export default PortFooter;
