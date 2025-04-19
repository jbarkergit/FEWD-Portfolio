import { useState, useEffect } from 'react';
import FDiFrame from '~/film-database/components/iframe/FDiFrame';
import FDDetails from '~/film-database/components/movie/FDDetails';
import { useTmdbFetcher, type Namespace_Tmdb } from '~/film-database/composables/tmdb-api/hooks/useTmdbFetcher';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import { usePaginateData } from '~/film-database/hooks/usePaginateData';
import FDCineInfoCarousel from './FDCineInfoCarousel';

const FDCineInfo = () => {
  const { heroData, maxCarouselNodes } = useCatalogProvider();
  const [castCrew, setCastCrew] = useState<ReturnType<typeof usePaginateData> | undefined>(undefined);

  const fetch = async (): Promise<void> => {
    const castCrewResponse = (await useTmdbFetcher({ credits: (heroData as Namespace_Tmdb.BaseMedia_Provider).id })) as Namespace_Tmdb.Credits_Obj;

    const cast = castCrewResponse.credits.cast;
    const crew = castCrewResponse.credits.crew.filter((crewMember, index, self) => {
      return index === self.findIndex((t) => t.name === crewMember.name && crewMember.known_for_department !== 'Acting');
    });
    const castCrew = usePaginateData({ credits: { cast: cast, crew: crew, id: castCrewResponse.credits.id } }, maxCarouselNodes);
    setCastCrew(castCrew);
  };

  useEffect(() => {
    fetch();
  }, [heroData]);

  if (heroData && castCrew)
    return (
      <div className='fdCineInfo'>
        <FDiFrame type={'modal'} />
        <FDDetails modal={true} />
        {castCrew.map(([key, value], index) => (
          <FDCineInfoCarousel mapIndex={index} heading={key} data={value} key={`${key}-${index}`} />
        ))}
      </div>
    );
};

export default FDCineInfo;
