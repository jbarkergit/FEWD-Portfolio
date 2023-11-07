import { Dispatch, SetStateAction } from 'react';

export type indexStateType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
};
