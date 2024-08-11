import { forwardRef } from 'react';

const FDMenuAccount = forwardRef<HTMLElement, {}>(({}, menuAccountRef) => {
  return (
    <section className='fdMenuAccount' ref={menuAccountRef}>
      FDMenuAccount
    </section>
  );
});

export default FDMenuAccount;
