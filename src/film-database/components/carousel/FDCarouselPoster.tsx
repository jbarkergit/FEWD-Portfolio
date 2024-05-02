import { Type_Tmdb_ApiCall_Union, Type_Tmdb_ApiCallMovieList_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';
import useCreatePicture from '../../hooks/useCreatePicture';

type Type_PropDrill = {
  paginatedObj: Type_Tmdb_ApiCall_Union;
  isGridLayout: boolean;
  useFetchTrailer: (index: number) => void;
};

const FDCarouselPoster = ({ paginatedObj, isGridLayout, useFetchTrailer }: Type_PropDrill) => {
  const { backdrop_path, genre_ids, id, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count } =
    paginatedObj as Type_Tmdb_ApiCallMovieList_Obj;

  return (
    <li className='fdMedia__carousel__wrapper__ul__li' data-layout={isGridLayout ? 'grid' : 'carousel'} onPointerUp={() => useFetchTrailer(id)}>
      <article className='fdMedia__carousel__wrapper__ul__li__article'>
        <header className='fdMedia__carousel__wrapper__ul__li__article__header'>
          <h2>{title}</h2>
        </header>
        <div className='fdMedia__carousel__wrapper__ul__li__article__graphic'>
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${poster_path}`, alt: title })}
        </div>
      </article>
    </li>
  );
};
export default FDCarouselPoster;
