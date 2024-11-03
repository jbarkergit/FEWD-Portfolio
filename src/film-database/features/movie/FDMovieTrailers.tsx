import { Namespace_Tmdb } from '../../composables/tmdb-api/hooks/useTmdbFetcher';
import FDiFramePlayer from '../catalog/hero/iframe/player/FDiFramePlayer';

const FDMovieTrailers = ({ videos }: { videos: Namespace_Tmdb.Videos_Obj['videos']['results'] }) => {
  const trailers = videos.filter((obj) => obj.name.includes('Trailer'));
  return (
    <>
      {trailers.map(
        (trailer) => trailer.id
        // <FDiFramePlayer trailers={trailers} />
      )}
    </>
  );
};

export default FDMovieTrailers;
