import { useEffect, useRef, useState } from 'react';

import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube';

import { Type_Tmdb_Api_Union, Type_Tmdb_ApiMovieList_Obj } from '../../composables/tmdb-api/types/TmdbDataTypes';

import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';

import IFrameController from './iframe-controller/IFrameController';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

type Type_PropDrill = {
  heroData: Type_Tmdb_Api_Union | null;
};

type Type_Tmdb_Trailer_Obj = {
  id: string;
  iso_3166_1: string;
  iso_639_1: string;
  key: string;
  name: string;
  official: boolean;
  published_at: string;
  site: string;
  size: number;
  type: string;
};

const FDiFrame = ({ heroData }: Type_PropDrill) => {
  const [trailers, setTrailers] = useState<Type_Tmdb_Trailer_Obj[] | undefined>(undefined);
  const props = heroData as Type_Tmdb_ApiMovieList_Obj;

  const fetchTrailer = (): void => {
    (async () => {
      await useFetchTmdbResponse([useTmdbUrlBuilder('videos', [{ movie_id: props?.id }])]).then((response) => {
        if (!response) return;

        const entries = response.flatMap((result) => result.endpoint) as Type_Tmdb_Trailer_Obj[];
        const filteredEntries = entries.filter((obj) => obj.name.includes('Trailer'));

        setTrailers(filteredEntries);
      });
    })();
  };

  useEffect(() => {
    if (heroData) fetchTrailer();
  }, [heroData]);

  // iFrame options
  const opts: YouTubeProps['opts'] = {
    height: undefined,
    width: undefined,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
      cc_lang_pref: 'eng',
      cc_load_policy: 1,
      // color: undefined,
      controls: 0, // 0 = disabled
      disablekb: 1, // 1 = disabled
      // enablejsapi?: 0 | 1 | undefined;
      // end?: number | undefined;
      fs: 0, // 0 = disabled
      hl: 'eng',
      iv_load_policy: 3,
      loop: 0,
      // origin: '',
      // playlist?: string | undefined;
      playsinline: 1,
      rel: 0,
      // start?: number | undefined;
      widget_referrer: undefined,
      // Required for autoplay, is not defined by react-youtube lib
      // @ts-ignore
      mute: 1,
    },
  };

  // Init player
  const playerRef = useRef<YouTube | null>(null);

  // Global player states
  const [playState, setPlayState] = useState<'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering' | 'cued' | undefined>(undefined);
  // const [qualityState, setQualityState] = useState<{ resolution: string; definition: string | undefined }[] | undefined>(undefined);

  // playState
  const onStateChange = (playState: number) => {
    switch (playState) {
      case -1:
        setPlayState('unstarted');
        break;

      case 0:
        setPlayState('ended');
        break;

      case 1:
        setPlayState('playing');
        break;

      case 2:
        setPlayState('paused');
        break;

      case 3:
        setPlayState('buffering');
        break;

      case 5:
        setPlayState('cued');
        break;

      default:
        setPlayState('cued');
        break;
    }
  };

  // qualityState (depreciated)
  // const onPlaybackQualityChange = (qualityState: string) => {
  //   switch (qualityState) {
  //     case 'tiny':
  //       setQualityState((prevState) => [...prevState, { resolution: '144p', definition: undefined }]);
  //       break;

  //     case 'small':
  //       setQualityState((prevState) => [...prevState, { resolution: '240p', definition: undefined }]);
  //       break;

  //     case 'medium':
  //       setQualityState((prevState) => [...prevState, { resolution: '360p', definition: undefined }]);
  //       break;

  //     case 'large':
  //       setQualityState((prevState) => [...prevState, { resolution: '480p', definition: undefined }]);
  //       break;

  //     case 'hd720':
  //       setQualityState((prevState) => [...prevState, { resolution: '720p', definition: 'HD' }]);
  //       break;

  //     case 'hd1080':
  //       setQualityState((prevState) => [...prevState, { resolution: '1080p', definition: 'FHD' }]);
  //       break;

  //     case 'hd1440':
  //       setQualityState((prevState) => [...prevState, { resolution: '1440p', definition: 'QHD' }]);
  //       break;

  //     case 'hd2160':
  //       setQualityState((prevState) => [...prevState, { resolution: '2160p', definition: 'UHD' }]);
  //       break;

  //     default:
  //       setQualityState((prevState) => [...prevState, { resolution: qualityState, definition: undefined }]);
  //       break;
  //   }
  // };

  // Player destruction
  const destroyPlayer = (target: YouTubePlayer) => {
    target.destroy();
    setTrailers(undefined);
  };

  /** Component */
  if (trailers && trailers.length > 0) {
    return (
      <section className='fdiFrame'>
        <h2 className='fdiFrame--h2'>{trailers[0].name}</h2>
        {playerRef.current && playerRef.current.internalPlayer ? <IFrameController player={playerRef.current.internalPlayer} playState={playState} /> : null}
        <YouTube
          ref={playerRef}
          videoId={`${trailers[0].key}`}
          opts={opts}
          className='fdiFrame__player'
          iframeClassName='fdiFrame__player--iframe'
          title={`YouTube video player: ${trailers[0].name}`}
          style={undefined}
          loading={'eager'}
          onStateChange={(event: YouTubeEvent<number>) => onStateChange(event.data)}
          // onPlaybackQualityChange={(event: YouTubeEvent<string>) => onPlaybackQualityChange(event.data)}
          onEnd={(event: YouTubeEvent) => destroyPlayer(event.target)}
          onError={(event: YouTubeEvent) => destroyPlayer(event.target)}
        />
      </section>
    );
  } else {
    return (
      <section className='fdiFrame'>
        <figure className='fdiFrame__backdrop'>
          <picture>
            <img src={`https://image.tmdb.org/t/p/original/${props?.backdrop_path}`} alt={props?.title} />
          </picture>
          <figcaption>{props?.title}</figcaption>
        </figure>
      </section>
    );
  }
};
export default FDiFrame;
