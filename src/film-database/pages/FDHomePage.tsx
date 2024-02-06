import { useEffect, useState } from 'react';

// reusable components
import FDHeader from '../components/navigation/header/FDHeader';
import FDFooter from '../components/navigation/footer/FDFooter';
import useCreateCarousel from '../component-creation/useCreateCarousel';

// api
import { tmdbApiEndPoints } from '../api/data/tmdbApiEndPoints';
import { useTmdbFetch } from '../api/hooks/useTmdbFetch';

const FDHomePage = () => {
  const [tmdbData, setTmdbData] = useState<{}[] | null>(null);

  // useEffect(() => {
  //   const fetchAllData = async () => {
  //     try {
  //       /**
  //        * create tmdbApiEndPoints copy with map to maintain data structure
  //        * make map func async to allow for await
  //        */
  //       const newData = tmdbApiEndPoints.map(async (obj) => {
  //         // seperate key object keys referring to category of key value pairs
  //         const objKey: string = Object.keys(obj)[0];
  //         // access each object's array of objects
  //         //@ts-ignore
  //         const objectKeyArray: { key: string; endPoint: string }[] = obj[objKey];
  //         // improve app efficiency and speed with await Promise.all
  //         const data = await Promise.all(
  //           // create new array with original keys and the fetched data
  //           objectKeyArray.map(async (keyValuePair) => ({
  //             key: keyValuePair.key,
  //             data: await useTmdbFetch(keyValuePair.endPoint),
  //           }))
  //         );

  //         // return new data to store in state
  //         return { ...obj, [`${objKey}Data`]: await Promise.all(data) };
  //       });

  //       setTmdbData(await Promise.all(newData));

  //       console.log(tmdbData);
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };
  // }, []);

  return (
    <div className='filmDatabase'>
      <div className='filmDatabase--backdrop' />
      <FDHeader />
      <section className='filmDatabase__content'>
        <>{useCreateCarousel({ heading: 'Now Playing', landscape: true })}</>
      </section>
      <FDFooter />
    </div>
  );
};

export default FDHomePage;
