import { useEffect, useState } from 'react';
import FDCarousel from '../../../components/carousel/FDCarousel';
import { useTmdbFetcher, Namespace_Tmdb } from '../../../composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '../../../context/CatalogContext';
import { usePaginateData } from '../../../hooks/usePaginateData';

const FDMovieModal = () => {
  const { itemsPerPage, setHeroData, movieModalId } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  const fetch = async () => {
    const data = (await useTmdbFetcher({ credits: Number(movieModalId) })) as Namespace_Tmdb.Credits_Obj;
    const paginatedData = usePaginateData(data, itemsPerPage, setHeroData);
    setCastCrew(paginatedData);
  };

  useEffect(() => {
    fetch();
  }, []);

  if (castCrew)
    return (
      <section className='fdMovieModal__container'>
        {castCrew.map(([key, value], index) => {
          return <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />;
        })}
      </section>
    );
};

export default FDMovieModal;
