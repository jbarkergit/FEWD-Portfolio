import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
// React
import { Link } from 'react-router-dom';
// Assets
import { MaterialPlayCircle } from '../../../assets/svg-icons/MaterialPlayCircle';
import { BootstrapThreeDotsVertical } from '../../../assets/svg-icons/PhDotsThreeVerticalBold';
// Hooks
import useCreatePicture from '../../../hooks/useCreatePicture';
import { useFormatDate } from '../../../hooks/useFormatDate';
// Types
import { Type_Tmdb_ApiCallUnion_Obj } from '../../../api/types/TmdbDataTypes';

type Type_PropDrill = {
  mapValue: Type_Tmdb_ApiCallUnion_Obj;
  useVideoPlayer: (propertyId: string) => Promise<void>;
  setPosterDimensions: Dispatch<
    SetStateAction<{
      width: number | undefined;
      height: number | undefined;
    }>
  >;
};

const FDPosterProp = ({ mapValue, useVideoPlayer, setPosterDimensions }: Type_PropDrill) => {
  /** Update navigation overlay button height dynamically */
  const posterOverlay = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosterDimensions = () => {
      const posterOverlayRect: DOMRect | undefined = posterOverlay.current?.getBoundingClientRect();
      setPosterDimensions({ width: posterOverlayRect?.width, height: posterOverlayRect?.height });
    };

    // Initial height
    updatePosterDimensions();

    window.addEventListener('resize', updatePosterDimensions);
    return () => window.removeEventListener('resize', updatePosterDimensions);
  }, []);

  return (
    <li className='FDMediaGrid__wrapper__ul__li' key={mapValue.id}>
      <article className='FDMediaGrid__wrapper__ul__li__article'>
        <div className='FDMediaGrid__wrapper__ul__li__article__graphic' onClick={() => useVideoPlayer(`${mapValue.id}`)}>
          {useCreatePicture({ src: `https://image.tmdb.org/t/p/original/${mapValue.poster_path}.svg`, alt: mapValue.title as string })}

          <div className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay' ref={posterOverlay}>
            <button
              className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay--play'
              aria-label='Play Trailer'
              onClick={() => useVideoPlayer(`${mapValue.id}`)}>
              {useCreatePicture({ svg: <MaterialPlayCircle />, alt: 'Play Trailer' })}
            </button>
            <button className='FDMediaGrid__wrapper__ul__li__article__graphic__overlay--moreInfo' aria-label='More Information'>
              {useCreatePicture({ svg: <BootstrapThreeDotsVertical />, alt: 'More Information' })}
            </button>
          </div>
        </div>

        <hgroup className='FDMediaGrid__wrapper__ul__li__article__hgroup'>
          <Link to='' aria-label={mapValue.title}>
            <h2 className='FDMediaGrid__wrapper__ul__li__article__hgroup--h2'>{mapValue.title}</h2>
          </Link>
          <Link to='' aria-label={mapValue.title}>
            <h3 className='FDMediaGrid__wrapper__ul__li__article__hgroup--h3'>{useFormatDate(mapValue.release_date)}</h3>
          </Link>
        </hgroup>
      </article>
    </li>
  );
};
export default FDPosterProp;
