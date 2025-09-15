import { useCallback, useEffect, useRef } from 'react';
import { useHeroData } from '~/film-database/context/HeroDataContext';
import { useUserCollection } from '~/film-database/context/UserCollectionContext';
import { addIdToCollection } from '~/film-database/utility/addIdToCollection';

const DetailsCollectionDropdown = () => {
  const { userCollections, setUserCollections } = useUserCollection();
  const { heroData } = useHeroData();
  const dropdownRef = useRef<HTMLUListElement>(null);
  const attr: string = 'data-open';

  const handleExteriorClick = useCallback((event: PointerEvent): void => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node))
      dropdownRef.current.setAttribute(attr, 'false');
    document.removeEventListener('pointerup', handleExteriorClick);
  }, []);

  const toggleDropdown = () => {
    if (!dropdownRef.current) return;

    const isOpen: boolean = dropdownRef.current.getAttribute(attr) === 'true';
    dropdownRef.current.setAttribute(attr, String(!isOpen));

    if (!isOpen) document.addEventListener('pointerup', handleExteriorClick);
  };

  useEffect(() => {
    return () => document.removeEventListener('pointerup', handleExteriorClick);
  }, []);

  return (
    <div className='fdDetails__extra__nav__collections'>
      <button
        aria-label={`Add ${heroData?.title} to a collection`}
        onPointerUp={toggleDropdown}>
        Add to collections
      </button>
      <ul
        className='fdDetails__extra__nav__collections__dropdown'
        ref={dropdownRef}
        data-open='false'>
        {Object.entries(userCollections).map(([key, col], index) => {
          return (
            <li key={`detail-dropdown-${col.header}`}>
              <button
                aria-label={`Add ${heroData?.title} to collection ${col.header}`}
                onPointerUp={() => {
                  if (heroData) {
                    addIdToCollection(userCollections, setUserCollections, {
                      data: [heroData],
                      colIndex: index,
                    });
                  }
                  toggleDropdown();
                }}>
                {col.header}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DetailsCollectionDropdown;
