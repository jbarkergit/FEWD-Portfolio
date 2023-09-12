import { Dispatch, SetStateAction } from 'react';

type ProjectDetailsType = {
  projectDetail: boolean;
  setProjectDetail: Dispatch<SetStateAction<boolean>>;
};

const ProjectDetails = ({ projectDetail, setProjectDetail }: ProjectDetailsType) => {
  return (
    <>
      <div>ProjectDetails</div>
    </>
  );
};
export default ProjectDetails;
