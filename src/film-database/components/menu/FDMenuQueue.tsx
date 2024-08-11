import { forwardRef } from 'react';

const FDMenuQueue = forwardRef<HTMLElement, {}>(({}, menuQueueRef) => {
  return <section ref={menuQueueRef}>FDMenuQueue</section>;
});

export default FDMenuQueue;
