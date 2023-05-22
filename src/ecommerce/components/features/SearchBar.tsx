import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ProductDatabase } from '../../data/ProductDatabase';
import { ProductType } from '../../context/ProductProvider';

const SearchBar = () => {
  const [filteredData, setFilteredData] = useState([]);
  const [filterWord, setFilterWord] = useState('');

  function useSearchFilter(event: any) {
    const searchWord = event?.target.value;
    setFilterWord(searchWord);
    const filteredProducts: any = ProductDatabase.filter((product) => {
      return product.sku.toLowerCase().includes(searchWord.toLowerCase());
    });

    searchWord === '' ? setFilteredData([]) : setFilteredData(filteredProducts);
  }

  function clearInputField() {
    setFilteredData([]);
    setFilterWord('');
  }

  return (
    <div className="searchBar">
      <div className="searchBar__input">
        <input
          className="searchBar__input--input"
          type="text"
          placeholder="Search..."
          value={filterWord}
          autoCapitalize="none"
          autoComplete="none"
          autoCorrect="off"
          spellCheck="false"
          onChange={useSearchFilter}
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
          {filterWord.length === 0 ? (
            <i className="fa-solid fa-magnifying-glass"></i>
          ) : (
            <i className="fa-solid fa-xmark" id="clearInput" onClick={clearInputField}></i>
          )}
        </span>
      </div>
      {filteredData.length != 0 && (
        <div className="searchBar__return">
          <ul
            className="searchBar__return__products"
            style={{
              background: useLocation().pathname === '/ecommerce' ? 'white' : 'hsl(0, 0%, 19.607843137254903%)',
              color: useLocation().pathname === '/ecommerce' ? 'hsl(0, 0%, 19.607843137254903%)' : 'white',
            }}
          >
            {filteredData.slice(0, 10).map((product: ProductType, key) => {
              return (
                <li className="searchBar__return__products__return">
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
