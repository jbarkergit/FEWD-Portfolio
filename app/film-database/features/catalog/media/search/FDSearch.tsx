import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { IcOutlinePlayCircle, IcBaselineSearch } from '~/film-database/assets/svg/icons';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

const FDSearch = ({ orientation }: { orientation: 'desktop' | 'mobile' }) => {
  const { setHeroData, viewportChunkSize } = useCatalogProvider();

  const isTypingRef = useRef<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TmdbResponseFlat['search']['results'] | undefined>(undefined);

  /**
   * @function fetch
   * @returns Promise<void>
   * Invoke debounced fetch
   */
  const fetch = async () => {
    const search = await tmdbCall({ search: searchTerm });
    if (search) setSearchResults(search.response.results);
  };

  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clear timer
    if (timeoutId.current) window.clearTimeout(timeoutId.current);

    // Assign new timer
    timeoutId.current = window.setTimeout(() => {
      if (searchTerm.length > 0) fetch();
    }, 850) as unknown as NodeJS.Timeout;

    return () => {
      if (timeoutId.current) {
        isTypingRef.current = false;
        window.clearTimeout(timeoutId.current);
      }
    };
  }, [searchTerm]);

  /**
   * @function handleLabelVisibility
   * @returns void undefined
   * Alters visibility of the input label
   */
  const labelRef = useRef<HTMLLabelElement>(null);

  const handleLabelVisibility = (prop: 'visible' | 'barelyVisible'): void | undefined => {
    if (labelRef.current && searchTerm.length === 0) {
      return labelRef.current?.setAttribute('data-opacity', prop);
    }
    return undefined;
  };

  return (
    <section
      className='fdSearchBar'
      data-orientation={orientation}>
      <div className='fdSearchBar__header'>
        <fieldset className='fdSearchBar__header__fieldset'>
          <label
            className='fdSearchBar__header__fieldset__label'
            htmlFor='fdSearchBar__fieldset__input'
            data-opacity={searchTerm.length > 0 ? 'hidden' : 'barelyVisible'}
            ref={labelRef}>
            <IcBaselineSearch />
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
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              isTypingRef.current = true;
              setSearchTerm(e?.target.value.replace(' ', '-').toLowerCase());
            }}
          />
        </fieldset>
      </div>

      <div
        className='fdSearchBar__results'
        data-anim={searchResults && searchResults.length ? 'enabled' : 'disabled'}>
        <ul className='fdSearchBar__results__ul'>
          {!isTypingRef.current && searchResults
            ? searchResults.slice(0, viewportChunkSize).map((props, index) => (
                <li
                  className='fdSearchBar__results__ul__li'
                  key={`fd-search-result-${index}`}>
                  <picture className='fdSearchBar__results__ul__li__article'>
                    <img
                      src={`https://image.tmdb.org/t/p/w780${props.poster_path}`}
                      alt={`${props.title}`}
                    />
                  </picture>
                  <div
                    className='fdSearchBar__results__ul__li__overlay'
                    onClick={() => setHeroData(props)}>
                    <button
                      className='fdSearchBar__results__ul__li__overlay--play'
                      aria-label='Play trailer'>
                      <IcOutlinePlayCircle />
                    </button>
                  </div>
                </li>
              ))
            : Array.from({ length: viewportChunkSize }).map((_, i) => (
                <li
                  className='fdSearchBar__results__ul__li'
                  key={`fd-search-result-placeholder-${i}`}></li>
              ))}
        </ul>
      </div>
    </section>
  );
};

export default FDSearch;
