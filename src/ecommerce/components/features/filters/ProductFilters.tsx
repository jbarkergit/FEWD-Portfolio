import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useCategoryFilterContext } from '../../../context/products/categoryFilterProvider';
import { ProductDatabase } from '../../../assets/data/ProductDatabase';

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
  useEffect(() => {
    const selectMenu = document.querySelector('.selectMenu')!;
    const menu = document.querySelector('.selectMenu__menu')!;

    const useSelectMenu = (event: any) => {
      if (menu.getAttribute('data-activity') === 'active' && !selectMenu.contains(event.target)) {
        menu.setAttribute('data-activity', 'inactive');
      } else if (menu.getAttribute('data-activity') === 'inactive' && !selectMenu.contains(event.target)) {
        null;
      } else if (menu.getAttribute('data-activity') === 'active' && selectMenu.contains(event.target)) {
        menu.setAttribute('data-activity', 'inactive');
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
              <span className="selectMenu__selection__indicator--area">Filter by Brand</span>
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
