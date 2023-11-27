import { Dispatch, SetStateAction } from 'react';
import PortHeader from '../navigation/header/PortHeader';
import ProjectCarousel from './carousel/ProjectCarousel';
import PortFooter from '../navigation/footer/PortFooter';

type ProjectHubType = {
  mountAnimation: boolean;
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: {
    projectDetailsActive: boolean;
    contactFormActive: boolean;
    techStackActive: boolean;
  };
  setFeatureState: Dispatch<
    SetStateAction<{
      projectDetailsActive: boolean;
      contactFormActive: boolean;
      techStackActive: boolean;
    }>
  >;
};

const ProjectHub = ({ mountAnimation, projectSlideIndex, setProjectSlideIndex, featureState, setFeatureState }: ProjectHubType) => {
  return (
    <section className='projectHub'>
      <h2>Project hub</h2>
      <PortHeader
        mountAnimation={mountAnimation}
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        featureState={featureState}
        setFeatureState={setFeatureState}
      />
      <ProjectCarousel mountAnimation={mountAnimation} projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} />
      <PortFooter mountAnimation={mountAnimation} projectSlideIndex={projectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
    </section>
  );
};
export default ProjectHub;
