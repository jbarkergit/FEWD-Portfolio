import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
import { Type_Tmdb_ApiCallMovie_Obj, Type_Tmdb_useApiReturn_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';
import useCreatePicture from '../../hooks/useCreatePicture';

const FDHero = () => {
  const userLocation = useLocation();
  const nowPlaying = useFilmDatabaseWebStorage({ userLocation: userLocation, cacheKey: 'nowPlaying' }).getData() as Type_Tmdb_useApiReturn_Obj[];
  const [radioIndex, setRadioIndex] = useState<number>(0);

  /** Scroll Snapping */
  const scrollSnapper = useRef<HTMLDivElement>(null);

  const updateScroller = () => {
    const scrollSnapperOffset = scrollSnapper.current?.offsetWidth;
    const activeSlideOffset = (scrollSnapper.current?.children[0] as HTMLDivElement).offsetWidth;
    scrollSnapper.current?.scrollTo({ left: activeSlideOffset * (radioIndex + 1) - scrollSnapperOffset!, behavior: 'smooth' });
  };

  useEffect(() => {
    updateScroller(); // Mount
    window.addEventListener('resize', updateScroller);
    return () => window.addEventListener('resize', updateScroller);
  }, [radioIndex]);

  return (
    <section className='fdHero'>
      <div className='fdHero__infographic' ref={scrollSnapper}>
        {nowPlaying?.map((obj) =>
          obj.value.splice(0, 5).map((data, index) => {
            const values = data as unknown as Type_Tmdb_ApiCallMovie_Obj;

            return (
              <div className='fdHero__infographic__slide' key={`fdHeroSlideBackdrop-${index + 1}`}>
                <hgroup className='fdHero__infographic__details'>
                  <h2>{values.title}</h2>
                  <p>{values.overview}</p>
                  <span>{values.vote_average}</span>
                </hgroup>

                {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${values.backdrop_path}`, alt: values.title })}
              </div>
            );
          })
        )}
      </div>

      <fieldset className='fdHero__controller'>
        <legend>Select a Now Playing Film</legend>
        <ul className='fdHero__controller__radios'>
          {Array.from({ length: 5 }).map((_, index) => (
            <li className='fdHero__controller__radios__option' key={`fdHeroRadio-${index}`}>
              <input
                type='radio'
                id={`fdHero__controller__radios__option--input--${index}`}
                name='radioOpt'
                value={`fdHero__controller__option--${index}`}
                checked={index === radioIndex}
                onChange={() => setRadioIndex(index)}
              />
              <label htmlFor={`fdHero__controller__radios__option--label--${index}`}>{`Movie Option ${index}`}</label>
            </li>
          ))}
        </ul>
      </fieldset>
    </section>
  );
};

export default FDHero;
