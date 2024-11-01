// Deps
import { useEffect, useState } from 'react';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../../../../composables/tmdb-api/hooks/useTmdbFetcher';
// Features
import FDiFramePlayer from './player/FDiFramePlayer';
import { useCatalogProvider } from '../../../../context/CatalogContext';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

const FDiFrame = () => {
  const { heroData } = useCatalogProvider();
  const [trailers, setTrailers] = useState<Namespace_Tmdb.Videos_Obj['videos']['results'] | undefined>(undefined);

  const fetchTrailer = async (): Promise<void> => {
    const data = (await useTmdbFetcher({ videos: heroData?.id })) as Namespace_Tmdb.Videos_Obj;
    const filteredEntries = data.videos.results.filter((obj) => obj.name.includes('Trailer'));
    setTrailers(filteredEntries);
  };

  useEffect(() => {
    if (heroData) fetchTrailer();
  }, [heroData]);

  /** Component */
  if (trailers && trailers.length > 0) {
    return <FDiFramePlayer trailers={trailers} setTrailers={setTrailers} />;
  } else {
    return (
      <section className='fdiFrame'>
        <figure className='fdiFrame__backdrop'>
          <picture>
            <img src={`https://image.tmdb.org/t/p/original/${heroData?.backdrop_path}`} alt={heroData?.title} />
          </picture>
          <figcaption>{heroData?.title}</figcaption>
        </figure>
      </section>
    );
  }
};
export default FDiFrame;
