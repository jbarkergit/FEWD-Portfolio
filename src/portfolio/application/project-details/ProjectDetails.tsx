import EcommerceExtendedInfo from './components/EcommerceExtendedInfo';
import EcommerceAbridgedInfo from './components/EcommerceAbridgedInfo';
import { myProjects } from '../../assets/projects-data/myProjects';

type ProjectDetailsType = { projectSlideIndex: number };

const ProjectDetails = ({ projectSlideIndex }: ProjectDetailsType) => {
  const useProjectInfo = () => {
    switch (projectSlideIndex) {
      case 0:
        return {
          extended: <EcommerceExtendedInfo />,
          summary: <EcommerceAbridgedInfo />,
        };
      default:
        break;
    }
  };

  const project = myProjects[projectSlideIndex];

  return (
    <section className='projectDetails'>
      <article className='projectDetails__article'>
        <section className='projectDetails__article__general'>
          <div className='projectDetails__article__general__title'>
            <h2>{project.key} Insights</h2>
          </div>

          <div className='projectDetails__article__general__technology'>
            <>
              {Object.entries(project.technologies!).map(([category, techArray]) => (
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

        <section className='projectDetails__article__insights'>
          {useProjectInfo()?.extended}
          {useProjectInfo()?.summary}
        </section>

        {/* <div className='projectDetails__menu'></div> */}
      </article>
    </section>
  );
};

export default ProjectDetails;
