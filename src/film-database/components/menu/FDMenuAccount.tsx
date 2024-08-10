import { forwardRef } from 'react';

const FDMenuAccount = forwardRef<HTMLElement, {}>(({}, menuAccountRef) => {
  return <section ref={menuAccountRef}>FDMenuAccount</section>;
});

export default FDMenuAccount;
