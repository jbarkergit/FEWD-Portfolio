// Deps
import { useState, useEffect, useRef, type ChangeEvent, useCallback } from 'react';
// Context
import { useCatalogProvider } from '../../../../context/CatalogContext';
// Composables
import { type Namespace_Tmdb, useTmdbFetcher } from '../../../../composables/tmdb-api/hooks/useTmdbFetcher';
// Assets
import { SvgSpinnersRingResize, MaterialSymbolsPlayArrow } from '../../../../assets/google-material-symbols/GoogleMaterialIcons';

const FDCarouselSearch = () => {
  // Context
  const { setHeroData, maxCarouselNodes } = useCatalogProvider();

  // State
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Namespace_Tmdb.Search_Obj['search']['results'] | undefined>(undefined);

  // Debounce
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // References
  const labelRef = useRef<HTMLLabelElement>(null);

  /**
   * @function handleLabelVisibility
   * @returns void undefined
   * Alters visibility of the input label
   */
  const handleLabelVisibility = (prop: 'visible' | 'barelyVisible'): void | undefined => {
    if (labelRef.current && searchTerm.length === 0) {
      return labelRef.current?.setAttribute('data-opacity', prop);
    }
    return undefined;
  };

  /**
   * @function invokeFetch
   * @returns Promise<void>
   * Invoke debounced fetch
   */
  const invokeFetch = useCallback(async () => {
    if (searchTerm.length > 0) {
      setIsTyping(false);
      const data = (await useTmdbFetcher({ search: searchTerm })) as Namespace_Tmdb.Search_Obj;
      if (data) setSearchResults(data.search.results);
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchTerm.length === 0) setSearchResults([]);
    if (searchTerm.length > 0) setIsTyping(true);

    // Clear timer
    if (timerRef.current) window.clearTimeout(timerRef.current);
    // Assign new timer
    timerRef.current = window.setTimeout(() => invokeFetch(), 850) as unknown as NodeJS.Timeout;

    return () => {
      if (timerRef.current) {
        setIsTyping(false);
        window.clearTimeout(timerRef.current);
      }
    };
  }, [searchTerm]);

  return (
    <section className='fdSearchBar'>
      <div className='fdSearchBar__header'>
        <fieldset className='fdSearchBar__header__fieldset'>
          <label
            className='fdSearchBar__header__fieldset__label'
            htmlFor='fdSearchBar__fieldset__input'
            data-opacity={searchTerm.length > 0 ? 'hidden' : 'barelyVisible'}
            ref={labelRef}>
            <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
              <path
                fill='currentColor'
                d='M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14'></path>
            </svg>
            <h2>Find the movies you're interested in</h2>
          </label>
          <input
            className='fdSearchBar__header__fieldset__input'
            type='search'
            pattern='search'
            autoFocus={true}
            onPointerOver={() => handleLabelVisibility('visible')}
            onPointerLeave={() => handleLabelVisibility('barelyVisible')}
            onFocus={() => handleLabelVisibility('visible')}
            onBlur={() => handleLabelVisibility('barelyVisible')}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value.replace(' ', '-').toLowerCase())}
          />
          {isTyping ? <SvgSpinnersRingResize /> : null}
        </fieldset>
      </div>

      <div className='fdSearchBar__results' data-anim={searchResults && searchResults.length > 0 ? 'enabled' : 'disabled'}>
        <ul className='fdSearchBar__results__ul'>
          {maxCarouselNodes && searchResults && !isTyping
            ? searchResults.splice(0, maxCarouselNodes).map((props, index) => {
                if (props.poster_path)
                  return (
                    <li className='fdSearchBar__results__ul__li' key={`fd-search-result-${index}`}>
                      <picture className='fdSearchBar__results__ul__li__article'>
                        <img src={`https://image.tmdb.org/t/p/w780${props.poster_path}`} alt={`${props.title}`} />
                      </picture>
                      <div className='fdSearchBar__results__ul__li__overlay' onClick={() => setHeroData(props)}>
                        <button className='fdSearchBar__results__ul__li__overlay--play' aria-label='Play trailer'>
                          <MaterialSymbolsPlayArrow />
                        </button>
                      </div>
                    </li>
                  );
              })
            : null}
        </ul>
      </div>
    </section>
  );
};

export default FDCarouselSearch;
