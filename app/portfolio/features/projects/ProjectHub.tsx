import ProjectCarousel from './carousel/ProjectCarousel';
import PortFooter from '../../components/navigation/desktop/PortFooter';
import PortHeader from '../../components/navigation/desktop/PortHeader';

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
