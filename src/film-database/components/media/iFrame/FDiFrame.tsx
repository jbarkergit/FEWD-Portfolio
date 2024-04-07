import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';
import { Type_Tmdb_ApiCallTrailer_Obj, Type_Tmdb_ApiCall_Union } from '../../../api/types/TmdbDataTypes';
import { Options } from 'youtube-player/dist/types';
import { tmdbEndPoints } from '../../../api/data/tmdbEndPoints';
import { useTmdbApi } from '../../../api/hooks/useTmdbApi';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

type Type_PropDrill = {
  videoPlayerTrailer:
    | {
        key: string;
        label?: string | undefined;
        value: Type_Tmdb_ApiCall_Union[];
      }[]
    | undefined;
  setVideoPlayerTrailer: Dispatch<
    SetStateAction<
      | {
          key: string;
          label?: string | undefined;
          value: Type_Tmdb_ApiCall_Union[];
        }[]
      | undefined
    >
  >;
  trailerId: number;
};
const FDiFrame = ({ videoPlayerTrailer, setVideoPlayerTrailer, trailerId }: Type_PropDrill) => {
  /** Video Player State
   * This set of state variables enables the application to utilize a single YouTube iFrame component to produce trailer results for media.
   * This component makes use of the react-youtube API to handle iFrames.
   * videoPlayerTrailer stores API data and is used to find trailers directly from YouTube opposed to alternative sources.
   */

  const useVideoPlayer = async (): Promise<void> => {
    const controller: AbortController = new AbortController();

    const trailerObjData = await useTmdbApi({
      controller: controller,
      payload: { tmdbEndPointObj: tmdbEndPoints.movie_trailer_videos, trailer_id: { typeGuardKey: 'trailer_id', propValue: trailerId } },
    });

    if (trailerObjData) setVideoPlayerTrailer(trailerObjData);
  };

  useVideoPlayer();

  const trailerObj: Type_Tmdb_ApiCallTrailer_Obj | undefined =
    videoPlayerTrailer && videoPlayerTrailer.length > 0
      ? (videoPlayerTrailer[0]?.value as Type_Tmdb_ApiCallTrailer_Obj[])?.find((object) => object.site === 'YouTube' && object.type === 'Trailer')
      : undefined;

  // iframe options
  const opts: Options = {
    height: undefined,
    width: undefined,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      cc_lang_pref: 'eng',
      cc_load_policy: 1,
      // color: undefined,
      controls: 1,
      disablekb: 0,
      // enablejsapi?: 0 | 1 | undefined;
      // end?: number | undefined;
      fs: 1,
      hl: 'eng',
      iv_load_policy: 3,
      loop: 0,
      origin: 'http://localhost:5173/film-database',
      // playlist?: string | undefined;
      playsinline: 1,
      rel: 0,
      // start?: number | undefined;
      widget_referrer: undefined,
    },
  };

  /** YouTube Player Ref */
  let player: YouTubeEvent;

  /** Trailer hooks */
  const useCloseTrailer = (): void => {
    if (player) player.target.pauseVideo();
  };

  const usePauseTrailer = () => {
    if (player) player.target.pauseVideo();
  };

  /** Component */
  return (
    <section className='FDMediaGrid__wrapper__ul__li__article__trailer' onPointerLeave={() => usePauseTrailer()}>
      <h2 className='FDMediaGrid__wrapper__ul__li__article__trailer--h2'>{trailerObj?.name}</h2>
      <YouTube
        videoId={trailerObj?.key}
        opts={opts}
        className='FDMediaGrid__wrapper__ul__li__article__trailer__wrapper'
        iframeClassName='FDMediaGrid__wrapper__ul__li__article__trailer__wrapper--iframe'
        title={`YouTube video player: ${trailerObj?.name}`}
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
