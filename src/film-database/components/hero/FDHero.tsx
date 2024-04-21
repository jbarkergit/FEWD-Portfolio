import { useLocation } from 'react-router-dom';
import { Type_Tmdb_useApiReturn_Obj, Type_Tmdb_ApiCallMovie_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';
import { useFilmDatabaseWebStorage } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
import useCreatePicture from '../../hooks/useCreatePicture';

const FDHero = () => {
  /** Component data */
  const userLocation = useLocation();
  const nowPlaying = useFilmDatabaseWebStorage({ userLocation: userLocation, cacheKey: 'nowPlaying' }).getData() as Type_Tmdb_useApiReturn_Obj[];

  return (
    <section className='fdHero'>
      <div className='fdHero__infographic'>
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
    </section>
  );
};

export default FDHero;
