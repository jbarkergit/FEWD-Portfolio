import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';
import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';
import { ProductType } from '../../../types/ProductType';

const FilterButtons = (): JSX.Element => {
  const uniqueCompanies = useMemo(() => [...new Set(ProductDatabase.map((product: ProductType) => product.company))].sort((a, b) => (a > b ? 1 : -1)), []);

  return (
    <>
      {uniqueCompanies.map((company) => (
        <li className="selectMenu__accordion--option" key={uuidv4()}>
          <button className={company}>{company}</button>
        </li>
      ))}
    </>
  );
};

const BrandFilter = (): JSX.Element => {
  // @ts-ignore
  const { setCategoryFilter } = useCategoryFilterContext();
  const [filterName, setFilterName] = useState<string>('Filter by Brand');
  useEffect(() => setFilterName('Filter by Brand'), [useLocation()]);
  const categorySetter = (company: string) => {
    setCategoryFilter(company);
    setFilterName(company);
  };

  const selectMenuRef = useRef<HTMLDivElement>(null),
    accordionRef = useRef<HTMLUListElement>(null);

  const [modalOpen, setModalOpen] = useState<boolean>(false);
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
  }, []);

  return (
    <div className="selectMenu">
      <div className="selectMenu__selection" ref={selectMenuRef}>
        <span className="selectMenu__selection__indicator">
          <span className="selectMenu__selection__indicator--area">{filterName}</span>
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
        <FilterButtons />
      </ul>
    </div>
  );
};

export default BrandFilter;
