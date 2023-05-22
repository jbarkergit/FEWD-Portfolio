import { useState, ChangeEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDatabase } from '../../data/ProductDatabase';
import { ProductType } from '../../context/ProductProvider';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchData, setSearchData] = useState<ProductType[]>([]);

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

  function clearInputField() {
    setSearchTerm('');
    setSearchData([]);
  }

  return (
    <div className="searchBar">
      <div className="searchBar__input">
        <input
          className="searchBar__input--input"
          type="text"
          placeholder="Search..."
          value={searchTerm}
          autoCapitalize="none"
          autoComplete="none"
          autoCorrect="off"
          spellCheck="false"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setSearchTerm(event?.target.value)}
          style={{
            background: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
            color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : 'white',
          }}
        />
        <span
          className="searchBar__input--icon"
          style={{
            color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : 'white',
          }}
        >
          {searchTerm.length === 0 ? (
            <i className="fa-solid fa-magnifying-glass"></i>
          ) : (
            <i className="fa-solid fa-xmark" id="clearInput" onClick={clearInputField}></i>
          )}
        </span>
      </div>
      {searchTerm.length != 0 && (
        <div className="searchBar__return">
          <ul
            className="searchBar__return__products"
            style={{
              background: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
              color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : 'white',
            }}
          >
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
