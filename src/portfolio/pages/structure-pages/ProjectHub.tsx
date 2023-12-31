import { Dispatch, SetStateAction } from 'react';
import PortHeader from '../../components/project-hub/navigation/PortHeader';
import ProjectCarousel from '../../components/project-hub/carousel/ProjectCarousel';
import PortFooter from '../../components/project-hub/navigation/PortFooter';

type ProjectHubType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const ProjectHub = ({ projectSlideIndex, setProjectSlideIndex, featureState, setFeatureState }: ProjectHubType) => {
  return (
    <section className='projectHub'>
      <h2>Project hub</h2>
      <PortHeader projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
      <ProjectCarousel
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        featureState={featureState}
        setFeatureState={setFeatureState}
      />
      <PortFooter projectSlideIndex={projectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
    </section>
  );
};
export default ProjectHub;
