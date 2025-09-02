import { useEffect, useRef } from 'react';
import ProjectHub from './projects/ProjectHub';
import Contact from './contact/Contact';
import { usePortfolioContext } from '~/portfolio/context/PortfolioContext';
import ProjectInsights from '~/portfolio/features/insights/ProjectInsights';

/** Component */
export default function PortfolioContainer() {
  const { featureState } = usePortfolioContext();

  /** @references */
  const portfolioRef = useRef<HTMLDivElement>(null);

  /**
   * @function useFeatureScroll
   * @description Scrolls to a specific child in the portfolio grid
   */
  const useFeatureScroll = (index: number, behavior: ScrollBehavior): void => {
    const delay: 0 | 400 = Object.values(featureState).some(Boolean) ? 400 : 0;

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

  /** Portfolio */
  return (
    <div
      className='portfolio'
      ref={portfolioRef}>
      <ProjectHub />
      <ProjectInsights />
      <Contact />
    </div>
  );
}
