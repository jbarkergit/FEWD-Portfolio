import { useLocation } from 'react-router-dom';
import { useFilmDatabaseWebStorage } from '../../hooks/web-storage-api/useFilmDatabaseWebStorage';
import { Type_Tmdb_ApiCallMovie_Obj, Type_Tmdb_useApiReturn_Obj } from '../../api/types/TmdbDataTypes';
import useCreatePicture from '../../hooks/component-creation/useCreatePicture';

const FDHero = () => {
  const userLocation = useLocation();
  const nowPlaying = useFilmDatabaseWebStorage({ userLocation: userLocation, cacheKey: 'nowPlaying' }).getData() as Type_Tmdb_useApiReturn_Obj[];

  return (
    <section className='fdHero'>
      <div className='fdHero__infographic'>
        {nowPlaying?.map((obj) =>
          obj.value.splice(0, 5).map((data, index) => {
            const values = data as unknown as Type_Tmdb_ApiCallMovie_Obj;
            console.log(values);
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
        {Array.from({ length: 5 }).map((_, index) => (
          <div className='fdHero__controller__option' key={`fdHeroRadio-${index}`}>
            <input type='radio' id='huey' name='drone' value='huey' checked />
            <label htmlFor='huey'>Huey</label>
          </div>
        ))}
      </fieldset>
    </section>
  );
};

export default FDHero;

/**
 * 
.slide[data-index="1"] { transform: translateX(0%); }
.slide[data-index="2"] { transform: translateX(-100%); }
.slide[data-index="3"] { transform: translateX(-200%); }

 */
