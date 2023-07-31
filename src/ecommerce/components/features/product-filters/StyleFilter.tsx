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
    case 'headphone':
    case 'Beyerdynamic':
    case 'openbackheadphone':
    case 'semiopenheadphone':
    case 'closedbackheadphone':
      return (
        <div className="selectMenu">
          <div className="selectMenu__selection" ref={selectMenuRef}>
            <span className="selectMenu__selection__indicator">
              <span className="selectMenu__selection__indicator--area">Filter by Style</span>
              <span className="selectMenu__selection__indicator--area">
                <i className="fa-solid fa-sort"></i>
              </span>
            </span>
            <div className="selectMenu--divider"></div>
          </div>
          <ul className="selectMenu__accordion" data-status="false" ref={accordionRef}>
            <li className="selectMenu__accordion--option" key="openbackheadphone">
              <button className="openbackheadphone">{'Open-Back'}</button>
            </li>
            <li className="selectMenu__accordion--option" key="semiopenheadphone">
              <button className="semiopenheadphone">{'Semi-Open'}</button>
            </li>
            <li className="selectMenu__accordion--option" key="closedbackheadphone">
              <button className="closedbackheadphone">{'Closed-Back'}</button>
            </li>
          </ul>
        </div>
      );
    default:
      null;
  }
};

export default StyleFilter;
