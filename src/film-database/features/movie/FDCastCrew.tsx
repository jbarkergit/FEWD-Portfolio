// Deps
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// Context
import { useCatalogProvider } from '../../context/CatalogContext';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../../composables/tmdb-api/hooks/useTmdbFetcher';
// Hooks
import { usePaginateData } from '../../hooks/usePaginateData';
// Components
import FDCarousel from '../../components/carousel/FDCarousel';

const FDCastCrew = () => {
  const { paramId } = useParams();
  const { itemsPerPage, setHeroData } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  const fetch = async () => {
    const data = (await useTmdbFetcher({ credits: Number(paramId) })) as Namespace_Tmdb.Credits_Obj;
    const paginatedData = usePaginateData(data, itemsPerPage, setHeroData);
    setCastCrew(paginatedData);
  };

  useEffect(() => {
    if (paramId) fetch();
  }, [paramId]);

  /** JSX */
  if (castCrew)
    return (
      <>
        {castCrew.map(([key, value], index) => {
          return <FDCarousel type={key === 'cast' ? 'cast' : 'crew'} mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />;
        })}
      </>
    );
};

export default FDCastCrew;
