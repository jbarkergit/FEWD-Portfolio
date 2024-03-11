import { Dispatch, SetStateAction } from 'react';
import YouTube from 'react-youtube';
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
  const trailerObj: Type_Tmdb_Trailer_Obj | undefined =
    videoPlayerVideos && videoPlayerVideos.length > 0
      ? (videoPlayerVideos[0]?.value as Type_Tmdb_Trailer_Obj[])?.find((object) => object.site === 'YouTube' && object.type === 'Trailer')
      : undefined;

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

  if (trailerObj?.key)
    return (
      <section className='fdVideoPlayer' data-status={videoPlayerState}>
        <h2 className='fdVideoPlayer--h2'>{trailerObj.name}</h2>
        <YouTube
          videoId={trailerObj.key}
          className='fdVideoPlayer__wrapper'
          iframeClassName='fdVideoPlayer__wrapper--iframe'
          title={`YouTube video player: ${trailerObj.name}`}
          // loading={string}
          opts={opts}
          onPause={() => setVideoPlayerState(false)}
          onEnd={() => setVideoPlayerState(false)}
          onError={() => setVideoPlayerState(false)}
        />
      </section>
    );
};
export default FDVideoPlayer;
