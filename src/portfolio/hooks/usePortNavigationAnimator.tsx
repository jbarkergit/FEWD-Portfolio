import { MutableRefObject, RefObject } from 'react';

type SectionArray = MutableRefObject<HTMLElement[]> | RefObject<HTMLElement>[];

const iterateSections = (sections: HTMLElement[]) => {
  sections.forEach((section: HTMLElement) => section.setAttribute('data-status', 'fade-out'));
  setTimeout(() => sections.forEach((section: HTMLElement) => section.removeAttribute('data-status')), 500);
};

export const usePortNavigationAnimator = (sectionArray: SectionArray) => {
  if ('current' in sectionArray && sectionArray.current) {
    // Type MutableRefObject<HTMLElement[]>
    iterateSections(sectionArray.current);
  } else {
    // Type RefObject<HTMLElement>
    (sectionArray as RefObject<HTMLElement>[]).forEach((ref: RefObject<HTMLElement>) => {
      if (ref.current) iterateSections([ref.current]);
    });
  }
};
