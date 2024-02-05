import { useState, useEffect } from 'react';
import FDFooter from '../components/navigation/footer/FDFooter';
import FDHeader from '../components/navigation/header/FDHeader';
import useCreateCarousel from '../component-creation/useCreateCarousel';
import { useTMDBApi } from '../hooks/useTMDBApi';

const FDHomePage = () => {
  /** Notes
   * Need to rate limit in the event of accidental loops
   * -- am i reducing the data?
   *
   * Rate limiting front-end is entirely just to prevent excessive API calls
   * -- if i'm not filtering data, should i just rate limit inside of their individual calls?
   *
   * Need to create intricite data structure for all API call data
   * -- if i'm filtering data
   *
   * Need to write conditionals for the event that an API call fails (no data to render)
   * -- just a reminder
   */

  const [nowPlaying, setNowPlaying] = useState<[]>([]);

  useEffect(() => {
    useTMDBApi('https://api.themoviedb.org/3/movie/now_playing')
      .then((rawData) => setNowPlaying(rawData as []))
      .catch((error) => console.error('Error:', error));
  }, []);

  console.log(nowPlaying);

  return (
    <div className='filmDatabase'>
      <div className='filmDatabase--backdrop' />
      <FDHeader />
      <section className='filmDatabase__content'>
        {/* {nowPlaying !== undefined ? Array.isArray(nowPlaying) ? <>array</> : <>object</> : <div>loading state</div>} */}
        {useCreateCarousel({ heading: 'Now Playing', landscape: true })}
      </section>
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
