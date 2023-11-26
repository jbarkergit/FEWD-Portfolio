import { initSliderStateType } from '../types/initSliderStateType';

export const initState: initSliderStateType = {
  pointerDown: false,
  initPageX: 0,
  pageX: 0,
  trackPos: 0,
  previousTrackPos: 0,
  closestIndex: 0,
  style: { transform: `translateX(0px)` },
};
