import { useEffect, useState } from 'react';

import { useTmdbFetcher, type Namespace_Tmdb } from '../../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../../context/CatalogContext';
import FDiFrame from '../../../../components/iframe/FDiFrame';
import { usePaginateData } from '../../../../hooks/usePaginateData';
import FDDetails from '../../../../components/movie/FDDetails';

const FDMovie = () => {
  const { heroData, maxCarouselNodes } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  const fetch = async (): Promise<void> => {
    const castCrewResponse = (await useTmdbFetcher({ credits: (heroData as Namespace_Tmdb.BaseMedia_Provider).id })) as Namespace_Tmdb.Credits_Obj;
    const castCrew = usePaginateData(castCrewResponse, maxCarouselNodes);
    setCastCrew(castCrew);
  };

  useEffect(() => {
    fetch();
  }, [heroData]);

  if (heroData && castCrew)
    return (
      <div className='FDMovie'>
        <FDiFrame />
        <FDDetails modal={true} />
        <section className='FDMovie__castCrew'>
          {/* {castCrew.map(([key, value], index) => (
            <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />
          ))} */}
        </section>
      </div>
    );
};

export default FDMovie;
