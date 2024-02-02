import { Dispatch, MutableRefObject, SetStateAction } from 'react';
import PortHeader from '../../components/project-hub/navigation/PortHeader';
import ProjectCarousel from '../../components/project-hub/carousel/ProjectCarousel';
import PortFooter from '../../components/project-hub/navigation/PortFooter';

type ProjectHubType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
  portMobileMenu: boolean;
  setPortMobileMenu: Dispatch<SetStateAction<boolean>>;
  portMobileMenuRef: MutableRefObject<HTMLElement | null>;
};

const ProjectHub = ({
  projectSlideIndex,
  setProjectSlideIndex,
  featureState,
  setFeatureState,
  portMobileMenu,
  setPortMobileMenu,
  portMobileMenuRef,
}: ProjectHubType) => {
  return (
    <section className='projectHub'>
      <h2>Project hub</h2>
      <PortHeader
        projectSlideIndex={projectSlideIndex}
        setProjectSlideIndex={setProjectSlideIndex}
        featureState={featureState}
        setFeatureState={setFeatureState}
        portMobileMenu={portMobileMenu}
        setPortMobileMenu={setPortMobileMenu}
        portMobileMenuRef={portMobileMenuRef}
      />
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
