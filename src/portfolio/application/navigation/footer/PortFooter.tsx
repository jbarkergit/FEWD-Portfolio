import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CurrentTimeCDT from './components/CurrentTimeCDT';
import { myProjects } from '../../../assets/projects-data/myProjects';

type ProjectNavPropType = {
  projectSlideIndex: number;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const PortFooter = ({ projectSlideIndex, featureState, setFeatureState }: ProjectNavPropType) => {
  const footerNavigationLeft = useRef<HTMLElement>(null);
  const footerNavigationRight = useRef<HTMLElement>(null);

  const [navigationIndicator, setNavigationIndicator] = useState({ key: myProjects[projectSlideIndex].key, insights: 'Project Insights', demoLink: 'Demo Link' });

  useEffect(() => {
    const setFooterDataAttr = (transitionStatus: string) => {
      footerNavigationLeft.current?.setAttribute('data-transition', transitionStatus);
    };

    footerNavigationLeft.current?.getAttribute('data-transition') === 'false' ? setFooterDataAttr('true') : setFooterDataAttr('false');

    setTimeout(() => {
      if (myProjects[projectSlideIndex].key !== '' && myProjects[projectSlideIndex].url !== '') {
        setNavigationIndicator({ key: myProjects[projectSlideIndex].key, insights: 'Project Insights', demoLink: 'Demo Link' });
      } else if (myProjects[projectSlideIndex].key !== '' && myProjects[projectSlideIndex].url === '') {
        setNavigationIndicator({ key: myProjects[projectSlideIndex].key, insights: 'Project Insights', demoLink: '' });
      } else {
        setNavigationIndicator({ key: 'This project is unavailable', insights: '', demoLink: '' });
      }
    }, 360);
  }, [projectSlideIndex]);

  /** Component Transition Out */
  const initialRender = useRef<boolean>(true);

  useEffect(() => {
    if (initialRender.current) initialRender.current = false;

    if (Object.values(featureState).some((value) => value === true) && footerNavigationLeft.current && footerNavigationRight.current) {
      // Grid transition out animator
      [footerNavigationLeft, footerNavigationRight].forEach((section: RefObject<HTMLElement>) => section.current?.setAttribute('data-status', 'fadeOut'));
    } else if (!initialRender) {
      // Grid transition in animator
      setTimeout(
        () => [footerNavigationLeft, footerNavigationRight].forEach((section: RefObject<HTMLElement>) => section.current?.setAttribute('data-status', 'fadeIn')),
        1000
      );
    } else {
      // Mount animator
      [footerNavigationLeft, footerNavigationRight].forEach((section: RefObject<HTMLElement>) => section.current?.setAttribute('data-status', 'fadeIn'));
    }
  }, [featureState]);

  return (
    <footer className='portFooter'>
      <nav className='portFooter__nav'>
        {/* <section className='portFooter__nav__mobileLeft'>
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
        </section> */}

        <section className='portFooter__nav__left' ref={footerNavigationLeft}>
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
          <Link to={myProjects[projectSlideIndex].url}>{navigationIndicator.demoLink}</Link>
        </section>

        <section className='portFooter__nav__right' ref={footerNavigationRight}>
          <CurrentTimeCDT />
        </section>
      </nav>
    </footer>
  );
};

export default PortFooter;
