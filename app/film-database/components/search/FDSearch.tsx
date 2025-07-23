import { useState, useEffect, useRef, type ChangeEvent } from 'react';
import { SvgSpinnersRingResize, IcOutlinePlayCircle, IcBaselineSearch } from '~/film-database/assets/svg/icons';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import type { TmdbResponse } from '~/film-database/composables/types/TmdbResponse';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';

const FDSearch = ({ orientation }: { orientation: 'desktop' | 'mobile' }) => {
  // Context
  const { setHeroData, viewportChunkSize } = useCatalogProvider();

  // State
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [searchResults, setSearchResults] = useState<TmdbResponse['string']['search']['results'] | undefined>(
    undefined
  );

  // Debounce
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

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
  const invokeFetch = async () => {
    if (searchTerm.length > 0) {
      setIsTyping(false);
      const search = await tmdbCall({ search: searchTerm });
      if (search) setSearchResults(search.response.results);
    }
  };

  useEffect(() => {
    if (searchTerm.length === 0) setSearchResults([]);
    if (searchTerm.length > 0) setIsTyping(true);

    // Clear timer
    if (timeoutId.current) window.clearTimeout(timeoutId.current);
    // Assign new timer
    timeoutId.current = window.setTimeout(() => invokeFetch(), 850) as unknown as NodeJS.Timeout;

    return () => {
      if (timeoutId.current) {
        setIsTyping(false);
        window.clearTimeout(timeoutId.current);
      }
    };
  }, [searchTerm]);

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
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchTerm(e?.target.value.replace(' ', '-').toLowerCase())
            }
          />
          {isTyping ? <SvgSpinnersRingResize /> : null}
        </fieldset>
      </div>

      <div
        className='fdSearchBar__results'
        data-anim={searchResults && searchResults.length > 0 ? 'enabled' : 'disabled'}>
        <ul className='fdSearchBar__results__ul'>
          {searchResults && !isTyping
            ? searchResults.splice(0, viewportChunkSize).map((props, index) => {
                if (props.poster_path)
                  return (
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
                  );
              })
            : null}
        </ul>
      </div>
    </section>
  );
};

export default FDSearch;
