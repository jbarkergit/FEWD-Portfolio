import { Dispatch, SetStateAction } from 'react';
import EcommerceExtendedInfo from '../../assets/production-data/EcommerceExtendedInfo';
import EcommerceAbridgedInfo from '../../assets/production-data/EcommerceAbridgedInfo';

type ProjectDetailsType = {
  projectDetail: string;
  setProjectDetail: Dispatch<SetStateAction<string>>;
  stateIndex: number;
};

const ProjectDetails = ({ projectDetail, setProjectDetail, stateIndex }: ProjectDetailsType) => {
  const useProjectInfo = (): {
    extended: JSX.Element;
    summary: JSX.Element;
  } | null => {
    switch (stateIndex) {
      case 0:
        return { extended: <EcommerceExtendedInfo />, summary: <EcommerceAbridgedInfo /> };
      default:
        return null;
    }
  };

  if (projectDetail !== '')
    return (
      <section className='projectDetails'>
        {projectDetail === 'projectOverview' || projectDetail === 'projectSummary' ? (
          <button className='projectDetails__close' onClick={() => setProjectDetail('')}>
            <svg xmlns='http://www.w3.org/2000/svg' width='1.5em' height='1.5em' viewBox='0 0 24 24'>
              <path
                fill='#ffffff'
                d='M21.29 4.12L16.7 8.71l1.59 1.59c.63.63.18 1.71-.71 1.71H13c-.55 0-1-.45-1-1v-4.6c0-.89 1.08-1.34 1.71-.71l1.59 1.59l4.59-4.59a.996.996 0 0 1 1.41 0c.38.4.38 1.03-.01 1.42zM4.12 21.29l4.59-4.59l1.59 1.59c.63.63 1.71.18 1.71-.71V13c0-.55-.45-1-1-1h-4.6c-.89 0-1.34 1.08-.71 1.71l1.59 1.59l-4.59 4.59a.996.996 0 0 0 0 1.41c.4.38 1.03.38 1.42-.01z'></path>
            </svg>
          </button>
        ) : null}
        {projectDetail === 'projectOverview' ? useProjectInfo()?.extended : null}
        {projectDetail === 'projectSummary' ? useProjectInfo()?.summary : null}
      </section>
    );
};

export default ProjectDetails;
