import { forwardRef, type FC, type ReactNode } from 'react';
import FDModalParent from '../components/FDModalParent';

type Type_PropDrill = {
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const FDAccountReset = forwardRef<HTMLUListElement, Type_PropDrill>(({ setModal }, resetRefReceiver) => {
  return (
    <FDModalParent>
      <ul className='fdAccountModal__modals__form__fieldset__ul' ref={resetRefReceiver} data-visible='false'>
        FDAccountReset
      </ul>
    </FDModalParent>
  );
});

export default FDAccountReset;
