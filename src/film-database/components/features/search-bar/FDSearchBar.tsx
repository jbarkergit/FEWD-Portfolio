import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Type_Tmdb_ApiCallMovie_Obj, Type_Tmdb_ApiCall_Union, Type_Tmdb_OptParamSearchFunc_Obj, Type_Tmdb_useApiReturn_Obj } from '../../../api/types/TmdbDataTypes';
import { tmdbEndPoints } from '../../../api/data/tmdbEndPoints';
import { useTmdbApi } from '../../../api/hooks/useTmdbApi';

const FDSearchBar = () => {
  const input = useRef<HTMLInputElement>(null);
  const searchBar = useRef<HTMLDivElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Type_Tmdb_useApiReturn_Obj[]>([]);

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

  /** Search Results
   * Note: Checking tmdbDataArr for existing options would significantly increase loading times; therefore, I've opted to fetch on every search request
   * Note: An api request is made for each of the user's keystrokes for the sakes of real time results
   */
  useEffect(() => {
    (async () => {
      const controller = new AbortController();

      const searchFetch: Type_Tmdb_useApiReturn_Obj[] = await useTmdbApi({
        controller: controller,
        payload: {
          tmdbEndPointObj: tmdbEndPoints.movie_search_movie,
          search_term: { typeGuardKey: 'movie_search', propValue: searchTerm },
        },
      });

      if (searchTerm.length > 0) setSearchResults(searchFetch);
    })();
  }, [searchTerm]);

  const values = searchResults[0].value.map((data) => data);

  /** JSX */
  return (
    <div className='fdSearchBar' ref={searchBar}>
      <div className='fdSearchBar__searcher'>
        <fieldset className='fdSearchBar__searcher__fieldset'>
          <legend>Find the entertainment you're looking for</legend>

          <input
            className='fdSearchBar__searcher__fieldset__input'
            id='fdSearchBar__searcher__fieldset__input'
            ref={input}
            data-focus={searchTerm.length > 0 ? true : false}
            type='text'
            placeholder=''
            value={searchTerm.replace('-', ' ')}
            autoCapitalize='none'
            autoComplete='none'
            autoCorrect='off'
            spellCheck='false'
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value.replace(' ', '-'))}
            onBlur={() => input.current?.removeAttribute('data-status')}
          />
          {searchTerm.length === 0 ? (
            <label className='fdSearchBar__searcher__fieldset__label' htmlFor='fdSearchBar__searcher__fieldset__input'>
              Find the entertainment you're looking for
            </label>
          ) : null}

          <button
            className='fdSearchBar__searcher__fieldset__button'
            onClick={() => {
              input.current?.setAttribute('data-status', 'expanded');
              input.current?.focus();
            }}
            aria-label={`Search for ${searchTerm}`}>
            <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
              <path
                fill='#888888'
                d='M34 64a6 6 0 0 1 6-6h176a6 6 0 0 1 0 12H40a6 6 0 0 1-6-6m6 70h72a6 6 0 0 0 0-12H40a6 6 0 0 0 0 12m88 52H40a6 6 0 0 0 0 12h88a6 6 0 0 0 0-12m108.24 10.24a6 6 0 0 1-8.48 0l-21.49-21.48a38.06 38.06 0 1 1 8.49-8.49l21.48 21.49a6 6 0 0 1 0 8.48M184 170a26 26 0 1 0-26-26a26 26 0 0 0 26 26'></path>
            </svg>
          </button>
        </fieldset>
      </div>

      <ul className='fdSearchBar__results' tabIndex={-1}>
        {searchResults.length > 0 ? (
          values.slice(0, 6).map((obj) => <li key={uuidv4()}>{(obj as Type_Tmdb_ApiCallMovie_Obj).title}</li>)
        ) : (
          <li>No results found.</li>
        )}
      </ul>
    </div>
  );
};
export default FDSearchBar;
