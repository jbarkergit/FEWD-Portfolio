import { useState, ChangeEvent, useEffect, useRef, MouseEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchResults = ProductDatabase.filter((product) => {
    return product.sku.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const getFilteredItems = () => {
    if (!searchTerm) {
      null;
    }
    return searchResults;
  };

  const filteredItems = getFilteredItems();
  const searchBarRef = useRef<HTMLDivElement>(null!);
  const searchLink = useRef<HTMLAnchorElement>(null!);

  useEffect(() => {
    const useSearchBar = (e: any) => {
      !searchBarRef.current?.contains(e.target) ? setSearchTerm('') : setSearchTerm('');
    };

    searchBarRef.current?.addEventListener('click', useSearchBar);
    document.body.addEventListener('click', useSearchBar, true);

    return () => {
      searchBarRef.current?.removeEventListener('click', useSearchBar);
      document.body.removeEventListener('click', useSearchBar);
    };
  }, []);

  return (
    <div className="searchBar" ref={searchBarRef}>
      <div className="searchBar__input">
        <label htmlFor="searchBar__input--input">Search</label>
        <input
          type="text"
          name="searchBar__input--input"
          placeholder="Search"
          value={searchTerm}
          autoCapitalize="none"
          autoComplete="none"
          autoCorrect="off"
          spellCheck="false"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event?.target.value)}
          style={{
            backgroundColor: useLocation().pathname === '/ecommerce' ? 'white' : 'transparent',
            boxShadow:
              useLocation().pathname === '/ecommerce'
                ? 'rgba(255, 255, 255, 0) -1px -1px 20px 0px, rgba(57, 57, 57, 0) -4px -4px 5px 0px, rgba(98, 98, 98, 0) 7px 7px 20px 0px, rgba(0, 0, 0, 0) 4px 4px 5px 0px'
                : '-1px -1px 20px 0px rgba(255, 255, 255, 1), -4px -4px 5px 0px rgba(255, 255, 255, 1), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>
      {searchTerm.length != 0 && (
        <div className="searchBar__return">
          <ul className="searchBar__return__products">
            {filteredItems.slice(0, 10).map((product) => {
              return (
                <li className="searchBar__return__products__return" key={uuidv4()}>
                  <a href={`/ecommerce/product/${product.sku}`} ref={searchLink}>
                    <span>
                      {product.company} {product.unit}
                    </span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
