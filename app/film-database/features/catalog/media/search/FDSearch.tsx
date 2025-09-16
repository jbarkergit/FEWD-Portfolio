import { useState, useRef, type ChangeEvent } from 'react';
import { IcOutlinePlayCircle, IcBaselineSearch } from '~/film-database/assets/svg/icons';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useChunkSize } from '~/film-database/context/ChunkSizeContext';
import { useHeroData } from '~/film-database/context/HeroDataContext';
import englishBadWordsRaw from 'naughty-words/en.json';

const FDSearch = ({ orientation }: { orientation: 'desktop' | 'mobile' }) => {
  const { setHeroData } = useHeroData();
  const { chunkSize } = useChunkSize();

  const labelRef = useRef<HTMLLabelElement>(null);

  const searchTermRef = useRef<string>('');
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const [searchResults, setSearchResults] = useState<TmdbResponseFlat['search']['results'] | undefined>(undefined);

  /** Handle label visibility */
  const handleLabelVisibility = (state: 'visible' | 'barelyVisible' | 'hidden') => {
    if (state !== 'hidden' && !searchTermRef.current.length) labelRef.current?.setAttribute('data-opacity', state);
    else labelRef.current?.setAttribute('data-opacity', 'hidden');
  };

  /** Handle input changes */
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Set search term
    searchTermRef.current = e.target.value.trim().replaceAll(' ', '-').toLowerCase();

    // Update label visibility
    if (e.target.value.length) handleLabelVisibility('hidden');

    // Clear timeout
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Assign timeout
    timeoutId.current = setTimeout(() => {
      if (searchTermRef.current.length) fetch();
    }, 850);
  };

  /**
   * Debounced fetch
   * NOTE: TMDB 'adult' query parameter partially filters out adult results given not all films may have the correct flag.
   * There's too many loopholes to abuse the system; therefore, filtering results isn't as simple as filtering title and overview by a keyword array.
   * The only options to combat this is a content moderation service AND some combination of region locking, keyword and genre filtering and/or locking results by PG-13 rating.
   * Utilizing the naughty-words npm package is the best non-subscription service/solution we can employ.
   */
  const fetch = async () => {
    const search = await tmdbCall({ search: searchTermRef.current });

    const filteredResults = search.response.results.filter((res) => {
      if (res.adult || !res.title || !res.overview) return false;
      const title = res.title.trim().toLowerCase();
      const overview = res.overview.toLowerCase();
      return !englishBadWordsRaw.some((word) => title.includes(word) || overview.includes(word));
    });

    if (search) setSearchResults(filteredResults);
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
            data-opacity='barelyVisible'
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
            onChange={handleChange}
          />
        </fieldset>
      </div>

      <div
        className='fdSearchBar__results'
        data-anim={searchResults && searchResults.length ? 'enabled' : 'disabled'}>
        <ul className='fdSearchBar__results__ul'>
          {searchResults && searchResults.length
            ? searchResults.slice(0, chunkSize.viewport).map((props, index) => (
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
                    onPointerUp={() => setHeroData(props)}>
                    <button
                      className='fdSearchBar__results__ul__li__overlay--play'
                      aria-label='Play trailer'>
                      <IcOutlinePlayCircle />
                    </button>
                  </div>
                </li>
              ))
            : Array.from({ length: chunkSize.viewport }).map((_, i) => (
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
