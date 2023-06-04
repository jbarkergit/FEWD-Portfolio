import { useState, ChangeEvent, useEffect } from 'react';
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

  useEffect(() => {
    const searchBar = document.querySelector('.searchBar')!;

    const useSearchBar = (event: any) => {
      !searchBar.contains(event.target) ? setSearchTerm('') : null;
    };

    searchBar.addEventListener('click', useSearchBar);
    document.body.addEventListener('click', useSearchBar, true);

    return () => {
      searchBar.removeEventListener('click', useSearchBar);
      document.body.removeEventListener('click', useSearchBar);
    };
  }, []);

  return (
    <div className="navkit__header__section__ui">
      <div className="searchBar">
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
    </div>
  );
};

export default SearchBar;
