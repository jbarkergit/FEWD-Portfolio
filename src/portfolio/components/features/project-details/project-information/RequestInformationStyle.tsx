import { Dispatch, SetStateAction } from 'react';

// Prop drill from EcommerceExtendedInfo
type PropType = {
  projectDetail: string;
  setProjectDetail: Dispatch<SetStateAction<string>>;
};

const RequestInformationStyle = ({ projectDetail, setProjectDetail }: PropType) => {
  return (
    <nav className='projectDetails__projectOverview__nav'>
      {projectDetail === 'projectOverview' ? (
        <>
          Prefer a shorter read?{' '}
          <button aria-label='Click here to view a condensed article on this project' onClick={() => setProjectDetail('projectSummary')}>
            {'Click here!'}
          </button>
        </>
      ) : (
        <>
          Interested in a read with developer insights?{' '}
          <button aria-label='Click here to read an article with developer insights on this project' onClick={() => setProjectDetail('projectOverview')}>
            {'Click here!'}
          </button>
        </>
      )}
    </nav>
  );
};

export default RequestInformationStyle;
