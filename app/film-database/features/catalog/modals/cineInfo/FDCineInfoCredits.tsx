import { useState, useEffect } from 'react';
import GenericCarousel from '~/film-database/components/carousel/GenericCarousel';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useModalTrailerContext } from '~/film-database/context/ModalTrailerContext';

const FDCineInfoCredits = () => {
  const { modalTrailer } = useModalTrailerContext();
  const [credits, setCredits] = useState<TmdbResponseFlat['credits'] | undefined>(undefined);

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
      <>
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
      </>
    );
};

export default FDCineInfoCredits;
