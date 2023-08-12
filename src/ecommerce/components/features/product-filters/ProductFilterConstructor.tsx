import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';
import ProductFilterButtonConstructor from './ProductFilterButtonConstructor';

const ProductFilterConstructor = (initFilterName: string, filterData: string[] | Set<string>): JSX.Element => {
  // @ts-ignore
  const { categoryFilter } = useCategoryFilterContext();

  //Filter Name State, takes initFilterName parameter as initial state
  const [filterName, setFilterName] = useState<string>(initFilterName);

  //Conditionally returns filterData for types Array & Set (converts Set to an Array)
  const useFilterData = () => {
    if (Array.isArray(filterData)) return filterData;
    else if (filterData instanceof Set) throw new Error('useFilterData only accepts Arrays');
    else throw new Error('Filter Data Type may be void or returning null');
  };

  //useLocation Hook from react-router-dom, has to be stored in a reference variable
  const useLoc = useLocation().pathname.replace('/ecommerce/', '');

  //If useLoc is not found in useFilterData, setFilterName to initFilterName parameter, else setFilterName to useFilterData item or "data" as generic term
  useEffect(() => {
    const locName = useFilterData().find((data) => data === useLoc);
    if (locName) setFilterName(locName);
    else setFilterName(initFilterName);
  }, [useLocation().pathname]);

  //Modal Refs & Toggle State Depedency
  const selectMenuRef = useRef<HTMLDivElement>(null),
    accordionRef = useRef<HTMLUListElement>(null);
  const [modalStatus, setModalStatus] = useState<boolean>(false);

  //Toggle Modal Data Attribute & handle exterior clicks to close modal if it's open
  useEffect(() => {
    accordionRef.current?.setAttribute('data-status', modalStatus ? 'active' : 'false'); //Toggle Modal Data Attribute

    const handleExteriorClick = (e: PointerEvent): void => {
      const target = e.target as HTMLElement; //toggles modalStatus to false if document.body is clicked, stops bubbling if selectMenu || button clicked
      selectMenuRef.current?.contains(target) || accordionRef.current?.contains(target) ? e.stopPropagation : setModalStatus(false);
    };

    document.body.addEventListener('pointerdown', handleExteriorClick);
    return () => document.body.removeEventListener('pointerdown', handleExteriorClick);
  }, [modalStatus]);

  return (
    <div className="selectMenu">
      <div className="selectMenu__selection" ref={selectMenuRef} onClick={() => (modalStatus ? setModalStatus(false) : setModalStatus(true))}>
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
        <ProductFilterButtonConstructor useFilterData={useFilterData()} modalStatus={modalStatus} setModalStatus={setModalStatus} />
      </ul>
    </div>
  );
};

export default ProductFilterConstructor;
