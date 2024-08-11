// Deps
import { useRef, useState, useEffect, ChangeEvent, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Composable Hooks
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
// Composable Hook Types
import { Type_Tmdb_ApiMovie_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';
// Assets
import { MaterialSymbolsSearch } from '../../assets/google-material-symbols/menuSymbols';

type Type_PropDrill = {};

const FDMenuSearchBar = forwardRef<HTMLElement, Type_PropDrill>(({}, menuSearchRef) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Type_Tmdb_ApiMovie_Obj[] | undefined>(undefined);

  const isSearching: boolean = searchTerm.length > 0;
  const isResults: boolean = searchResults !== undefined && searchResults.length > 0;

  /** Fetch */
  useEffect(() => {
    (async () => {
      const fetchUrl = useTmdbUrlBuilder('querieMovie', [{ querie: searchTerm }]);
      const getResults = useFetchTmdbResponse([{ key: fetchUrl.key, endpoint: fetchUrl.endpoint }]);

      if (isSearching)
        getResults.then((data) => {
          if (data) {
            const dataResults = data.flatMap((obj) => obj.endpoint) as Type_Tmdb_ApiMovie_Obj[];
            setSearchResults(dataResults);
          }
        });
    })();
  }, [searchTerm]);

  /** Label */
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleLabel = (): void => {
    if (labelRef.current) {
      labelRef.current.setAttribute('data-status', isSearching ? 'disabled' : 'active');
    }
  };

  useEffect(() => handleLabel(), [searchTerm]);

  return (
    <section className='fdSearchBar' ref={menuSearchRef} data-menu='closed'>
      <div className='fdSearchBar__container'>
        <fieldset className='fdSearchBar__container__fieldset'>
          <legend className='fdSearchBar__container__fieldset__legend'>Find the movie you're interested in</legend>

          <div className='fdSearchBar__container__fieldset__field'>
            <label className='fdSearchBar__container__fieldset__field__label' htmlFor='fdSearchBar__fieldset__input' data-status='disabled' ref={labelRef}>
              Find the movie you're interested in
            </label>
            <input
              className='fdSearchBar__container__fieldset__field__input'
              type='search'
              pattern='search'
              autoFocus={true}
              onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value.replace(' ', '-').toLowerCase())}
            />
          </div>

          <div className='fdSearchBar__container__fieldset__submit'>
            <button className='fdSearchBar__container__fieldset__submit--button' aria-label='Submit search'>
              <MaterialSymbolsSearch />
            </button>
          </div>
        </fieldset>

        <ul className='fdSearchBar__container__results' data-status={isSearching && isResults ? 'active' : 'disabled'}>
          {isSearching && isResults
            ? searchResults?.map((obj) => (
                <li className='fdSearchBar__container__results__li' key={uuidv4()}>
                  {obj.title}
                </li>
              ))
            : null}
        </ul>
      </div>
    </section>
  );
});

export default FDMenuSearchBar;
