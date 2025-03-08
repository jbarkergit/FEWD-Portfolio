import { useEffect, useState } from 'react';
import FDCarousel from '../../../../components/carousel/FDCarousel';
import { useTmdbFetcher, type Namespace_Tmdb } from '../../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../../context/CatalogContext';
import FDiFrame from '../../../../components/iframe/FDiFrame';
import { usePaginateData } from '../../../../hooks/usePaginateData';
import FDDetails from '../../../../components/movie/FDDetails';

const FDMovieModal = () => {
  const { heroData } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  const fetch = async (): Promise<void> => {
    const castCrewResponse = (await useTmdbFetcher({ credits: (heroData as Namespace_Tmdb.BaseMedia_Provider).id })) as Namespace_Tmdb.Credits_Obj;
    const castCrew = usePaginateData(castCrewResponse);
    setCastCrew(castCrew);
  };

  useEffect(() => {
    fetch();
  }, [heroData]);

  if (heroData && castCrew)
    return (
      <>
        <FDiFrame />
        <FDDetails modal={true} />
        <section className='fdMovieModal__container__castCrew'>
          {castCrew.map(([key, value], index) => (
            <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />
          ))}
        </section>
      </>
    );
};

export default FDMovieModal;
