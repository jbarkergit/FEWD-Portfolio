import { useEffect, useRef } from 'react';
import EcommerceInsights from './components/EcommerceInsights';
import { myProjects } from '../../assets/projects-data/myProjects';

type ProjectDetailsType = { projectSlideIndex: number };

const ProjectDetails = ({ projectSlideIndex }: ProjectDetailsType) => {
  const useProjectInsights = () => {
    switch (projectSlideIndex) {
      case 0:
        return <EcommerceInsights />;
      default:
        break;
    }
  };

  const project = myProjects[projectSlideIndex];

  const useProjectTechnologies = () => {
    if (project && project.technologies) return Object.entries(project.technologies);
    else return [];
  };

  /** Handle page scrolling */
  const projectDetailsRef = useRef<HTMLElement>(null);
  const projectInsightsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const useInsightScroll = (event: WheelEvent) => projectInsightsRef.current?.scrollBy({ top: event.deltaY, behavior: 'smooth' });
    projectDetailsRef?.current?.addEventListener('wheel', useInsightScroll);
    return () => projectDetailsRef?.current?.removeEventListener('wheel', useInsightScroll);
  }, []);

  return (
    <section className='projectDetails' ref={projectDetailsRef}>
      <article className='projectDetails__article'>
        <section className='projectDetails__article__general'>
          <div className='projectDetails__article__general__title'>
            <h2>{project.key} Insights</h2>
          </div>

          <div className='projectDetails__article__general__technology'>
            <>
              {useProjectTechnologies().map(([category, techArray]) => (
                <div key={category}>
                  <span>{category}</span>
                  {techArray.map((technology) => (
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

        <section className='projectDetails__article__insights' ref={projectInsightsRef}>
          {useProjectInsights()}
        </section>

        <div className='projectDetails__article__menu'>
          <div className='projectDetails__article__menu__return'></div>
          <div className='projectDetails__article__menu__selection'></div>
        </div>
      </article>
    </section>
  );
};

export default ProjectDetails;
