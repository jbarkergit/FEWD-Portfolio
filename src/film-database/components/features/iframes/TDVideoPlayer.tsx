import { Dispatch, SetStateAction, useEffect } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { Type_Tmdb_Parent_StateObjArr, Type_Tmdb_Trailer_Obj } from '../../../api/types/TmdbDataTypes';
import { Options } from 'youtube-player/dist/types';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

type Type_PropDrill = {
  videoPlayerState: boolean;
  videoPlayerVideos: Type_Tmdb_Parent_StateObjArr;
  setVideoPlayerState: Dispatch<SetStateAction<boolean>>;
};

const FDVideoPlayer = ({ videoPlayerState, videoPlayerVideos, setVideoPlayerState }: Type_PropDrill) => {
  // Trailer object
  const trailerObj: Type_Tmdb_Trailer_Obj | undefined =
    videoPlayerVideos && videoPlayerVideos.length > 0
      ? (videoPlayerVideos[0]?.value as Type_Tmdb_Trailer_Obj[])?.find((object) => object.site === 'YouTube' && object.type === 'Trailer')
      : undefined;

  // iframe options
  const opts: Options = {
    height: undefined,
    width: undefined,
    playerVars: {
      origin: 'http://localhost:5173/film-database',
      hl: 'eng',
      cc_lang_pref: 'eng',
      cc_load_policy: 1,
      iv_load_policy: 3,
      autoplay: 1,
      rel: 0,
      playsinline: 0,
    },
  };

  /** YouTube Player Ref */
  let player: YouTubeEvent | null = null;

  /** Close trailer hook */
  const useCloseTrailer = (): void => {
    setVideoPlayerState(false);
    if (player) player.target.pauseVideo();
  };

  /** Exterior click handler */
  useEffect(() => {
    const exteriorClickHandler = (e: PointerEvent): void => {
      if ((e.target as HTMLElement).className !== 'fdVideoPlayer__wrapper--iframe') useCloseTrailer();
    };

    document.body.addEventListener('pointerup', exteriorClickHandler);
    return () => document.body.removeEventListener('pointerup', exteriorClickHandler);
  }, []);

  /** Component */
  if (trailerObj?.key)
    return (
      <section className='fdVideoPlayer' data-status={videoPlayerState}>
        <h2 className='fdVideoPlayer--h2'>{trailerObj.name}</h2>
        <YouTube
          videoId={trailerObj.key}
          opts={opts}
          className='fdVideoPlayer__wrapper'
          iframeClassName='fdVideoPlayer__wrapper--iframe'
          title={`YouTube video player: ${trailerObj.name}`}
          // loading={string}
          onReady={(event: YouTubeEvent) => (player = event)}
          onEnd={() => useCloseTrailer}
          onError={() => {
            useCloseTrailer;
            player?.target.destroy;
          }}
        />
      </section>
    );
};
export default FDVideoPlayer;
