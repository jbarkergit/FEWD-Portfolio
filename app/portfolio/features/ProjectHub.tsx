import ProjectCarousel from '../components/project-hub/carousel/ProjectCarousel';
import PortFooter from '../components/project-hub/navigation/PortFooter';
import PortHeader from '../components/project-hub/navigation/PortHeader';

const ProjectHub = ({ usePortMobileMenu }: { usePortMobileMenu: () => void }) => {
  return (
    <section className='projectHub'>
      <h2>Project hub</h2>
      <PortHeader usePortMobileMenu={usePortMobileMenu} />
      <ProjectCarousel />
      <PortFooter />
    </section>
  );
};
export default ProjectHub;
