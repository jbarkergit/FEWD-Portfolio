import { useState, useRef, useEffect } from 'react';
import { useCategoryFilterContext } from '../../../context/CategoryFilterContext';

const StyleFilter = (): JSX.Element | undefined => {
  const [styleFilterStatus, setStyleFilterStatus] = useState<boolean>(false);
  const styleFilterSelectMenu = useRef<HTMLDivElement>(null!);
  const styleFilterMenu = useRef<HTMLUListElement>(null!);

  useEffect(() => {
    function toggleStyleFilter(e: MouseEvent) {
      const target = e.target as unknown as HTMLElement;
      if (styleFilterStatus === true && !styleFilterSelectMenu?.current?.contains(target)) {
        styleFilterMenu?.current?.setAttribute('data-activity', 'inactive');
        setStyleFilterStatus(false);
      } else if (styleFilterStatus === true && styleFilterSelectMenu?.current?.contains(target)) {
        styleFilterMenu?.current?.setAttribute('data-activity', 'inactive');
      } else if (styleFilterStatus === false && styleFilterSelectMenu?.current?.contains(target)) {
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

  // @ts-ignore:
  const { categoryFilter, setCategoryFilter } = useCategoryFilterContext();

  switch (categoryFilter) {
    case 'headphone':
    case 'Beyerdynamic':
    case 'openbackheadphone':
    case 'semiopenheadphone':
    case 'closedbackheadphone':
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
          <ul className="selectMenu__accordion" data-activity="inactive" ref={styleFilterMenu}>
            <li className="selectMenu__accordion--option" key="openbackheadphone">
              <button onClick={() => setCategoryFilter('openbackheadphone')}>{'Open-Back'}</button>
            </li>
            <li className="selectMenu__accordion--option" key="semiopenheadphone">
              <button onClick={() => setCategoryFilter('semiopenheadphone')}>{'Semi-Open'}</button>
            </li>
            <li className="selectMenu__accordion--option" key="closedbackheadphone">
              <button onClick={() => setCategoryFilter('closedbackheadphone')}>{'Closed-Back'}</button>
            </li>
          </ul>
        </div>
      );
    default:
      null;
  }
};

export default StyleFilter;
