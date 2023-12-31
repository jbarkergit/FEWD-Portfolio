import { Dispatch, RefObject, SetStateAction, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectDatabase } from '../../../assets/data/project-database/projectDatabase';

type ProjectNavPropType = {
  projectSlideIndex: number;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const PortFooter = ({ projectSlideIndex, featureState, setFeatureState }: ProjectNavPropType) => {
  const footerNavigationLeft = useRef<HTMLElement>(null);
  const footerNavigationRight = useRef<HTMLElement>(null);

  const [navigationIndicator, setNavigationIndicator] = useState({
    key: projectDatabase[projectSlideIndex].key,
    insights: 'Project Insights',
    demoLink: 'Demo Link',
  });

  useEffect(() => {
    const setFooterDataAttr = (transitionStatus: string) => {
      footerNavigationLeft.current?.setAttribute('data-transition', transitionStatus);
    };

    footerNavigationLeft.current?.getAttribute('data-transition') === 'false' ? setFooterDataAttr('true') : setFooterDataAttr('false');

    setTimeout(() => {
      if (projectDatabase[projectSlideIndex].key !== '' && projectDatabase[projectSlideIndex].url !== '') {
        setNavigationIndicator({ key: projectDatabase[projectSlideIndex].key, insights: 'Project Insights', demoLink: 'Demo Link' });
      } else if (projectDatabase[projectSlideIndex].key !== '' && projectDatabase[projectSlideIndex].url === '') {
        setNavigationIndicator({ key: projectDatabase[projectSlideIndex].key, insights: 'Project Insights', demoLink: '' });
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

  /** Timezone CDT */
  const [currentTime, setCurrentTime] = useState('');

  const getTime = () => {
    setCurrentTime(
      new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour12: true,
        hour: 'numeric',
        minute: '2-digit',
      })
    );
  };

  useEffect(() => {
    getTime();
    const interval = setInterval(getTime, 60000);
    return () => clearInterval(interval);
  }, []);

  /** TSX */
  return (
    <footer className='carouselNav'>
      <section className='carouselNav__section'>
        <nav className='carouselNav__section__left' aria-labelledby='project-links' ref={footerNavigationLeft}>
          <h2 data-status='visible'>{navigationIndicator.key}</h2>
          <button
            id='project-links'
            aria-label='Open Project Insights'
            onClick={() =>
              featureState.projectDetailsActive
                ? setFeatureState({ ...featureState, projectDetailsActive: false })
                : setFeatureState({ ...featureState, projectDetailsActive: true })
            }>
            {navigationIndicator.insights}
          </button>
          <Link to={projectDatabase[projectSlideIndex].url} id='project-links' aria-label='Project Demo Link'>
            {navigationIndicator.demoLink}
          </Link>
        </nav>
      </section>

      <section className='carouselNav__section' ref={footerNavigationRight}>
        <div className='carouselNav__section__right'>
          <span className='carouselNav__section__right--timezone'>
            {currentTime} • CDT (GMT-5) <h2 style={{ display: 'none' }}>Current time in Central Daylight Time, GMT-5</h2>
          </span>
        </div>
      </section>
    </footer>
  );
};

export default PortFooter;
