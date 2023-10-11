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
          Prefer a shorter read? <button onClick={() => setProjectDetail('projectSummary')}>{'Click here!'}</button>
        </>
      ) : (
        <>
          Prefer to read with developer insights? <button onClick={() => setProjectDetail('projectOverview')}>{'Click here!'}</button>
        </>
      )}
    </nav>
  );
};

export default RequestInformationStyle;
