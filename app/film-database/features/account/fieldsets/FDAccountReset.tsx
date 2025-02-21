import { forwardRef, type FC, type ReactNode } from 'react';

type Type_PropDrill = {
  ModalParent: FC<{ children: ReactNode }>;
  setModal: React.Dispatch<React.SetStateAction<'signin' | 'registry' | 'reset'>>;
};

const FDAccountReset = forwardRef<HTMLUListElement, Type_PropDrill>(({ ModalParent, setModal }, resetRefReceiver) => {
  return (
    <ModalParent>
      <ul className='fdAccountModal__form__fieldset__ul' ref={resetRefReceiver} data-visible='false'>
        FDAccountReset
      </ul>
    </ModalParent>
  );
});

export default FDAccountReset;
