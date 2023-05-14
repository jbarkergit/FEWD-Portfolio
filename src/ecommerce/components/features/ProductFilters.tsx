import { useLocation } from 'react-router-dom';
import { ProductDatabase } from '../../data/ProductDatabase';
import { useCallback, useEffect } from 'react';

const useBreadcrumbs = () => {
  const location = useLocation();
  let currentLocation: string = '';
  const breadcrumbs = location.pathname
    .replace(/-/g, ' ')
    .split('/ecommerce/')
    .filter((breadcrumb) => breadcrumb !== '')
    .map((breadcrumb) => {
      currentLocation += `/${breadcrumb}`;
    });
  return (
    <div className="breadcrumb" key={breadcrumbs} aria-label={currentLocation}>
      <h1>{currentLocation}</h1>
    </div>
  );
};

const useCompanies = () => {
  const getCompanies = [...new Set(ProductDatabase.map((product) => product.company))];
  return (
    <>
      {getCompanies
        .sort((a, b) => (a > b ? 1 : -1))
        .map((company) => (
          <li className="selectMenu__menu--option" key={company}>
            <button>{company}</button>
          </li>
        ))}
    </>
  );
};

const ProductFilters = () => {
  useEffect(() => {
    const selectMenu = document.querySelector('.selectMenu')!;
    const menu = document.querySelector('.selectMenu__menu')!;

    const useSelectMenu = (event: any) => {
      if (menu.getAttribute('data-activity') === 'active' && !selectMenu.contains(event.target)) {
        menu.setAttribute('data-activity', 'inactive');
      } else if (menu.getAttribute('data-activity') === 'inactive' && !selectMenu.contains(event.target)) {
        null;
      } else if (menu.getAttribute('data-activity') === 'inactive') {
        menu.setAttribute('data-activity', 'active');
      } else if (menu.getAttribute('data-activity') === 'active') {
        menu.setAttribute('data-activity', 'inactive');
      } else {
        null;
      }
    };

    selectMenu.addEventListener('click', useSelectMenu);
    document.body.addEventListener('click', useSelectMenu, true);

    return () => {
      selectMenu.removeEventListener('click', useSelectMenu);
      document.body.removeEventListener('click', useSelectMenu);
    };
  }, []);

  return (
    <section className="productFilters flexBox">
      <div className="productFilters__panel">{useBreadcrumbs()}</div>

      <div className="productFilters__panel">
        <div className="selectMenu">
          <div className="selectMenu__selection">
            <span className="selectMenu__selection__indicator">
              <span className="selectMenu__selection__indicator--area">Filter By Brand</span>
              <span className="selectMenu__selection__indicator--area">
                <i className="fa-solid fa-sort"></i>
              </span>
            </span>
            <div className="selectMenu--divider"></div>
          </div>
          <ul className="selectMenu__menu" data-activity="inactive">
            {useCompanies()}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default ProductFilters;

{
  /* <div className="selectMenu" onClick={useSelectMenu}>
          <div className="selectMenu__selection">
            <span className="selectMenu__selection__indicator--area">
              <i className="fa-solid fa-gear"></i>Alter Display
            </span>
          </div>
        </div> */
}
