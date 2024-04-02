import { Dispatch, SetStateAction } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { Type_Tmdb_ApiCallTrailer_Obj, Type_Tmdb_useApiReturn_Obj } from '../../../api/types/TmdbDataTypes';
import { Options } from 'youtube-player/dist/types';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

type Type_PropDrill = {
  videoPlayerState: boolean;
  videoPlayerTrailer: Type_Tmdb_useApiReturn_Obj[];
  setVideoPlayerState: Dispatch<SetStateAction<boolean>>;
};

const FDiFrame = ({ videoPlayerState, videoPlayerTrailer, setVideoPlayerState }: Type_PropDrill) => {
  const trailerObj: Type_Tmdb_ApiCallTrailer_Obj | undefined =
    videoPlayerTrailer && videoPlayerTrailer.length > 0
      ? (videoPlayerTrailer[0]?.value as Type_Tmdb_ApiCallTrailer_Obj[])?.find((object) => object.site === 'YouTube' && object.type === 'Trailer')
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
  let player: YouTubeEvent;

  /** Close trailer hook */
  const useCloseTrailer = (): void => {
    player.target.pauseVideo();
    setVideoPlayerState(false);
  };

  /** Component */
  if (trailerObj)
    return (
      <section className='FDVideoPlayer__player' data-status={videoPlayerState}>
        <h2 className='FDVideoPlayer__player--h2'>{trailerObj.name}</h2>
        <YouTube
          videoId={trailerObj.key}
          opts={opts}
          className='FDVideoPlayer__player__wrapper'
          iframeClassName='FDVideoPlayer__player__wrapper--iframe'
          title={`YouTube video player: ${trailerObj.name}`}
          // loading={string}
          onReady={(event: YouTubeEvent) => (player = event)}
          onEnd={() => useCloseTrailer()}
          onError={() => {
            useCloseTrailer();
            player.target.destroy();
          }}
        />
      </section>
    );
};
export default FDiFrame;
