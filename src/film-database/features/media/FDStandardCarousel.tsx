import { useRef } from 'react';

type Type_PropDrill = {
  carouselComponents: JSX.Element[];
};

const FDStandardCarousel = ({ carouselComponents }: Type_PropDrill) => {
  /** Carousel DeltaY scroll logic */
  const dataIndexTracker: string = 'data-index-tracker';
  const fdMediaRef = useRef<HTMLElement>(null);
  const carouselNodes: HTMLCollection | undefined = fdMediaRef.current?.children;

  // Update previously active and newly active carousel node's data-attr, navigate
  const deltaScrollCarousels = (deltaY: number): void => {
    if (!fdMediaRef.current || !fdMediaRef.current || !carouselNodes) return;

    // Convert deltaY to 1 or -1 for incrementation/decrementation
    const deltaIndex: 1 | -1 = deltaY > 0 ? 1 : -1;

    // Get elements
    const carouselNodesArr: Element[] = [...carouselNodes];

    // Gather indexes
    const activeNodeIndex: number = [...fdMediaRef.current.children].findIndex((node: Element) => node.getAttribute(dataIndexTracker) === 'active');
    const nextActiveNodeIndex: number = Math.max(0, Math.min(activeNodeIndex + deltaIndex, carouselNodesArr.length - 1));

    if (activeNodeIndex !== nextActiveNodeIndex) {
      // Handle attributes
      if (nextActiveNodeIndex > activeNodeIndex) {
        carouselNodesArr[activeNodeIndex].setAttribute(dataIndexTracker, 'disabled');
      }

      carouselNodesArr[nextActiveNodeIndex].setAttribute(dataIndexTracker, 'active');

      // Get scroll position
      const nextActiveNodeOffsetTop: number = (carouselNodesArr[nextActiveNodeIndex] as HTMLElement).offsetTop;
      const firstNodePaddingTop: number = parseInt(window.getComputedStyle(carouselNodes[0] as HTMLElement).paddingTop);
      const scrollPosition: number = nextActiveNodeOffsetTop - firstNodePaddingTop;

      // Scroll
      fdMediaRef.current.scrollTo({ top: scrollPosition, behavior: 'smooth' });
    }
  };

  return (
    <main className='fdMedia' ref={fdMediaRef} onWheel={(event: React.WheelEvent<HTMLElement>) => deltaScrollCarousels(event.deltaY)}>
      {...carouselComponents}
    </main>
  );
};

export default FDStandardCarousel;
