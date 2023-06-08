import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/products/categoryFilterProvider';
import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';
import { ProductType } from '../../../context/exports/types';

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

const ProductFilters = () => {
  // @ts-ignore:
  const { setCategoryFilter } = useCategoryFilterContext(); // Thrown error is a desired outcome to utilize useState from our context while ALSO offering guard to Application Context Provider

  const useCompanies = () => {
    return (
      <>
        {[...new Set(ProductDatabase.map((product: ProductType) => product.company))]
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

  const useBrandFilter = () => {
    const selectMenu = useRef<HTMLDivElement>(null!);
    const menu = useRef<HTMLUListElement>(null!);

    useEffect(() => {
      function toggleBrandFilter(event: any) {
        if (menu?.current?.getAttribute('data-activity') === 'active' && !selectMenu?.current?.contains(event.target)) {
          menu?.current?.setAttribute('data-activity', 'inactive');
        } else if (menu?.current?.getAttribute('data-activity') === 'active' && selectMenu?.current?.contains(event.target)) {
          menu?.current?.setAttribute('data-activity', 'inactive');
        } else if (menu?.current?.getAttribute('data-activity') === 'inactive' && selectMenu?.current?.contains(event.target)) {
          menu?.current?.setAttribute('data-activity', 'active');
        } else {
          null;
        }
      }

      selectMenu?.current?.addEventListener('click', toggleBrandFilter);
      document.body.addEventListener('click', toggleBrandFilter, true);

      return () => {
        selectMenu?.current?.removeEventListener('click', toggleBrandFilter);
        document.body.removeEventListener('click', toggleBrandFilter);
      };
    }, []);

    return (
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
    );
  };

  const useStyleFilter = () => {
    const [styleFilterStatus, setStyleFilterStatus] = useState<boolean>(false); // Utilizing useState to track changes to resolve conditional rendering breaking button functionality
    const styleFilterSelectMenu = useRef<HTMLDivElement>(null!);
    const styleFilterMenu = useRef<HTMLUListElement>(null!);

    console.log(styleFilterStatus);

    useEffect(() => {
      function toggleStyleFilter(event: any) {
        if (styleFilterStatus === true && !styleFilterSelectMenu?.current?.contains(event.target)) {
          styleFilterMenu?.current?.setAttribute('data-activity', 'inactive');
          setStyleFilterStatus(false);
        } else if (styleFilterStatus === true && styleFilterSelectMenu?.current?.contains(event.target)) {
          styleFilterMenu?.current?.setAttribute('data-activity', 'inactive');
        } else if (styleFilterStatus === false && styleFilterSelectMenu?.current?.contains(event.target)) {
          styleFilterMenu?.current?.setAttribute('data-activity', 'active');
        } else {
          null;
        }
      }

      styleFilterSelectMenu?.current?.addEventListener('click', toggleStyleFilter);
      document.body.addEventListener('click', toggleStyleFilter, true);

      return () => {
        styleFilterSelectMenu?.current?.removeEventListener('click', toggleStyleFilter);
        document.body.removeEventListener('click', toggleStyleFilter);
      };
    }, [styleFilterStatus]);

    if (useLocation().pathname.includes('/ecommerce/headphones') || useLocation().pathname.includes('/ecommerce/products')) {
      return (
        <div
          className="selectMenu"
          ref={styleFilterSelectMenu}
          key="styleFilter"
          onClick={() => {
            styleFilterStatus === false ? setStyleFilterStatus(true) : setStyleFilterStatus(false);
          }}
        >
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
      );
    } else {
      null;
    }
  };

  return (
    <section className="productFilters flexBox">
      <div className="productFilters__panel">{useBreadcrumbs()}</div>
      <div className="productFilters__panel">
        {useStyleFilter()}
        {useBrandFilter()}
      </div>
    </section>
  );
};

export default ProductFilters;
