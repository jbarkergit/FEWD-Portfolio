// Deps
import { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube';
// Composables
import { Namespace_Tmdb, useTmdbFetcher } from '../../composables/tmdb-api/hooks/useTmdbFetcher';
// Features
import IFrameController from './iframe-controller/IFrameController';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

const FDiFrame = ({ heroData }: { heroData: Namespace_Tmdb.BaseMedia_Provider | undefined }) => {
  const [trailers, setTrailers] = useState<Namespace_Tmdb.Videos_Obj['videos']['results'] | undefined>(undefined);

  const fetchTrailer = async (): Promise<void> => {
    const data = (await useTmdbFetcher({ videos: heroData?.id })) as Namespace_Tmdb.Videos_Obj;
    const filteredEntries = data.videos.results.filter((obj) => obj.name.includes('Trailer'));
    setTrailers(filteredEntries);
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
            <img src={`https://image.tmdb.org/t/p/original/${heroData?.backdrop_path}`} alt={heroData?.title} />
          </picture>
          <figcaption>{heroData?.title}</figcaption>
        </figure>
      </section>
    );
  }
};
export default FDiFrame;
