import { useEffect, useState } from 'react';
import PortHeader from '../components/navigation/header/PortHeader';
import MainContent from '../components/main/MainContent';
import PortFooter from '../components/navigation/footer/PortFooter';
import ProjectDetails from '../components/project-details/ProjectDetails';

const Portfolio = (): JSX.Element => {
  const [stateIndex, setStateIndex] = useState<number>(0);
  const [projectDetail, setProjectDetail] = useState<string>('');
  const [projectDetailOpen, setProjectDetailOpen] = useState<boolean>(false);

  useEffect(() => (projectDetail !== '' ? setProjectDetailOpen(true) : setProjectDetailOpen(false)), [projectDetail]);

  return (
    <div id='portfolio' style={projectDetailOpen ? { height: 'auto' } : { height: '100vh' }}>
      <PortHeader stateIndex={stateIndex} setStateIndex={setStateIndex} />
      <ProjectDetails projectDetail={projectDetail} setProjectDetail={setProjectDetail} stateIndex={stateIndex} />
      <MainContent stateIndex={stateIndex} setStateIndex={setStateIndex} projectDetail={projectDetail} />
      <PortFooter stateIndex={stateIndex} projectDetail={projectDetail} setProjectDetail={setProjectDetail} />
    </div>
  );
};

export default Portfolio;
