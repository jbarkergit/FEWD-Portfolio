// Deps
import { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router';
// Composables
import { useTmdbFetcher } from '../../composables/tmdb-api/hooks/useTmdbFetcher';
import type { Namespace_Tmdb } from '../../composables/tmdb-api/hooks/useTmdbFetcher';
// Context
import { useCatalogProvider } from '../../context/CatalogContext';
// Components
import FDiFramePlayer from './player/FDiFramePlayer';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

const FDiFrame = ({ trailerId }: { trailerId?: number }) => {
  const { initialHeroData } = useLoaderData();
  const { heroData, setHeroData } = useCatalogProvider();
  const [trailers, setTrailers] = useState<Namespace_Tmdb.Videos_Obj['videos']['results'] | undefined>(undefined);

  // Set trailers with initialHeroData from useLoaderData func
  useEffect(() => setHeroData(initialHeroData), []);

  // Fetch trailer user request
  const fetchTrailerRequest = async (): Promise<void> => {
    const data = (await useTmdbFetcher({ videos: trailerId ? trailerId : heroData?.id })) as Namespace_Tmdb.Videos_Obj;
    const filteredEntries = data.videos.results.filter((obj) => obj.name.includes('Trailer'));
    setTrailers(filteredEntries);
  };

  useEffect(() => {
    if (heroData) fetchTrailerRequest();
  }, [heroData]);

  // JSX
  return (
    <section className='fdiFrame'>
      {trailers && trailers.length > 0 ? (
        <FDiFramePlayer trailers={trailers} setTrailers={setTrailers} />
      ) : (
        <picture className='fdiFrame__player'>
          <img src={`https://image.tmdb.org/t/p/original/${heroData?.backdrop_path}`} alt={heroData?.title} />
        </picture>
      )}
    </section>
  );
};

export default FDiFrame;
