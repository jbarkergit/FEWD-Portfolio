import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useTDSearchBar } from '../../../hooks/features/useTDSearchBar';

const FDSearchBar = () => {
  // References
  const searchBar = useRef<HTMLDivElement>(null);

  // State
  const [searchTerm, setSearchTerm] = useState<string>('');

  /** Exterior click handler */
  useEffect(() => {
    const exteriorClickHandler = (e: PointerEvent): void => {
      if (!searchBar.current?.contains(e.target as HTMLElement)) setSearchTerm('');
    };

    searchBar.current?.addEventListener('pointerup', exteriorClickHandler);
    document.body.addEventListener('pointerup', exteriorClickHandler);

    return () => {
      searchBar.current?.removeEventListener('pointerup', exteriorClickHandler);
      document.body.removeEventListener('pointerup', exteriorClickHandler);
    };
  }, []);

  /** JSX */
  return (
    <div className='tdSearchBar' ref={searchBar}>
      <label className='tdSearchBar__label' htmlFor='tdSearchBar__input'>
        Find the entertainment you're looking for
      </label>
      <input
        className='tdSearchBar__input'
        id='tdSearchBar__input'
        data-focus={searchTerm.length > 0 ? 'true' : 'false'}
        type='text'
        placeholder=''
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
        <div className='tdSearchBar__return'>
          <ul className='tdSearchBar__return__ul' tabIndex={-1}>
            {useTDSearchBar(searchTerm).length <= 0 ? (
              <li className='tdSearchBar__return__ul__li' key={uuidv4()}>
                <span className='tdSearchBar__return__ul__li--noResult'>No results found for {searchTerm}.</span>
              </li>
            ) : (
              useTDSearchBar(searchTerm).map((product, index) =>
                index === useTDSearchBar(searchTerm).length - 1 ? (
                  <li className='tdSearchBar__return__ul__li' key={uuidv4()}>
                    <a href={`/ecommerce/product/${product.sku}`} onClick={() => setSearchTerm('')} onBlur={() => setSearchTerm('')}>
                      {product.company} {product.unit}
                    </a>
                  </li>
                ) : (
                  <li className='tdSearchBar__return__ul__li' key={uuidv4()}>
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
export default FDSearchBar;
