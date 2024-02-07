import { Fragment, useEffect, useState } from 'react';

// reusable components
import FDHeader from '../components/navigation/header/FDHeader';
import FDFooter from '../components/navigation/footer/FDFooter';
import useCreateCarousel from '../component-creation/useCreateCarousel';

// api
import { tmdbApiEndPoints } from '../api/data/tmdbApiEndPoints';
import { useTmdbFetch } from '../api/hooks/useTmdbFetch';

const FDHomePage = () => {
  const [tmdbData, setTmdbData] = useState<{}>({});

  // Invoke fetch data hooks
  useEffect(() => {
    try {
      useTmdbFetch(tmdbApiEndPoints.movieLists).then((data) => setTmdbData({ movieLists: data }));
    } catch (error) {
      console.error(Error);
    }

    // abort fetch calls when component unmounts
    const controller = new AbortController();
    return () => controller.abort();
  }, []);

  // CLG Data
  useEffect(() => console.log(tmdbData), [tmdbData]);

  return (
    <div className='filmDatabase'>
      <div className='filmDatabase--backdrop' />
      <FDHeader />
      <section className='filmDatabase__content'>
        {Object.keys(tmdbData).map((key) => (
          <Fragment key={key}>{useCreateCarousel({ heading: 'Now Playing', landscape: true, data: key })}</Fragment>
        ))}
      </section>
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
