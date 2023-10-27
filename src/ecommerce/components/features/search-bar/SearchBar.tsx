import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ProductDatabase } from '../../../database/product-db/ProductDatabase';
import { ProductType } from '../../../types/ProductType';

const SearchBar = (): JSX.Element => {
  const searchBarRef = useRef<HTMLDivElement>(null!);
  const [searchTerm, setSearchTerm] = useState<string>('');

  //** Search bar results filter logic */
  const searchResults = () => {
    let ProductSearchResults: ProductType[] = [];
    let count = 0;

    for (const product of ProductDatabase) {
      if (product.sku.toLowerCase().includes(searchTerm.toLowerCase())) {
        ProductSearchResults.push(product);
        count++;

        if (count === 9) break;
      }
    }

    return ProductSearchResults;
  };

  //** Exterior click handler */
  useEffect(() => {
    const useSearchBar = (e: PointerEvent): void => {
      if (!searchBarRef.current?.contains(e.target as HTMLElement)) setSearchTerm('');
    };

    searchBarRef.current?.addEventListener('pointerup', useSearchBar);
    document.body.addEventListener('pointerup', useSearchBar);

    return () => {
      searchBarRef.current?.removeEventListener('pointerup', useSearchBar);
      document.body.removeEventListener('pointerup', useSearchBar);
    };
  }, []);

  return (
    <div
      className='searchBar'
      style={{
        boxShadow: useLocation().pathname === '/ecommerce' ? 'none' : 'var(--shadowRefined)',
      }}
      ref={searchBarRef}>
      <label className='searchBar__label' htmlFor='searchBar__input'>
        Search Products
      </label>
      <input
        className='searchBar__input'
        id='searchBar__input'
        data-focus={searchTerm.length > 0 ? 'true' : 'false'}
        type='text'
        placeholder='Search products'
        value={searchTerm.replace('-', ' ')}
        autoCapitalize='none'
        autoComplete='none'
        autoCorrect='off'
        spellCheck='false'
        onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value.replace(' ', '-'))}
      />
      {searchTerm.length != 0 && (
        <div className='searchBar__return'>
          <ul className='searchBar__return__ul' tabIndex={-1}>
            {searchTerm === ''
              ? null
              : searchResults().map((product) => {
                  return (
                    <li className='searchBar__return__ul__li' key={uuidv4()}>
                      <a href={`/ecommerce/product/${product.sku}`} onClick={() => setSearchTerm('')}>
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
