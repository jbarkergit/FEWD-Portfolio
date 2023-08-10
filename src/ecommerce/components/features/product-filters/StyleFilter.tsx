import { useRef, useEffect, useState } from 'react';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const StyleFilter = (): JSX.Element | undefined => {
  // @ts-ignore
  const { categoryFilter, setCategoryFilter } = useCategoryFilterContext();
  const categorySetter = (company: string) => setCategoryFilter(company);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const selectMenuRef = useRef<HTMLDivElement>(null),
    accordionRef = useRef<HTMLUListElement>(null);

  useEffect(() => accordionRef.current?.setAttribute('data-status', modalOpen ? 'active' : 'false'), [modalOpen]);

  useEffect(() => {
    const toggleModal = (e: PointerEvent) => {
      if (selectMenuRef.current && selectMenuRef.current.contains(e.target as HTMLElement)) setModalOpen(true);
    };
    const handleButtons = (e: PointerEvent) => {
      const target = e.target as HTMLButtonElement;
      if (accordionRef.current && accordionRef.current?.contains(target)) categorySetter(target.className);
    };
    const handleExteriorClick = (e: PointerEvent): void => {
      if (selectMenuRef.current && !selectMenuRef.current.contains(e.target as HTMLElement)) setModalOpen(false);
    };

    selectMenuRef.current?.addEventListener('pointerdown', toggleModal);
    accordionRef.current?.addEventListener('pointerdown', handleButtons);
    document.body.addEventListener('pointerdown', handleExteriorClick);

    return () => {
      selectMenuRef.current?.removeEventListener('pointerdown', toggleModal);
      document.body.removeEventListener('pointerdown', handleExteriorClick);
    };
  }, [categoryFilter]);

  switch (categoryFilter) {
    case 'headphones':
    case 'Beyerdynamic':
    case 'openbackheadphones':
    case 'semiopenheadphones':
    case 'closedbackheadphones':
      return (
        <div className="selectMenu">
          <div className="selectMenu__selection" ref={selectMenuRef}>
            <span className="selectMenu__selection__indicator">
              <span className="selectMenu__selection__indicator--area">Filter by Style</span>
              <span className="selectMenu__selection__indicator--area">
                <svg xmlns="http://www.w3.org/2000/svg" width="0.79em" height="1.25em" viewBox="0 0 320 512">
                  <path
                    fill="#ffffff"
                    d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41zm255-105L177 64c-9.4-9.4-24.6-9.4-33.9 0L24 183c-15.1 15.1-4.4 41 17 41h238c21.4 0 32.1-25.9 17-41z"
                  ></path>
                </svg>
              </span>
            </span>
            <div className="selectMenu--divider"></div>
          </div>
          <ul className="selectMenu__accordion" data-status="false" ref={accordionRef}>
            <li className="selectMenu__accordion--option" key="openbackheadphone">
              <button className="openbackheadphones">{'Open-Back'}</button>
            </li>
            <li className="selectMenu__accordion--option" key="semiopenheadphone">
              <button className="semiopenheadphones">{'Semi-Open'}</button>
            </li>
            <li className="selectMenu__accordion--option" key="closedbackheadphone">
              <button className="closedbackheadphones">{'Closed-Back'}</button>
            </li>
          </ul>
        </div>
      );
    default:
      null;
  }
};

export default StyleFilter;
