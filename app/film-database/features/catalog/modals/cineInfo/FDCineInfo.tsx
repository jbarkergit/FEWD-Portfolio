import { useState, useEffect } from 'react';
import FDiFrame from '~/film-database/components/iframe/FDiFrame';
import FDDetails from '~/film-database/components/details/FDDetails';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import GenericCarousel from '~/film-database/components/carousel/GenericCarousel';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useModalTrailerContext } from '~/film-database/context/ModalTrailerContext';

const FDCineInfo = () => {
  const [credits, setCredits] = useState<TmdbResponseFlat['credits'] | undefined>(undefined);
  const { modalTrailer } = useModalTrailerContext();

  useEffect(() => {
    const controller = new AbortController();

    const fetch = async (): Promise<void> => {
      if (!modalTrailer) return;
      const credits = await tmdbCall(controller, { credits: modalTrailer.id });
      setCredits(credits.response);
    };
    fetch();

    return () => controller.abort();
  }, [modalTrailer]);

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
