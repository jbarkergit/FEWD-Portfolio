import { useState, useEffect } from 'react';
import FDiFrame from '~/film-database/components/iframe/FDiFrame';
import FDDetails from '~/film-database/components/movie/FDDetails';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import GenericCarousel from '~/film-database/components/carousel/GenericCarousel';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useHeroData } from '~/film-database/context/HeroDataContext';

const FDCineInfo = () => {
  const { heroData } = useHeroData();
  const [credits, setCredits] = useState<TmdbResponseFlat['credits'] | undefined>(undefined);

  const fetch = async (): Promise<void> => {
    if (!heroData) return;
    const credits = await tmdbCall({ credits: heroData.id });
    setCredits(credits.response);
  };

  useEffect(() => {
    fetch();
  }, [heroData]);

  if (credits)
    return (
      <div className='fdCineInfo'>
        <FDiFrame type={'modal'} />
        <FDDetails modal={true} />
        <GenericCarousel
          carouselIndex={1}
          carouselName={'cinemaInformation'}
          heading={'Cast'}
          data={credits.cast}
        />
        <GenericCarousel
          carouselIndex={2}
          carouselName={'cinemaInformation'}
          heading={'Crew'}
          data={credits.crew}
        />
      </div>
    );
};

export default FDCineInfo;
