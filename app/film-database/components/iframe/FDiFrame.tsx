import { useEffect, useState } from 'react';
import FDiFramePlayer from './player/FDiFramePlayer';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { tmdbCall } from '~/film-database/composables/tmdbCall';
import { useHeroData } from '~/film-database/context/HeroDataContext';
import { useModalTrailer } from '~/film-database/context/ModalTrailerContext';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

const FDiFrame = ({ type }: { type: 'hero' | 'modal' }) => {
  const { heroData } = useHeroData();
  const { modalTrailer } = useModalTrailer();
  const [trailers, setTrailers] = useState<TmdbResponseFlat['videos']['results'] | undefined>(undefined);

  useEffect(() => {
    const controller = new AbortController();

    const fetchTrailer = async (): Promise<void> => {
      const id = type === 'hero' ? heroData?.id : modalTrailer?.id;
      if (!id) return;
      const videos = await tmdbCall(controller, { videos: id });
      const filteredEntries = videos.response.results.filter((obj) => obj.name.includes('Trailer'));
      setTrailers(filteredEntries);
    };

    fetchTrailer();

    return () => controller.abort();
  }, [heroData, modalTrailer]);

  // JSX
  return (
    <section
      className='fdiFrame'
      data-type={type}>
      {trailers && trailers.length ? (
        <FDiFramePlayer
          trailers={trailers}
          setTrailers={setTrailers}
          type={type}
        />
      ) : (
        <picture className='fdiFrame__player'>
          <img
            src={`https://image.tmdb.org/t/p/original/${heroData?.backdrop_path}`}
            alt={heroData?.title}
          />
        </picture>
      )}
    </section>
  );
};

export default FDiFrame;
