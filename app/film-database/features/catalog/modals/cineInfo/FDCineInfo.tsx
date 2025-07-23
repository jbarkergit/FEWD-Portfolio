import { useState, useEffect } from 'react';
import FDiFrame from '~/film-database/components/iframe/FDiFrame';
import FDDetails from '~/film-database/components/movie/FDDetails';
import { useCatalogProvider } from '~/film-database/context/CatalogContext';
import FDCineInfoCarousel from './FDCineInfoCarousel';
import { tmdbCall, type TmdbState } from '~/film-database/composables/tmdbCall';
import { tmdbChunk } from '~/film-database/utility/tmdbChunk';

const FDCineInfo = () => {
  const { heroData, modalChunkSize } = useCatalogProvider();
  const [credits, setCredits] = useState<TmdbState<'credits'> | undefined>(undefined);

  type Chunk<T> = T[][];

  const [castCrew, setCastCrew] = useState<
    | {
        cast: Chunk<TmdbState<'credits'>['response']['cast'][number]>;
        crew: Chunk<TmdbState<'credits'>['response']['crew'][number]>;
      }
    | undefined
  >(undefined);

  const fetch = async (): Promise<void> => {
    if (!heroData) return;
    const credits = await tmdbCall({ credits: heroData.id });
    setCredits(credits);
  };

  useEffect(() => {
    fetch();
  }, [heroData]);

  const chunk = () => {
    if (!credits) return;

    const castChunks = tmdbChunk(credits.response.cast, modalChunkSize);

    const filteredCrew = credits.response.crew.filter(
      (crewMember, index, self) =>
        index === self.findIndex((t) => t.name === crewMember.name && crewMember.known_for_department !== 'Acting')
    );

    const crewChunks = tmdbChunk(filteredCrew, modalChunkSize);

    setCastCrew({ cast: castChunks, crew: crewChunks });
  };

  useEffect(() => {
    chunk();
  }, [credits, modalChunkSize]);

  if (heroData && castCrew)
    return (
      <div className='fdCineInfo'>
        <FDiFrame type={'modal'} />
        <FDDetails modal={true} />
        {Object.entries(castCrew).map(([key, value], index) => (
          <FDCineInfoCarousel
            mapIndex={index}
            heading={key}
            data={value}
            key={`${key}-${index}`}
          />
        ))}
      </div>
    );
};

export default FDCineInfo;
