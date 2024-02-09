import { Fragment, useEffect, useState } from 'react';

// reusable components
import FDHeader from '../components/navigation/header/FDHeader';
import FDFooter from '../components/navigation/footer/FDFooter';
import useCreateCarousel from '../component-creation/useCreateCarousel';

// api
import { tmdbApiEndPoints } from '../api/data/tmdbApiEndPoints';
import { useTmdbFetch } from '../api/hooks/useTmdbFetch';

const FDHomePage = () => {
  const [tmdbData, setTmdbData] = useState<{} | undefined>({});

  // Invoke fetch data hooks on mount
  useEffect(() => {
    try {
      // movie lists
      useTmdbFetch(tmdbApiEndPoints.movieLists).then((data: {}[] | undefined) => {
        if (data !== undefined) setTmdbData(data);
      });
    } catch (error) {
      console.error(Error);
    }

    // abort fetch calls when component unmounts
    const controller = new AbortController();
    return () => controller.abort();
  }, []);

  useEffect(() => {
    console.log(tmdbData);
  }, [tmdbData]);

  return (
    <div className='filmDatabase'>
      <div className='filmDatabase--backdrop' />
      <FDHeader />
      <section className='filmDatabase__content'>
        {tmdbData !== undefined
          ? Object.entries<{ [key: string]: {}[] }>(tmdbData).map(([key, value]: [key: string, value: {}]) => (
              <Fragment key={key}>{useCreateCarousel({ heading: key, landscape: true, data: value })}</Fragment>
            ))
          : null}
      </section>
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
