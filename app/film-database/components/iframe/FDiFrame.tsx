import { useEffect, useState } from 'react';
import { useCatalogProvider } from '../../context/CatalogContext';
import FDiFramePlayer from './player/FDiFramePlayer';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { tmdbCall } from '~/film-database/composables/tmdbCall';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

const FDiFrame = ({ type }: { type: 'hero' | 'modal' }) => {
  const { heroData, modalTrailer } = useCatalogProvider();
  const [trailers, setTrailers] = useState<TmdbResponseFlat['videos']['results'] | undefined>(undefined);

  // Fetch trailer user request
  const fetchTrailer = async (): Promise<void> => {
    const id = type === 'hero' ? heroData?.id : modalTrailer?.id;
    if (!id) return;
    const videos = await tmdbCall({ videos: id });
    const filteredEntries = videos.response.results.filter((obj) => obj.name.includes('Trailer'));
    setTrailers(filteredEntries);
  };

  useEffect(() => {
    fetchTrailer();
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
