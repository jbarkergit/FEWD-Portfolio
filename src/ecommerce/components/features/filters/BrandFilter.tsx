import { useRef, useEffect } from 'react';
import useCompanies from './Companies';

const BrandFilter = (): JSX.Element => {
  const selectMenu = useRef<HTMLDivElement>(null!);
  const menu = useRef<HTMLUListElement>(null!);

  useEffect(() => {
    function toggleBrandFilter(e: MouseEvent) {
      const target = e.target as unknown as HTMLElement;
      if (menu?.current?.getAttribute('data-activity') === 'active' && !selectMenu?.current?.contains(target)) {
        menu?.current?.setAttribute('data-activity', 'inactive');
      } else if (menu?.current?.getAttribute('data-activity') === 'active' && selectMenu?.current?.contains(target)) {
        menu?.current?.setAttribute('data-activity', 'inactive');
      } else if (menu?.current?.getAttribute('data-activity') === 'inactive' && selectMenu?.current?.contains(target)) {
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

export default BrandFilter;
