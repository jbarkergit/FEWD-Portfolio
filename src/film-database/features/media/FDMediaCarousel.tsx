import { useEffect, useRef, useState } from 'react';

type Type_PropDrill = {
  carouselComponents: JSX.Element[];
  isMenuOpen: boolean;
};

const FDMediaCarousel = ({ carouselComponents, isMenuOpen }: Type_PropDrill) => {
  /** Carousel DeltaY scroll logic */
  const dataAttr: string = 'data-anim';
  const fdMediaRef = useRef<HTMLElement>(null);
  const carouselNodes: HTMLCollection | undefined = fdMediaRef.current?.children;

  // Update previously active and newly active carousel node's data-attr, navigate
  const deltaScrollCarousels = (deltaY: number): void => {
    if (!fdMediaRef.current || !carouselNodes) return;

    // Convert deltaY to 1 or -1 for incrementation/decrementation
    const deltaIndex: 1 | -1 = deltaY > 0 ? 1 : -1;

    // Get elements
    const carouselNodesArr: Element[] = [...carouselNodes];

    // Gather indexes
    const activeNodeIndex: number = [...fdMediaRef.current.children].findIndex((node: Element) => node.getAttribute(dataAttr) === 'active');
    const nextActiveNodeIndex: number = Math.max(0, Math.min(activeNodeIndex + deltaIndex, carouselNodesArr.length - 1));

    if (activeNodeIndex !== nextActiveNodeIndex) {
      const dataIndexTracker: string = 'data-anim';

      // Handle attributes
      if (nextActiveNodeIndex > activeNodeIndex) carouselNodesArr[activeNodeIndex].setAttribute(dataIndexTracker, 'disabled');
      carouselNodesArr[nextActiveNodeIndex].setAttribute(dataIndexTracker, 'active');

      // Get scroll position
      const nextActiveNodeOffsetTop: number = (carouselNodesArr[nextActiveNodeIndex] as HTMLElement).offsetTop;

      // Scroll
      // fdMediaRef.current.scrollTo({ top: nextActiveNodeOffsetTop, behavior: 'smooth' });
      fdMediaRef.current.style.top = `${nextActiveNodeOffsetTop * -1}px`;
    }
  };

  const handleWheel = (event: WheelEvent) => deltaScrollCarousels(event.deltaY);

  useEffect(() => {
    if (isMenuOpen) window.removeEventListener('wheel', handleWheel);
    else window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, [fdMediaRef.current, isMenuOpen]);

  /** Component */
  return (
    <main className='fdMedia' ref={fdMediaRef} style={{ top: '0px' }}>
      {...carouselComponents}
    </main>
  );
};

export default FDMediaCarousel;
