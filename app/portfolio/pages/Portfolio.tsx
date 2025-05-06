import { useCallback, useEffect, useRef, useState } from 'react';
import type { MutableRefObject } from 'react';
import PortMobileMenu from '../components/mobile-menu/PortMobileMenu';
import ProjectInsights from '../features/ProjectInsights';
import ProjectHub from '../features/ProjectHub';
import Contact from '../features/Contact';

/** Component */
const Portfolio = () => {
  /** @state Active Project Slide Index Tracker */
  const [projectSlideIndex, setProjectSlideIndex] = useState<number>(0);

  /** @state Active grid position tracker */
  const [featureState, setFeatureState] = useState<Record<string, boolean>>({
    projectDetailsActive: false,
    contactFormActive: false,
  });

  /** @state Carousel navigation menu */
  const [portMobileMenu, setPortMobileMenu] = useState<boolean>(false);

  /** @references */
  const portfolioRef = useRef<HTMLDivElement>(null);
  const portMobileMenuRefReceiver = useRef<HTMLElement | null>(null);

  /**
   * @function useFeatureScroll
   * @description Scrolls to a specific child in the portfolio grid
   */
  const useFeatureScroll = (index: number, behavior: ScrollBehavior): void => {
    const delay: 0 | 660 = Object.values(featureState).some(Boolean) ? 660 : 0;

    setTimeout(() => {
      const project = portfolioRef.current?.children[index] as HTMLElement | undefined;

      if (project) {
        portfolioRef.current?.scrollTo({
          left: project.offsetLeft,
          top: project.offsetTop,
          behavior,
        });
      }
    }, delay);
  };

  /**
   * @function getActiveGridIndex
   * @description Determines the active grid index based on feature state
   */
  const getActiveGridIndex = (index?: number): number => {
    if (featureState.projectDetailsActive) return 1;
    if (featureState.contactFormActive) return 2;
    return index ?? 0;
  };

  /**
   * @function useFeatureScrollHandler
   * @description Handles scroll behavior based on state or argument index
   */
  const useFeatureScrollHandler = (behavior: ScrollBehavior, index?: number): void => {
    const activeIndex = getActiveGridIndex(index);
    useFeatureScroll(activeIndex, behavior);
  };

  /**
   * @function useEffect
   * @description Triggers scroll animation on mount and handles scroll position on window resize
   */
  useEffect(() => {
    useFeatureScrollHandler('smooth');

    const handleResize = () => {
      const activeIndex = getActiveGridIndex();
      useFeatureScrollHandler('instant', activeIndex);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [featureState]);

  /**
   * @function usePortMobileMenu
   * @description Handles attributes for menu
   */
  const usePortMobileMenu = useCallback((): void => {
    if (!portMobileMenuRefReceiver.current) return;
    portMobileMenuRefReceiver.current.setAttribute('data-status', !portMobileMenu ? 'active' : 'false');
    setPortMobileMenu((state) => !state);
  }, []);

  /** Portfolio */
  return (
    <div className='portfolio' ref={portfolioRef}>
      <ProjectHub
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        featureState={featureState}
        setFeatureState={setFeatureState}
        portMobileMenuRefReceiver={portMobileMenuRefReceiver}
        usePortMobileMenu={usePortMobileMenu}
      />
      <ProjectInsights
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        featureState={featureState}
        setFeatureState={setFeatureState}
      />
      <Contact />
      <PortMobileMenu ref={portMobileMenuRefReceiver} setProjectSlideIndex={setProjectSlideIndex} usePortMobileMenu={usePortMobileMenu} />
    </div>
  );
};

export default Portfolio;
