import { forwardRef } from 'react';

type Type_PropDrill = {
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const FDAccountReset = forwardRef<HTMLUListElement, Type_PropDrill>(({ setModal }, resetRefReceiver) => {
  return (
    <ul className='fdAccountModal__form__fieldset__ul' ref={resetRefReceiver} data-visible='false'>
      FDAccountReset
    </ul>
  );
});

export default FDAccountReset;
