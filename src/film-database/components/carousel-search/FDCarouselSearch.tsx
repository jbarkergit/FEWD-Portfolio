import { useState, useEffect, useRef, ChangeEvent, Dispatch, SetStateAction } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { MaterialSymbolsPlayArrow, SvgSpinnersRingResize } from '../../assets/google-material-symbols/iFrameSymbols';
import { MaterialSymbolsSearch } from '../../assets/google-material-symbols/menuSymbols';
import { MaterialSymbolsChevronLeft, MaterialSymbolsChevronRight } from '../../assets/google-material-symbols/carouselSymbols';

import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';

import { Type_Tmdb_Api_Union, Type_Tmdb_QuerieMovie_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';
import FDCarouselButton from '../carousel/FDCarouselButton';

const FDCarouselSearch = ({ setHeroData }: { setHeroData: Dispatch<SetStateAction<Type_Tmdb_Api_Union | null>> }) => {
  /** User is searching */
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  /** Handle label */
  const labelRef = useRef<HTMLLabelElement>(null);

  /** Fetch */
  const [searchResults, setSearchResults] = useState<Type_Tmdb_QuerieMovie_Obj[] | undefined>(undefined);

  const fetchResults = async (): Promise<void> => {
    const fetchUrl = useTmdbUrlBuilder('querieMovie', [{ querie: searchTerm }]);
    const getResults = useFetchTmdbResponse([{ key: fetchUrl.key, endpoint: fetchUrl.endpoint }]);

    getResults.then((data) => {
      if (data) {
        const dataResults = data.flatMap((obj) => obj.endpoint) as Type_Tmdb_QuerieMovie_Obj[];
        setSearchResults(dataResults);
      }
    });
  };

  /** Invoke fetch with timeout */
  const invokeFetch = (): void => {
    if (searchTerm.length > 0) {
      setIsTyping(false);
      fetchResults();
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
          <legend className='fdSearchBar__header__fieldset__legend'>Find the movies you're interested in</legend>
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

      <section className='fdSearchBar__results' data-status={searchResults && searchResults.length > 0 ? 'enabled' : 'disabled'}>
        <ul className='fdSearchBar__results__ul'>
          {searchResults && !isTyping
            ? searchResults?.map((props) => (
                <li className='fdSearchBar__results__ul__li' key={uuidv4()}>
                  <article className='fdSearchBar__results__ul__li__article'>
                    <header className='fdSearchBar__results__ul__li__article__header'>
                      <h2 className='fdSearchBar__results__ul__li__article__header--h2'>{props?.title}</h2>
                    </header>
                    <figure className='fdSearchBar__results__ul__li__article__figure'>
                      <picture>
                        <img src={`https://image.tmdb.org/t/p/original/${props?.poster_path}`} alt={`${props?.overview}`} />
                        <figcaption>{`${props?.title}`}</figcaption>
                      </picture>
                    </figure>
                  </article>
                  <div className='fdSearchBar__results__ul__li__overlay' onClick={() => setHeroData(props as Type_Tmdb_Api_Union)}>
                    <button className='fdSearchBar__results__ul__li__overlay--play' aria-label='Play trailer'>
                      <MaterialSymbolsPlayArrow />
                    </button>
                  </div>
                </li>
              ))
            : null}
        </ul>
        <nav className='fdSearchBar__results__navigation'>
          <FDCarouselButton caption={'Show Previous'} icon={<MaterialSymbolsChevronLeft />} func={() => {}} funcDelta={-1} />
          <FDCarouselButton caption={'Show More'} icon={<MaterialSymbolsChevronRight />} func={() => {}} funcDelta={1} />
        </nav>
      </section>
    </section>
  );
};

export default FDCarouselSearch;
