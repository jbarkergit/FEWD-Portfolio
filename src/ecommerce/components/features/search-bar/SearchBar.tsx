import { useState, ChangeEvent, useEffect, useRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useProductSearch } from '../../../hooks/useSearchProducts';

const SearchBar = (): JSX.Element => {
  const searchBarRef = useRef<HTMLDivElement>(null!);
  const [searchTerm, setSearchTerm] = useState<string>('');

  //** Exterior click handler */
  useEffect(() => {
    const exteriorClickHandler = (e: PointerEvent): void => {
      if (!searchBarRef.current?.contains(e.target as HTMLElement)) setSearchTerm('');
    };

    searchBarRef.current?.addEventListener('pointerup', exteriorClickHandler);
    document.body.addEventListener('pointerup', exteriorClickHandler);

    return () => {
      searchBarRef.current?.removeEventListener('pointerup', exteriorClickHandler);
      document.body.removeEventListener('pointerup', exteriorClickHandler);
    };
  }, []);

  return (
    <div className='searchBar' ref={searchBarRef}>
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          setSearchTerm(e?.target.value.replace(' ', '-'));
        }}
      />
      {searchTerm.length > 0 && (
        <div className='searchBar__return'>
          <ul className='searchBar__return__ul' tabIndex={-1}>
            {useProductSearch(searchTerm).length <= 0 ? (
              <li className='searchBar__return__ul__li' key={uuidv4()}>
                <span className='searchBar__return__ul__li--noResult'>Sorry, no results.</span>
              </li>
            ) : (
              useProductSearch(searchTerm).map((product, index) =>
                index === useProductSearch(searchTerm).length - 1 ? (
                  <li className='searchBar__return__ul__li' key={uuidv4()}>
                    <a href={`/ecommerce/product/${product.sku}`} onClick={() => setSearchTerm('')} onBlur={() => setSearchTerm('')}>
                      {product.company} {product.unit}
                    </a>
                  </li>
                ) : (
                  <li className='searchBar__return__ul__li' key={uuidv4()}>
                    <a href={`/ecommerce/product/${product.sku}`} onClick={() => setSearchTerm('')}>
                      {product.company} {product.unit}
                    </a>
                  </li>
                )
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
