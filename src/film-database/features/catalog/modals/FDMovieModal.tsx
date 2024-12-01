import { useEffect, useState } from 'react';
import FDCarousel from '../../../components/carousel/FDCarousel';
import { useTmdbFetcher, Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../context/CatalogContext';
import { usePaginateData } from '../../../hooks/usePaginateData';

const FDMovieModal = () => {
  const { heroData } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  const fetch = async () => {
    const data = (await useTmdbFetcher({ credits: (heroData as Namespace_Tmdb.BaseMedia_Provider).id })) as Namespace_Tmdb.Credits_Obj;
    const paginatedData = usePaginateData(data);
    setCastCrew(paginatedData);
  };

  useEffect(() => {
    fetch();
  }, [heroData]);

  if (castCrew)
    return (
      <div className='fdMovieModal'>
        <section className='fdMovieModal__container'>
          {castCrew.map(([key, value], index) => {
            return <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />;
          })}
        </section>
      </div>
    );
};

export default FDMovieModal;
