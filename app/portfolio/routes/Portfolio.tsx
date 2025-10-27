import { useRef } from 'react';
import { FeatureStateProvider } from '~/portfolio/context/FeatureStateContext';
import { ProjectSlideIndexProvider } from '~/portfolio/context/ProjectSlideContext';
import PortGrid from '~/portfolio/features/PortGrid';

export default function () {
  const portfolioRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className='portfolio'
      ref={portfolioRef}>
      <FeatureStateProvider>
        <ProjectSlideIndexProvider>
          <PortGrid portfolioRef={portfolioRef} />
        </ProjectSlideIndexProvider>
      </FeatureStateProvider>
    </div>
  );
}
