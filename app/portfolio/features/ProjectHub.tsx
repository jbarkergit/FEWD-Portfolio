import type { Dispatch, RefObject, SetStateAction } from 'react';
import ProjectCarousel from '../components/project-hub/carousel/ProjectCarousel';
import PortFooter from '../components/project-hub/navigation/PortFooter';
import PortHeader from '../components/project-hub/navigation/PortHeader';

type ProjectHubType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
  portMobileMenuRefReceiver: RefObject<HTMLElement | null>;
  usePortMobileMenu: () => void;
};

const ProjectHub = ({ projectSlideIndex, setProjectSlideIndex, featureState, setFeatureState, portMobileMenuRefReceiver, usePortMobileMenu }: ProjectHubType) => {
  return (
    <section className='projectHub'>
      <h2>Project hub</h2>
      <PortHeader
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        featureState={featureState}
        setFeatureState={setFeatureState}
        usePortMobileMenu={usePortMobileMenu}
      />
      <ProjectCarousel projectSlideIndex={projectSlideIndex} setProjectSlideIndex={setProjectSlideIndex} featureState={featureState} />
      <PortFooter projectSlideIndex={projectSlideIndex} featureState={featureState} setFeatureState={setFeatureState} />
    </section>
  );
};
export default ProjectHub;
