import { useRef, useEffect, useState } from 'react';
import Companies from './Companies';

const BrandFilter = (): JSX.Element => {
  const selectMenuRef = useRef<HTMLDivElement>(null!),
    accordionRef = useRef<HTMLUListElement>(null!);
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

  useEffect(() => {
    const useBrandFilter = (e: MouseEvent): void => {
      const target = e.target as HTMLElement;
      const isSelectMenuClicked = target.classList.contains('selectMenu__selection');
      console.log(target);
      console.log(isSelectMenuClicked);
      if (selectMenuRef.current && accordionRef.current) {
        isSelectMenuClicked && !isAccordionOpen ? setIsAccordionOpen(true) : null;
        isSelectMenuClicked && isAccordionOpen ? setIsAccordionOpen(false) : null;
      }
    };

    if (selectMenuRef.current) selectMenuRef.current.addEventListener('click', useBrandFilter);
    document.addEventListener('click', useBrandFilter);

    return () => {
      if (selectMenuRef.current) selectMenuRef.current.removeEventListener('click', useBrandFilter);
      document.removeEventListener('click', useBrandFilter);
    };
  }, [selectMenuRef.current, accordionRef.current]);

  useEffect(() => {
    if (accordionRef.current)
      isAccordionOpen ? accordionRef.current.setAttribute('data-status', 'active') : accordionRef.current.setAttribute('data-status', 'false');
  }, [isAccordionOpen]);

  return (
    <div className="selectMenu" ref={selectMenuRef}>
      <div className="selectMenu__selection">
        <span className="selectMenu__selection__indicator">
          <span className="selectMenu__selection__indicator--area">Filter by Brand</span>
          <span className="selectMenu__selection__indicator--area">
            <i className="fa-solid fa-sort"></i>
          </span>
        </span>
        <div className="selectMenu--divider"></div>
      </div>
      <ul className="selectMenu__accordion" data-status="false" ref={accordionRef}>
        <Companies />
      </ul>
    </div>
  );
};

export default BrandFilter;
