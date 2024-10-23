// Deps
import { useState, useEffect, useRef, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
// Assets
import { SvgSpinnersRingResize, MaterialSymbolsPlayArrow } from '../../../assets/google-material-symbols/iFrameSymbols';
import { MaterialSymbolsSearch } from '../../../assets/google-material-symbols/menuSymbols';

const FDCarouselSearch = ({ setHeroData }: { setHeroData: Dispatch<SetStateAction<Namespace_Tmdb.BaseMedia_Provider | undefined>> }) => {
  /** User is searching */
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /** Handle label */
  const labelRef = useRef<HTMLLabelElement>(null);

  /** Invoke fetch with timeout */
  const [searchResults, setSearchResults] = useState<Namespace_Tmdb.Search_Obj['search']['results'] | undefined>(undefined);

  useEffect(() => {
    console.log(searchResults);
  }, [searchResults]);

  const invokeFetch = async (): Promise<void> => {
    if (searchTerm.length > 0) {
      setIsTyping(false);
      const data = (await useTmdbFetcher({ key: 'search', args: { search: searchTerm } })) as unknown as Namespace_Tmdb.Search_Obj;
      if (data) setSearchResults(data.search.results);
    }
  };

  useEffect(() => {
    if (searchTerm.length === 0) setSearchResults([]);
    if (searchTerm.length > 0) setIsTyping(true);

    if (timerRef.current) window.clearTimeout(timerRef.current);
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
      <section className='fdSearchBar__header'>
        <fieldset className='fdSearchBar__header__fieldset'>
          <label
            className='fdSearchBar__header__fieldset__label'
            htmlFor='fdSearchBar__fieldset__input'
            data-opacity={searchTerm.length > 0 ? 'hidden' : 'barelyVisible'}
            ref={labelRef}>
            <MaterialSymbolsSearch />
            Find the movies you're interested in
          </label>
          <input
            className='fdSearchBar__header__fieldset__input'
            type='search'
            pattern='search'
            autoFocus={true}
            onPointerOver={() => {
              if (searchTerm.length === 0) labelRef.current?.setAttribute('data-opacity', 'visible');
            }}
            onPointerLeave={() => {
              if (searchTerm.length === 0) labelRef.current?.setAttribute('data-opacity', 'barelyVisible');
            }}
            onFocus={() => {
              if (searchTerm.length === 0) labelRef.current?.setAttribute('data-opacity', 'visible');
            }}
            onBlur={() => {
              if (searchTerm.length === 0) labelRef.current?.setAttribute('data-opacity', 'barelyVisible');
            }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchTerm(e?.target.value.replace(' ', '-').toLowerCase())}
          />
          {isTyping ? <SvgSpinnersRingResize /> : null}
        </fieldset>
      </section>

      <section className='fdSearchBar__results' data-anim={searchResults && searchResults.length > 0 ? 'enabled' : 'disabled'}>
        <ul className='fdSearchBar__results__ul'>
          {searchResults && !isTyping
            ? searchResults.splice(0, 7).map((props) => {
                if (props.poster_path)
                  return (
                    <li className='fdSearchBar__results__ul__li' key={uuidv4()}>
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
      </section>
    </section>
  );
};

export default FDCarouselSearch;
