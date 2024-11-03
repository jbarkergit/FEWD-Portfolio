import { Namespace_Tmdb } from '../../composables/tmdb-api/hooks/useTmdbFetcher';

const FDMovieBackdrop = ({ details }: { details: Namespace_Tmdb.Details_Obj['details'] }) => {
  return (
    <div className='fdMovie__backdrop'>
      <picture>
        <img src={`https://image.tmdb.org/t/p/original/${details.backdrop_path}`} alt={`${details.title}`} fetchPriority='high' />
      </picture>
    </div>
  );
};

export default FDMovieBackdrop;
