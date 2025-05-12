import type { FC, ReactNode } from 'react';

const FDModalParent: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <form className='fdAccountModal__modals__form'>
      <fieldset className='fdAccountModal__modals__form__fieldset'>{children}</fieldset>
    </form>
  );
};
export default FDModalParent;
