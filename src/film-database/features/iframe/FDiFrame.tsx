import { useEffect, useState } from 'react';

import YouTube, { YouTubeEvent, YouTubePlayer, YouTubeProps } from 'react-youtube';
import PlayerStates from 'youtube-player/dist/constants/PlayerStates';

import { tmdbMovieEndpoints } from '../../composables/tmdb-api/data/tmdbEndPoints';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

import { useTmdbUrlBuilder } from '../../composables/tmdb-api/hooks/useTmdbUrlBuilder';
import { useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';
import { useTmdbProps } from '../../composables/tmdb-api/hooks/useTmdbProps';

import IFrameController from '../../components/iframe-controller/IFrameController';

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
  const props = heroData ? useTmdbProps(heroData) : undefined;

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
  const [player, setPlayer] = useState<YouTubePlayer | undefined>(undefined);
  const [playerStates, setPlayerStates] = useState<PlayerStates | undefined>(undefined);
  const [playerVolume, setPlayerVolume] = useState<number>(0);

  /** Component */
  if (trailers && trailers.length > 0) {
    return (
      <section className='fdiFrame'>
        <h2 className='fdiFrame--h2'>{trailers[0].name}</h2>
        <IFrameController player={player} playerStates={playerStates} playerVolume={playerVolume} setPlayerVolume={setPlayerVolume} />
        <YouTube
          videoId={`${trailers[0].key}`}
          opts={opts}
          className='fdiFrame__player'
          iframeClassName='fdiFrame__player--iframe'
          title={`YouTube video player: ${trailers[0].name}`}
          style={undefined}
          loading={'eager'}
          onReady={(event: YouTubeEvent) => setPlayer(event.target)}
          onStateChange={async (event: YouTubeEvent) => {
            const playerStates = await event.target.getPlayerState();
            setPlayerStates(playerStates);
          }}
          onPlay={() => {
            player?.setVolume(playerVolume);
            player?.unMute();
          }}
          onEnd={(event: YouTubeEvent) => {
            event.target.destroy();
            setTrailers(undefined);
          }}
          onError={(event: YouTubeEvent) => {
            event.target.destroy();
            setTrailers(undefined);
          }}
        />
      </section>
    );
  } else {
    return (
      <section className='fdiFrame'>
        <figure className='fdiFrame__backdrop'>
          <picture>
            <img src={`https://image.tmdb.org/t/p/original/${props?.backdrop_path}`} alt={props?.heading} />
          </picture>
          <figcaption>{props?.heading}</figcaption>
        </figure>
      </section>
    );
  }
};
export default FDiFrame;
