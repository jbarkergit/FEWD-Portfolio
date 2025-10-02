import { useRef, useState } from 'react';
import YouTube from 'react-youtube';
import type { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube';
import IFrameController from '../iframe-controller/IFrameController';
import type { TmdbResponseFlat } from '~/film-database/composables/types/TmdbResponse';
import { useUserCollectionContext } from '~/film-database/context/UserCollectionContext';
import { useModalTrailerContext } from '~/film-database/context/ModalTrailerContext';
import { useModalContext } from '~/film-database/context/ModalContext';

type iFramePlayState = 'unstarted' | 'ended' | 'playing' | 'paused' | 'buffering';
export type PlayerPlayState = iFramePlayState | 'cued' | undefined;

const playStates: Record<number, iFramePlayState> = {
  [-1]: 'unstarted',
  0: 'ended',
  1: 'playing',
  2: 'paused',
  3: 'buffering',
} as const;

const FDiFramePlayer = ({
  trailers,
  setTrailers,
  type,
}: {
  trailers: TmdbResponseFlat['videos']['results'];
  setTrailers: React.Dispatch<React.SetStateAction<TmdbResponseFlat['videos']['results'] | undefined>>;
  type: 'modal' | 'hero';
}) => {
  // Context
  const { modal } = useModalContext();
  const { userCollections } = useUserCollectionContext();
  const { modalTrailer, setModalTrailer } = useModalTrailerContext();

  // iFrame options
  const opts: YouTubeProps['opts'] = {
    height: undefined,
    width: undefined,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: type === 'hero' ? 1 : 0,
      cc_lang_pref: 'eng',
      cc_load_policy: 1,
      // color: undefined,
      controls: type === 'hero' ? 0 : 1, // 0 = disabled
      disablekb: 0, // 1 = disabled
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
      // @ts-ignore
      mute: type === 'hero' ? 1 : 0, // Required for autoplay, is not defined by react-youtube lib
    },
  };

  // Init player
  const playerRef = useRef<YouTube | null>(null);

  // Player destruction
  const destroyPlayer = (target: YouTubePlayer) => {
    const destroy = (): void => {
      target.destroy();
      setTrailers(undefined);
    };

    if (!modal) {
      destroy();
      return;
    }

    const queueCollection = userCollections['user-collection-0'];

    if (!queueCollection?.data) {
      destroy();
      return;
    }

    const queueData = queueCollection.data;
    const endedTrailerId = queueData.findIndex((prop) => prop.id === modalTrailer?.id);
    const nextTrailer = queueData[endedTrailerId + 1];

    if (!nextTrailer) {
      destroy();
      return;
    }

    setModalTrailer(nextTrailer);
  };

  // This component cannot be stateless due to the conditional rendering of IFrameController. This state exists solely to force a rerender on player ready.
  const [playState, setPlayState] = useState<PlayerPlayState>(undefined);

  return (
    <>
      {playerRef.current && playerRef.current.internalPlayer ? (
        <IFrameController
          player={playerRef.current.internalPlayer}
          playState={playState}
        />
      ) : null}
      <YouTube
        ref={playerRef}
        videoId={`${trailers[0]?.key}`}
        opts={opts}
        className='fdiFrame__player'
        iframeClassName='fdiFrame__player__iframe'
        title={`YouTube video player: ${trailers[0]?.name}`}
        style={undefined}
        loading={'eager'}
        onStateChange={(event: YouTubeEvent<number>) =>
          setPlayState(playStates[event.data as keyof typeof playStates] ?? 'cued')
        }
        // onPlaybackQualityChange={(event: YouTubeEvent<string>) => onPlaybackQualityChange(event.data)}
        onEnd={(event: YouTubeEvent) => destroyPlayer(event.target)}
        onError={(event: YouTubeEvent) => destroyPlayer(event.target)}
      />
    </>
  );
};

export default FDiFramePlayer;
