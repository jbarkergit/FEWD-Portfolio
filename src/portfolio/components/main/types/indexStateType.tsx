import { Dispatch, SetStateAction } from 'react';

export type indexStateType = {
  mountAnimation: boolean;
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
};
