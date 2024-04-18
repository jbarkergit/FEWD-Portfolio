import { useRef, useState, useEffect, ChangeEvent } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { tmdbEndPoints } from '../../composables/tmdb-api/data/tmdbEndPoints';
import { useTmdbApi } from '../../composables/tmdb-api/hooks/useTmdbApi';
import { Type_Tmdb_useApiReturn_Obj, Type_Tmdb_ApiCall_Union, Type_Tmdb_ApiCallMovie_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';

const FDSearchBar = () => {
  const searchBar = useRef<HTMLDivElement>(null);

  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Type_Tmdb_useApiReturn_Obj[]>([]);

  /** Exterior click handler */
  const exteriorClickHandler = (event: PointerEvent): void => {
    switch (true) {
      case !searchBar.current?.contains((event.target as HTMLElement) || (event.target as HTMLButtonElement)):
        setSearchTerm('');
        setIsInputFocused(false);
        break;

      default:
        null;
        break;
    }
  };

  useEffect(() => {
    searchBar.current?.addEventListener('pointerup', exteriorClickHandler);
    document.body.addEventListener('pointerup', exteriorClickHandler);

    return () => {
      searchBar.current?.removeEventListener('pointerup', exteriorClickHandler);
      document.body.removeEventListener('pointerup', exteriorClickHandler);
    };
  }, []);

  /** Expanding search bar */
  const input = useRef<HTMLInputElement>(null);
  const label = useRef<HTMLLabelElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const [isInputFocused, setIsInputFocused] = useState<boolean>(false);

  useEffect(() => {
    if (isInputFocused) {
      input.current?.focus();
      [input.current, label.current, button.current].forEach((ref: HTMLInputElement | HTMLLabelElement | HTMLButtonElement | null) => {
        ref?.setAttribute('data-status', 'active');
      });
    } else {
      setIsInputFocused(false);
      [input.current, label.current, button.current].forEach((ref: HTMLInputElement | HTMLLabelElement | HTMLButtonElement | null) => {
        ref?.setAttribute('data-status', 'disabled');
      });
      setSearchTerm('');
    }
  }, [isInputFocused]);

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

  const values: Type_Tmdb_ApiCall_Union[] | undefined = searchResults[0] ? searchResults[0].value.map((data) => data) : undefined;

  /** JSX */
  return (
    <section className='fdSearchBar' ref={searchBar}>
      <fieldset className='fdSearchBar__fieldset'>
        <legend>Find the entertainment you're looking for</legend>

        <input
          className='fdSearchBar__fieldset__input'
          id='fdSearchBar__fieldset__input'
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
          onFocus={() => setIsInputFocused(true)}
          data-status='disabled'
        />
        {searchTerm.length === 0 ? (
          <label className='fdSearchBar__fieldset__label' htmlFor='fdSearchBar__fieldset__input' data-status='disabled' ref={label}>
            Find the entertainment you're looking for
          </label>
        ) : null}

        <button
          className='fdSearchBar__fieldset__button'
          ref={button}
          onClick={() => {
            if (!isInputFocused) setIsInputFocused(true);
          }}
          aria-label={`Search for ${searchTerm}`}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 256 256'>
            <path
              fill='#888888'
              d='M34 64a6 6 0 0 1 6-6h176a6 6 0 0 1 0 12H40a6 6 0 0 1-6-6m6 70h72a6 6 0 0 0 0-12H40a6 6 0 0 0 0 12m88 52H40a6 6 0 0 0 0 12h88a6 6 0 0 0 0-12m108.24 10.24a6 6 0 0 1-8.48 0l-21.49-21.48a38.06 38.06 0 1 1 8.49-8.49l21.48 21.49a6 6 0 0 1 0 8.48M184 170a26 26 0 1 0-26-26a26 26 0 0 0 26 26'></path>
          </svg>
        </button>
      </fieldset>

      <ul className='fdSearchBar__results' data-status={values && values.length > 0 && searchTerm.length > 0 ? 'active' : 'disabled'}>
        {values && searchResults.length > 0 ? (
          values.slice(0, 8).map((obj) => (
            <li className='fdSearchBar__results__li' key={uuidv4()}>
              {(obj as Type_Tmdb_ApiCallMovie_Obj).title}
            </li>
          ))
        ) : searchTerm.length > 0 ? (
          <li>No results found.</li>
        ) : null}
      </ul>
    </section>
  );
};
export default FDSearchBar;
