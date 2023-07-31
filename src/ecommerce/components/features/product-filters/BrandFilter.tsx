import { useEffect, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';
import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';
import { ProductType } from '../../../types/ProductType';

const BrandFilter = (): JSX.Element => {
  // @ts-ignore
  const { setCategoryFilter } = useCategoryFilterContext();
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
  }, []);

  const uniqueCompanies = [...new Set(ProductDatabase.map((product: ProductType) => product.company))].sort((a, b) => (a > b ? 1 : -1));

  return (
    <div className="selectMenu">
      <div className="selectMenu__selection" ref={selectMenuRef}>
        <span className="selectMenu__selection__indicator">
          <span className="selectMenu__selection__indicator--area">Filter by Brand</span>
          <span className="selectMenu__selection__indicator--area">
            <i className="fa-solid fa-sort"></i>
          </span>
        </span>
        <div className="selectMenu--divider"></div>
      </div>
      <ul className="selectMenu__accordion" data-status="false" ref={accordionRef}>
        {uniqueCompanies.map((company) => (
          <li className="selectMenu__accordion--option" key={uuidv4()}>
            <button className={company}>{company}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrandFilter;
