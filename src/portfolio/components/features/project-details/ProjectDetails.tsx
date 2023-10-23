import { Dispatch, SetStateAction } from 'react';
import EcommerceExtendedInfo from './project-information/EcommerceExtendedInfo';
import EcommerceAbridgedInfo from './project-information/EcommerceAbridgedInfo';

type ProjectDetailsType = { projectSlideIndex: number; projectInfoStyle: string; setProjectInfoStyle: Dispatch<SetStateAction<string>> };

const ProjectDetails = ({ projectSlideIndex, projectInfoStyle, setProjectInfoStyle }: ProjectDetailsType) => {
  const useProjectInfo = (): {
    extended: JSX.Element;
    summary: JSX.Element;
  } | null => {
    switch (projectSlideIndex) {
      case 0:
        return {
          extended: <EcommerceExtendedInfo projectDetail={projectInfoStyle} setProjectDetail={setProjectInfoStyle} />,
          summary: <EcommerceAbridgedInfo projectDetail={projectInfoStyle} setProjectDetail={setProjectInfoStyle} />,
        };
      default:
        return null;
    }
  };

  if (projectInfoStyle !== '' && projectSlideIndex !== 1)
    return (
      <section className='projectDetails'>
        {projectInfoStyle === 'projectOverview' || projectInfoStyle === 'projectSummary' ? (
          <button className='projectDetails__close' aria-label='Close Project Details' onClick={() => setProjectInfoStyle('')}>
            <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
              <path
                fill='#ffffff'
                d='M21.29 4.12L16.7 8.71l1.59 1.59c.63.63.18 1.71-.71 1.71H13c-.55 0-1-.45-1-1v-4.6c0-.89 1.08-1.34 1.71-.71l1.59 1.59l4.59-4.59a.996.996 0 0 1 1.41 0c.38.4.38 1.03-.01 1.42zM4.12 21.29l4.59-4.59l1.59 1.59c.63.63 1.71.18 1.71-.71V13c0-.55-.45-1-1-1h-4.6c-.89 0-1.34 1.08-.71 1.71l1.59 1.59l-4.59 4.59a.996.996 0 0 0 0 1.41c.4.38 1.03.38 1.42-.01z'></path>
            </svg>
          </button>
        ) : null}
        {projectInfoStyle === 'projectOverview' ? useProjectInfo()?.extended : null}
        {projectInfoStyle === 'projectSummary' ? useProjectInfo()?.summary : null}
      </section>
    );
};

export default ProjectDetails;
