import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube';
import IFrameController from '../iframe-controller/IFrameController';
import { useRef, useState } from 'react';

const FDiFramePlayer = ({
  trailers,
  setTrailers,
}: {
  trailers: {
    id: string;
    iso_639_1: string;
    iso_3166_1: string;
    key: string;
    name: string;
    official: boolean;
    published_at: string;
    site: string;
    size: number;
    type: string;
  }[];
  setTrailers: React.Dispatch<
    React.SetStateAction<
      | {
          id: string;
          iso_639_1: string;
          iso_3166_1: string;
          key: string;
          name: string;
          official: boolean;
          published_at: string;
          site: string;
          size: number;
          type: string;
        }[]
      | undefined
    >
  >;
}) => {
  // Init player
  const playerRef = useRef<YouTube | null>(null);

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

  // Player destruction
  const destroyPlayer = (target: YouTubePlayer) => {
    target.destroy();
    setTrailers(undefined);
  };

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
};

export default FDiFramePlayer;
