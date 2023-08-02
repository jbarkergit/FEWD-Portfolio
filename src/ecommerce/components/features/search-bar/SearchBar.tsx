import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

import { ProductDatabase } from '../../../assets/production-data/ProductDatabase';

const SearchBar = (): JSX.Element => {
  const searchBarRef = useRef<HTMLDivElement>(null!),
    searchLink = useRef<HTMLAnchorElement>(null!);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchResults = ProductDatabase.filter((product) => {
    return product.sku.toLowerCase().includes(searchTerm.toLowerCase());
  });

  useEffect(() => {
    const useSearchBar = (e: PointerEvent): void => {
      if (searchBarRef.current && !searchBarRef.current.contains(e.target as HTMLElement)) setSearchTerm('');
    };

    searchBarRef.current?.addEventListener('pointerup', useSearchBar);
    document.body.addEventListener('pointerup', useSearchBar);

    return () => {
      searchBarRef.current?.removeEventListener('pointerup', useSearchBar);
      document.body.removeEventListener('pointerup', useSearchBar);
    };
  }, []);

  return (
    <div className="searchBar" ref={searchBarRef}>
      <label className="searchBar__label" htmlFor="searchBar__input">
        Search
      </label>
      <input
        className="searchBar__input"
        name="searchBar__input"
        type="text"
        placeholder="Search for a product"
        value={searchTerm}
        autoCapitalize="none"
        autoComplete="none"
        autoCorrect="off"
        spellCheck="false"
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value)}
      />
      {searchTerm.length != 0 && (
        <div className="searchBar__return">
          <ul className="searchBar__return__ul">
            {!searchTerm
              ? null
              : searchResults.slice(0, 10).map((product) => {
                  return (
                    <li className="searchBar__return__ul__li" key={uuidv4()}>
                      <a href={`/ecommerce/product/${product.sku}`} ref={searchLink}>
                        {product.company} {product.unit}
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
