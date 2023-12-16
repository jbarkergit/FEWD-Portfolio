import { useEffect, useReducer, useRef, useState } from 'react';
import { myProjects } from '../../assets/projects-data/myProjects';
import EcommerceInsights from './data/EcommerceInsights';
import PortfolioInsights from './data/PortfolioInsights';

/** Types */
type ProjectDetailsType = { projectSlideIndex: number };

type StateType = {
  pointerDown: boolean;
  initPageY: number;
  pageY: number;
  prevTrackPos: number;
  trackPos: number;
  style: React.CSSProperties;
};

type ActionType =
  | { type: 'POINTER_DOWN'; pointerDown: boolean; initPageY: number; pageY: number }
  | { type: 'POINTER_MOVE'; pointerDown: boolean; pageX: number }
  | { type: 'POINTER_LEAVE'; pointerDown: boolean; previousTrackPos: number }
  | { type: 'POINTER_UP'; pointerDown: boolean; previousTrackPos: number };

/** Component */
const ProjectDetails = ({ projectSlideIndex }: ProjectDetailsType) => {
  /** Project information */
  const useProjectInsights = () => {
    switch (projectSlideIndex) {
      case 0:
        return <EcommerceInsights />;
      case 1:
        return <PortfolioInsights />;
      default:
        break;
    }
  };

  /** Active project data */
  const project = myProjects[projectSlideIndex];

  const useProjectTechnologies = () => {
    if (project && project.technologies) return Object.entries(project.technologies);
    else return [];
  };

  /** Page scroll */
  const projectDetails = useRef<HTMLElement>(null);
  const insights = useRef<HTMLElement>(null);

  useEffect(() => {
    const useInsightScroll = (event: WheelEvent) => insights.current?.scrollBy({ top: event.deltaY, behavior: 'smooth' });

    projectDetails.current?.addEventListener('wheel', useInsightScroll);
    return () => projectDetails.current?.removeEventListener('wheel', useInsightScroll);
  }, []);

  /** Carousel */
  const carousel = useRef<HTMLElement>(null);

  const carouselSlides = useRef<HTMLElement[]>([]);
  const carouselSlide = (reference: HTMLElement) => {
    if (reference && !carouselSlides.current.includes(reference)) carouselSlides.current.push(reference);
  };

  const carouselState: StateType = {
    pointerDown: false,
    initPageY: 0,
    pageY: 0,
    prevTrackPos: 0,
    trackPos: 0,
    style: { transform: `translateY(0px)` },
  };

  const reducer = (state: StateType, action: ActionType): StateType => {
    switch (action.type) {
      case 'POINTER_DOWN':
        return { ...carouselState };

      case 'POINTER_MOVE':
        return { ...carouselState };

      case 'POINTER_LEAVE':
      case 'POINTER_UP':
        return { ...carouselState };

      default:
        throw new Error('FAILURE: Action Type may be missing or returning null');
    }
  };

  const [state, dispatch] = useReducer(reducer, carouselState);

  useEffect(() => {
    const userPointerDown = () => {
      dispatch({ type: 'POINTER_DOWN' });
    };

    const userPointerMove = () => {
      dispatch({ type: 'POINTER_MOVE' });
    };

    const userPointerLeave = () => {
      dispatch({ type: 'POINTER_LEAVE' });
    };

    const userPointerUp = () => {
      dispatch({ type: 'POINTER_UP' });
    };

    /** Event Listeners Mount */
    carousel.current?.addEventListener('pointerdown', userPointerDown);
    carousel.current?.addEventListener('pointermove', userPointerMove);
    carousel.current?.addEventListener('pointerleave', userPointerLeave);
    carousel.current?.addEventListener('pointerup', userPointerUp);

    /** Event Listeners Unmount */
    return () => {
      carousel.current?.removeEventListener('pointerdown', userPointerDown);
      carousel.current?.removeEventListener('pointermove', userPointerMove);
      carousel.current?.removeEventListener('pointerleave', userPointerLeave);
      carousel.current?.removeEventListener('pointerup', userPointerUp);
    };
  }, []);

  return (
    <section className='projectDetails' ref={projectDetails}>
      <article className='projectDetails__article'>
        <section className='projectDetails__article__general'>
          <div className='projectDetails__article__general__header'>
            <button>
              <span>{project.key}</span>
              <span>Insights</span>
            </button>
          </div>

          <div className='projectDetails__article__general__technology'>
            <>
              {useProjectTechnologies().map(([category, techArray]) => (
                <div key={category}>
                  <span>{category}</span>
                  {techArray.map((technology: string) => (
                    <span
                      className={`projectDetails__article__general__technology--tech projectDetails__article__general__technology--${technology}`}
                      key={`${category}-${technology}`}>
                      {technology}
                    </span>
                  ))}
                </div>
              ))}
            </>
          </div>
        </section>

        <section className='projectDetails__article__projects' ref={carousel}>
          {myProjects.map((project) => (
            <figure key={project.key} ref={carouselSlide}>
              <picture>
                <img src={project.posterSrc} decoding='async' fetchpriority='high' tabIndex={0} alt={project.imgAlt} />
                <figcaption>{project.imgAlt}</figcaption>
              </picture>
            </figure>
          ))}
        </section>

        <section className='projectDetails__article__insights' ref={insights}>
          <div className='projectDetails__article__insights__projectOverview'>{useProjectInsights()}</div>
        </section>
      </article>
    </section>
  );
};

export default ProjectDetails;
