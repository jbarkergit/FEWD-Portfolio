import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDatabase } from '../../../assets/data/ProductDatabase';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    const useSearchBar = (event: any) => {
      !searchBarRef.current?.contains(event.target) ? setSearchTerm('') : null;
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
                ? 'rgb(255, 255, 255) -1px -1px 20px 0px, rgb(57, 57, 57) -4px -4px 5px 0px, rgba(98, 98, 98, 0.4) 7px 7px 20px 0px, rgba(0, 0, 0, 0.3) 4px 4px 5px 0px'
                : '-1px -1px 20px 0px rgba(255, 255, 255, 1), -4px -4px 5px 0px rgba(255, 255, 255, 1), 7px 7px 20px 0px rgba(0, 0, 0, 0.4), 4px 4px 5px 0px rgba(0, 0, 0, 0.3)',
          }}
        />
      </div>
      {searchTerm.length != 0 && (
        <div className="searchBar__return">
          <ul className="searchBar__return__products">
            {filteredItems.slice(0, 10).map((product, key) => {
              return (
                <li className="searchBar__return__products__return" key={key}>
                  <a href={`/ecommerce/product/${product.sku}`}>
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
