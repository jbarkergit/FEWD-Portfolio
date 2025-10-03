import { memo, useRef, type ChangeEvent } from 'react';
import { IcBaselineSearch } from '~/film-database/assets/svg/icons';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import englishBadWordsRaw from 'naughty-words/en.json';
import type { TmdbMovieProvider } from '~/film-database/composables/types/TmdbResponse';

const FDSearchHeader = memo(
  ({
    setSearchResults,
  }: {
    setSearchResults: React.Dispatch<React.SetStateAction<TmdbMovieProvider[] | undefined>>;
  }) => {
    const labelRef = useRef<HTMLLabelElement>(null);
    const timeoutId = useRef<NodeJS.Timeout | null>(null);
    const searchTermRef = useRef<string>('');

    /** Handle label visibility */
    const handleLabelVisibility = (state: 'visible' | 'barelyVisible' | 'hidden') => {
      if (state !== 'hidden' && !searchTermRef.current.length) labelRef.current?.setAttribute('data-opacity', state);
      else labelRef.current?.setAttribute('data-opacity', 'hidden');
    };

    /**
     * Debounced fetch
     * NOTE: TMDB 'adult' query parameter partially filters out adult results given not all films may have the correct flag.
     * There's too many loopholes to abuse the system; therefore, filtering results isn't as simple as filtering title and overview by a keyword array.
     * The only options to combat this is a content moderation service AND some combination of region locking, keyword and genre filtering and/or locking results by PG-13 rating.
     * Utilizing the naughty-words npm package is the best non-subscription service/solution we can employ.
     */
    const fetch = async () => {
      const controller = new AbortController();

      const search = await tmdbCall(controller, { search: searchTermRef.current });

      const filteredResults = search.response.results.filter((res) => {
        if (res.adult || !res.title || !res.overview) return false;
        const title = res.title.trim().toLowerCase();
        const overview = res.overview.toLowerCase();
        return !englishBadWordsRaw.some((word) => title.includes(word) || overview.includes(word));
      });

      if (search) setSearchResults(filteredResults);

      return () => controller.abort();
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

    return (
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
    );
  }
);

export default FDSearchHeader;
