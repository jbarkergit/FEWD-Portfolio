import { useEffect, useState } from 'react';
import YouTube, { YouTubeEvent } from 'react-youtube';

import { Options } from 'youtube-player/dist/types';

import { tmdbMovieEndpoints, Type_Tmdb_Movie_Keys_Union } from '../../composables/tmdb-api/data/tmdbEndPoints';
import { Type_useFetchTmdbResponse_KeyValuePairArr, useFetchTmdbResponse } from '../../composables/tmdb-api/hooks/useFetchTmdbResponse';

/** This component utilizes YouTube Player API
 * https://developers.google.com/youtube/iframe_api_reference
 * via third party library https://github.com/tjallingt/react-youtube
 */

type Type_PropDrill = {
  props:
    | {
        heading: string;
        overview: string;
        vote_average: number;
        poster_path: string;
        backdrop_path: string | null;
        alt: string;
        id: number;
      }
    | undefined;
};

type Type_Tmdb_Trailer_ObjArr = {
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
}[];

const FDiFrame = ({ props }: Type_PropDrill) => {
  const [trailers, setTrailers] = useState<Type_Tmdb_Trailer_ObjArr | undefined>(undefined);

  const fetchTrailer = (): void => {
    (async () => {
      const endpoint: string | undefined = tmdbMovieEndpoints.searchById.get('trailers');
      if (!endpoint) return;
      const keyValuePair: [Type_Tmdb_Movie_Keys_Union, string] = ['trailers', endpoint];
      await useFetchTmdbResponse([keyValuePair], props?.id).then((response) => {
        if (response) {
          const objArr = response[0][1] as Type_Tmdb_Trailer_ObjArr;
          const filteredObjArr: Type_Tmdb_Trailer_ObjArr = objArr.filter((obj) => obj.site === 'YouTube' && obj.name === 'Official Trailer');
          setTrailers(filteredObjArr);
        }
      });
    })();
  };

  useEffect(() => fetchTrailer(), [props]);

  const getTrailer = (param_id: string) => {
    if (!trailers) return;
    return trailers.find((obj) => obj.id === param_id);
  };

  // iFrame options
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

  // Init trailer
  let player: YouTubeEvent;

  // Trailer hook
  const usePlayer = () => {
    const pause = () => player.target.pauseVideo();
    const close = () => player.target.pauseVideo();
    const destroy = () => player.target.destroy();
    return { pause, close, destroy };
  };

  /** Component */
  if (trailers)
    return (
      <section className='fdHero__article__visual__iFrame' onPointerLeave={() => usePlayer().pause()}>
        <h2 className='fdHero__article__visual__iFrame--h2'>{trailers[0].name}</h2>
        <YouTube
          videoId={`${trailers[0].key}`}
          opts={opts}
          className='fdHero__article__visual__iFrame__wrapper'
          iframeClassName='fdHero__iFrame__wrapper--iframe'
          title={`YouTube video player: ${trailers[0].name}`}
          // loading={string}
          onReady={(event: YouTubeEvent) => (player = event)}
          onEnd={() => usePlayer().close()}
          onError={() => {
            usePlayer().close();
            usePlayer().destroy();
          }}
        />
      </section>
    );
};
export default FDiFrame;
