import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/products/categoryFilterProvider';
import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';

const useBreadcrumbs = () => {
  const location = useLocation();
  let [currentLocation] = useState<string>('');
  const breadcrumbs = location.pathname
    .replaceAll('/', '')
    .replaceAll('-', ' ')
    .split('ecommerce')
    .filter((breadcrumb) => breadcrumb !== '')
    .map((breadcrumb) => {
      currentLocation += `${breadcrumb}`;
    });
  return (
    <div className="breadcrumb" key={currentLocation} aria-label={currentLocation}>
      <h1>{currentLocation}</h1>
    </div>
  );
};

const useCompanies = () => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext(); // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider

  return (
    <>
      {[...new Set(ProductDatabase.map((product) => product.company))]
        .sort((a, b) => (a > b ? 1 : -1))
        .map((company) => (
          <li className="selectMenu__menu--option" key={company}>
            <button id={company} onClick={() => setCategoryFilter(`${company}`)}>
              {company}
            </button>
          </li>
        ))}
    </>
  );
};

const ProductFilters = () => {
  const selectMenu = useRef<HTMLDivElement>(null!);
  const menu = useRef<HTMLUListElement>(null!);

  const styleFilterSelectMenu = useRef<HTMLDivElement>(null!);
  const styleFilterMenu = useRef<HTMLUListElement>(null!);

  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext(); // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider

  useEffect(() => {
    const useSelectMenu = (event: any) => {
      if (menu?.current?.getAttribute('data-activity') === 'active' && !selectMenu?.current?.contains(event.target)) {
        menu?.current?.setAttribute('data-activity', 'inactive');
      } else if (menu?.current?.getAttribute('data-activity') === 'inactive' && !selectMenu?.current?.contains(event.target)) {
        null;
      } else if (menu?.current?.getAttribute('data-activity') === 'active' && selectMenu?.current?.contains(event.target)) {
        menu?.current?.setAttribute('data-activity', 'inactive');
      } else if (menu?.current?.getAttribute('data-activity') === 'inactive') {
        menu?.current?.setAttribute('data-activity', 'active');
      } else if (menu?.current?.getAttribute('data-activity') === 'active') {
        menu?.current?.setAttribute('data-activity', 'inactive');
      } else {
        null;
      }
    };

    selectMenu?.current?.addEventListener('click', useSelectMenu);
    document.body.addEventListener('click', useSelectMenu, true);

    return () => {
      selectMenu?.current?.removeEventListener('click', useSelectMenu);
      document.body.removeEventListener('click', useSelectMenu);
    };
  }, []);

  useEffect(() => {
    const useSelectMenu = (event: any) => {
      if (styleFilterMenu?.current?.getAttribute('data-activity') === 'active' && !styleFilterSelectMenu?.current?.contains(event.target)) {
        styleFilterMenu?.current?.setAttribute('data-activity', 'inactive');
      } else if (styleFilterMenu?.current?.getAttribute('data-activity') === 'inactive' && !styleFilterSelectMenu?.current?.contains(event.target)) {
        null;
      } else if (styleFilterMenu?.current?.getAttribute('data-activity') === 'active' && styleFilterSelectMenu?.current?.contains(event.target)) {
        styleFilterMenu?.current?.setAttribute('data-activity', 'inactive');
      } else if (styleFilterMenu?.current?.getAttribute('data-activity') === 'inactive') {
        styleFilterMenu?.current?.setAttribute('data-activity', 'active');
      } else if (styleFilterMenu?.current?.getAttribute('data-activity') === 'active') {
        styleFilterMenu?.current?.setAttribute('data-activity', 'inactive');
      } else {
        null;
      }
    };

    styleFilterSelectMenu?.current?.addEventListener('click', useSelectMenu);
    document.body.addEventListener('click', useSelectMenu, true);

    return () => {
      styleFilterSelectMenu?.current?.removeEventListener('click', useSelectMenu);
      document.body.removeEventListener('click', useSelectMenu);
    };
  }, []);

  return (
    <section className="productFilters flexBox">
      <div className="productFilters__panel">{useBreadcrumbs()}</div>
      <div className="productFilters__panel">
        <div className="selectMenu" ref={styleFilterSelectMenu} key="styleFilter">
          <div className="selectMenu__selection">
            <span className="selectMenu__selection__indicator">
              <span className="selectMenu__selection__indicator--area">Filter by Style</span>
              <span className="selectMenu__selection__indicator--area">
                <i className="fa-solid fa-sort"></i>
              </span>
            </span>
            <div className="selectMenu--divider"></div>
          </div>
          <ul className="selectMenu__menu" data-activity="inactive" ref={styleFilterMenu}>
            <li className="selectMenu__menu--option" key="openbackheadphone">
              <button onClick={() => setCategoryFilter('openbackheadphone')}>{'Open-Back'}</button>
            </li>
            <li className="selectMenu__menu--option" key="closedbackheadphone">
              <button onClick={() => setCategoryFilter('closedbackheadphone')}>{'Closed-Back'}</button>
            </li>
          </ul>
        </div>
        <div className="selectMenu" ref={selectMenu} key="brandFilter">
          <div className="selectMenu__selection">
            <span className="selectMenu__selection__indicator">
              <span className="selectMenu__selection__indicator--area">Filter by Brand</span>
              <span className="selectMenu__selection__indicator--area">
                <i className="fa-solid fa-sort"></i>
              </span>
            </span>
            <div className="selectMenu--divider"></div>
          </div>
          <ul className="selectMenu__menu" data-activity="inactive" ref={menu}>
            {useCompanies()}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductFilters;
