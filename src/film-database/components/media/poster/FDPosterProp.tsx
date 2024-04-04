import { useState } from 'react';
import { Link } from 'react-router-dom';
// Assets
import { BootstrapThreeDotsVertical } from '../../../assets/svg-icons/BootstrapThreeDotsVertical';
// Component Hooks
import useCreatePicture from '../../../hooks/component-creation/useCreatePicture';
import { useFormatDate } from '../../../hooks/formatters/useFormatDate';
// API End Points
import { tmdbEndPoints } from '../../../api/data/tmdbEndPoints';
// API Hooks
import { useTmdbApi } from '../../../api/hooks/useTmdbApi';
// API Types
import { Type_Tmdb_ApiCall_Union, Type_Tmdb_ApiCallMovieList_Obj } from '../../../api/types/TmdbDataTypes';

type Type_PropDrill = {
  mapValue: Type_Tmdb_ApiCall_Union;
  grid: boolean;
};

const FDPosterProp = ({ mapValue, grid }: Type_PropDrill) => {
  /** Video Player State
   * This set of state variables enables the application to utilize a single YouTube iFrame component to produce trailer results for media.
   * This component makes use of the react-youtube API to handle iFrames.
   * videoPlayerState handles the component visibility
   * videoPlayerTrailer stores API data and is used to find trailers directly from YouTube opposed to alternative sources.
   */
  const [videoPlayerState, setVideoPlayerState] = useState<boolean>(true);
  const [videoPlayerTrailer, setVideoPlayerTrailer] = useState<{ key: string; label?: string | undefined; value: Type_Tmdb_ApiCall_Union[] }[]>();

  const useVideoPlayer = async (propId: number): Promise<void> => {
    const controller: AbortController = new AbortController();

    const trailerObjData = await useTmdbApi({
      controller: controller,
      payload: { tmdbEndPointObj: tmdbEndPoints.movie_trailer_videos, trailer_id: { typeGuardKey: 'trailer_id', propValue: propId } },
    });

    if (trailerObjData) {
      setVideoPlayerTrailer(trailerObjData);
      setVideoPlayerState(true);
    }
  };

  const value: Type_Tmdb_ApiCallMovieList_Obj = mapValue as unknown as Type_Tmdb_ApiCallMovieList_Obj;
  return (
    <li className='FDMediaGrid__wrapper__ul__li' data-status={grid ? 'grid' : 'carousel'} key={value.id}>
      <article className='FDMediaGrid__wrapper__ul__li__article'>
        <div className='FDMediaGrid__wrapper__ul__li__article__graphic'>
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${value.poster_path}.svg`, alt: value.title as string })}

          <div className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay'>
            {/* <button
              className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay--play'
              aria-label='Play Trailer'
              onClick={() => useVideoPlayer(`${value.id}`)}>
              {useCreatePicture({ svg: <MaterialPlayCircle />, alt: 'Play Trailer' })}
            </button> */}
            <button className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay--moreInfo' aria-label='More Information'>
              {useCreatePicture({ svg: <BootstrapThreeDotsVertical />, alt: 'More Information' })}
            </button>
          </div>
        </div>

        {/* <hgroup className='FDMediaGrid__wrapper__ul__li__article__hgroup'>
          <Link to='' aria-label={value.title}>
            <h2 className='FDMediaGrid__wrapper__ul__li__article__hgroup--h2'>{value.title}</h2>
          </Link>
          <Link to='' aria-label={value.title}>
            <h3 className='FDMediaGrid__wrapper__ul__li__article__hgroup--h3'>{useFormatDate(value.release_date)}</h3>
          </Link>
        </hgroup> */}
      </article>
    </li>
  );
};
export default FDPosterProp;
