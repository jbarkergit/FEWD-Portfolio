import { YouTubeEvent } from 'react-youtube';
import { Type_useFilmDatabaseWebStorage_Obj } from '../../composables/web-storage-api/useFilmDatabaseWebStorage';
import { Options } from 'youtube-player/dist/types';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

type Type_PropDrill = {
  trailerCache: Type_useFilmDatabaseWebStorage_Obj[] | undefined;
  mappedTrailerId: number;
};

const FDiFrame = ({ trailerCache, mappedTrailerId }: Type_PropDrill) => {
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

  /** Trailer hooks */
  let player: YouTubeEvent;

  const usePlayer = () => {
    const pause = () => player.target.pauseVideo();
    const close = () => player.target.pauseVideo();
    const destroy = () => player.target.destroy();
    return { pause, close, destroy };
  };

  /** Parameter Variables */
  const trailer = trailerCache?.find((obj) => obj.trailer_id === mappedTrailerId);

  /** Component */
  return (
    <section className='FDMediaGrid__wrapper__ul__li__article__trailer' onPointerLeave={() => usePlayer().pause()}>
      <h2 className='FDMediaGrid__wrapper__ul__li__article__trailer--h2'>{trailer?.trailer?.name}</h2>
      {/* <YouTube
        videoId={`${trailer?.trailer_id}`}
        opts={opts}
        className='FDMediaGrid__wrapper__ul__li__article__trailer__wrapper'
        iframeClassName='FDMediaGrid__wrapper__ul__li__article__trailer__wrapper--iframe'
        title={`YouTube video player: ${trailer?.trailer?.name}`}
        // loading={string}
        onReady={(event: YouTubeEvent) => (player = event)}
        onEnd={() => usePlayer().close()}
        onError={() => {
          usePlayer().close();
          usePlayer().destroy();
        }}
      /> */}
    </section>
  );
};
export default FDiFrame;
