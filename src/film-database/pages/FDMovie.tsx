import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useTmdbUrlBuilder } from '../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useTmdbFetcher } from '../composables/tmdb-api/hooks/useTmdbFetcher';

const FDMovie = () => {
  const [movieStore, setMovieStore] = useState<[]>([]);

  const propertyId = parseInt(useLocation().pathname.slice('/film-database/'.length));

  const fetchStores = async () => {
    const providers = useTmdbUrlBuilder('watchProviders', { movie_id: propertyId })!;
    const cast = useTmdbUrlBuilder('credits', { movie_id: propertyId })!;
    const data = await useTmdbFetcher([providers, cast]);
    // useTmdbFetcher(providers);
    // console.log(data);
  };

  useEffect(() => {
    fetchStores();
  }, []);

  // const movieProviders = useMemo(() => {
  //   const buy = movieStore[0][0].endpoint.US.buy;
  //   const rent = movieStore[0][0].endpoint.US.rent;
  //   return { buy, rent };
  // }, [movieStore]);

  return (
    <div className='fdMovie'>
      <div className='fdMovie__container'>
        <div className='fdMovie__container__backdrop'>
          <picture>{/* <img src={} alt={} /> */}</picture>
        </div>
        <main className='fdMovie__container__info'>
          <article className='fdMovie__container__info__article'>
            <header>
              <hgroup className='fdMovie__container__info__article__hgroup'>
                <h1>Movie Name</h1>
                <h2>Release Date</h2>
              </hgroup>
            </header>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos necessitatibus alias, perferendis temporibus eos asperiores similique, libero ab dolorem
              nisi odit eveniet fuga. Nam, et!
            </p>
          </article>
          <nav className='fdMovie__container__info__cta'>
            <button aria-label=''>Continue Browsing</button>
            <button aria-label=''>Watch the Trailer</button>
          </nav>
        </main>
        <div className='fdMovie__container__sidebar'>
          <aside className='fdMovie__container__sidebar__credits'></aside>
        </div>
      </div>
      <div className='fdMovie__container'></div>
    </div>
  );
};

export default FDMovie;
