import { Type_Tmdb_ApiCall_Union, Type_Tmdb_ApiCallMovieList_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';
import useCreatePicture from '../../hooks/useCreatePicture';

type Type_PropDrill = {
  mapValue: Type_Tmdb_ApiCall_Union;
  isGridLayout: boolean;
  useFetchTrailer: (index: number) => void;
};

const FDCarouselPoster = ({ mapValue, isGridLayout, useFetchTrailer }: Type_PropDrill) => {
  const value: Type_Tmdb_ApiCallMovieList_Obj = mapValue as unknown as Type_Tmdb_ApiCallMovieList_Obj;

  return (
    <li className='FDMediaGrid__wrapper__ul__li' data-status={isGridLayout ? 'grid' : 'carousel'} onPointerUp={() => useFetchTrailer(value.id)} key={value.id}>
      <article className='FDMediaGrid__wrapper__ul__li__article'>
        <div className='FDMediaGrid__wrapper__ul__li__article__graphic'>
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${value.poster_path}.svg`, alt: value.title as string })}
        </div>
      </article>
    </li>
  );
};
export default FDCarouselPoster;
