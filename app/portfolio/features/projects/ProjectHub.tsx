import ProjectCarousel from './carousel/ProjectCarousel';
import PortFooter from '../navigation/PortFooter';
import PortHeader from '../navigation/PortHeader';

const ProjectHub = () => {
  return (
    <section className='projectHub'>
      <h2>Project hub</h2>
      <PortHeader />
      <ProjectCarousel />
      <PortFooter />
    </section>
  );
};
export default ProjectHub;
