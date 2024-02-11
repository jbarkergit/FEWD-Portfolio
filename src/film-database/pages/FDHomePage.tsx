import { Fragment, useEffect, useState } from 'react';

// reusable jsx components
import FDHeader from '../components/navigation/header/FDHeader';
import FDFooter from '../components/navigation/footer/FDFooter';
import FDCarouselChildLP from '../components/carousels/carousel-children/FDCarouselChildLP';

// jsx component hooks
import useCreateCarousel from '../hooks/useCreateCarousel';

// api
import { tmdbApiEndPoints } from '../api/data/tmdbApiEndPoints';
import { UseTmdbDataArrayType, useTmdbFetch } from '../api/hooks/useTmdbFetch';
import { TmdbDataUnionArrayType } from '../api/types/TmdbDataTypes';

// lib
import { v4 as uuidv4 } from 'uuid';

// component
const FDHomePage = () => {
  // data fetch hook storage
  const [tmdbData, setTmdbData] = useState<UseTmdbDataArrayType>([]);

  // Invoke fetch data hooks on mount
  useEffect(() => {
    try {
      // Movie lists
      useTmdbFetch(tmdbApiEndPoints.movieLists).then((data: UseTmdbDataArrayType | undefined) => {
        if (data) setTmdbData(data as UseTmdbDataArrayType);
        else throw new Error('Could not fetch requested data.');
      });

      // Catch block
    } catch (error) {
      console.error(Error);
    }

    // abort fetch calls when component unmounts
    const controller = new AbortController();
    return () => controller.abort();
  }, []);

  return (
    <div className='filmDatabase'>
      <FDHeader />

      {tmdbData?.map((dataObject: { key: string; data: TmdbDataUnionArrayType }) => (
        <Fragment key={uuidv4()}>{useCreateCarousel({ heading: dataObject.key, dataObject: dataObject.data })}</Fragment>
      ))}

      <FDFooter />
    </div>
  );
};

export default FDHomePage;
