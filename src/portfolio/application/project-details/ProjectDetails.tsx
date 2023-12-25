import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { myProjects } from '../../assets/projects-data/myProjects';

type PropDrillType = { projectSlideIndex: number; featureState: Record<string, boolean>; setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>> };

/** Component */
const ProjectDetails = ({ projectSlideIndex, featureState, setFeatureState }: PropDrillType) => {
  /** Page scroll anywhere */
  const projectDetails = useRef<HTMLElement>(null);
  const insights = useRef<HTMLElement>(null);

  useEffect(() => {
    const useInsightScroll = (e: WheelEvent) => {
      insights.current?.scrollBy({ top: e.deltaY, behavior: 'smooth' });
    };

    projectDetails.current?.addEventListener('wheel', useInsightScroll);

    return () => projectDetails.current?.removeEventListener('wheel', useInsightScroll);
  }, []);

  /** JSX */
  return (
    <section className='projectDetails' ref={projectDetails}>
      <section className='projectDetails__general'>
        <div className='projectDetails__general__header'>
          <div>
            <span>{myProjects[projectSlideIndex].key}</span>
            <span>Insights</span>
          </div>
        </div>
        <div className='projectDetails__general__return'>
          <button aria-label='Return to project hub' onClick={() => setFeatureState({ ...featureState, projectDetailsActive: false })}>
            <svg xmlns='http://www.w3.org/2000/svg' width='3em' height='3em' viewBox='0 0 24 24'>
              <path
                fill='#ffffff'
                d='M9.42 7.41L4.83 12l4.59 4.59L8 18l-6-6l6-6zm6 0L10.83 12l4.59 4.59L14 18l-6-6l6-6zm6 0L16.83 12l4.59 4.59L20 18l-6-6l6-6z'></path>
            </svg>
          </button>
        </div>
        <div className='projectDetails__general__technology'>
          {Object.entries(myProjects[projectSlideIndex].technologies).map(([category, techArray]) => (
            <div className='projectDetails__general__technology__tech' key={category}>
              <div className='projectDetails__general__technology__tech--type'>{category.replace('_', ' ')}</div>
              {techArray.map((technology: string) => (
                <span className={`projectDetails__general__technology--tech projectDetails__general__technology--${technology}`} key={`${category}-${technology}`}>
                  {technology}{' '}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className='projectDetails__insights' ref={insights}>
        <article className='projectDetails__insights__projectOverview'>{myProjects[projectSlideIndex].insights}</article>
      </section>
    </section>
  );
};

export default ProjectDetails;
