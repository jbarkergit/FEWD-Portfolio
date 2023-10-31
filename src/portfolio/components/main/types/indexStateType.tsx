import { Dispatch, SetStateAction } from 'react';

export type indexStateType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  mainAnimator: boolean;
  setMainAnimator: Dispatch<SetStateAction<boolean>>;
  layout: string;
  setLayout: Dispatch<SetStateAction<string>>;
};
