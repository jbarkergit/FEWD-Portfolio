import { useEffect, useRef, useState } from 'react';

import YouTube, { YouTubeEvent } from 'react-youtube';
import { Options } from 'youtube-player/dist/types';

import { tmdbMovieEndpoints, Type_Tmdb_Movie_Keys_Union } from '../../composables/tmdb-api/data/tmdbEndPoints';

import { Type_Tmdb_Api_Union } from '../../composables/tmdb-api/types/TmdbDataTypes';

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

const FDiFrame = ({ heroData }: Type_PropDrill) => {
  const [trailers, setTrailers] = useState<Type_Tmdb_Trailer_ObjArr | undefined>(undefined);
  const props = heroData ? useTmdbProps(heroData) : undefined;

  const fetchTrailer = (): void => {
    (async () => {
      const endpoint: string | undefined = tmdbMovieEndpoints.searchById.get('trailers');
      if (!endpoint) return;
      const keyValuePair: [Type_Tmdb_Movie_Keys_Union, string] = ['trailers', endpoint];
      await useFetchTmdbResponse([keyValuePair], props?.id).then((response) => {
        if (!response) return;
        const objArr = response[0][1] as Type_Tmdb_Trailer_ObjArr;
        const filteredObjArr: Type_Tmdb_Trailer_ObjArr = objArr.filter((obj) => obj.site === 'YouTube' && obj.name === 'Official Trailer');
        setTrailers(filteredObjArr);
      });
    })();
  };

  useEffect(() => {
    if (heroData) fetchTrailer();
  }, [heroData]);

  // iFrame options
  const opts: Options = {
    height: undefined,
    width: undefined,
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 0,
      cc_lang_pref: 'eng',
      cc_load_policy: 1,
      // color: undefined,
      controls: 0, // 0 = disabled
      disablekb: 1, // 1 = disabled
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

  // Init player
  const [player, setPlayer] = useState<YouTubeEvent | undefined>(undefined);

  /** Component */
  if (trailers && trailers.length > 0) {
    return (
      <section className='fdiFrame'>
        <h2 className='fdiFrame--h2'>{trailers[0].name}</h2>
        <IFrameController player={player} />
        <YouTube
          videoId={`${trailers[0].key}`}
          opts={opts}
          className='fdiFrame__wrapper'
          iframeClassName='fdiFrame__wrapper--iframe'
          title={`YouTube video player: ${trailers[0].name}`}
          style={undefined}
          loading={'lazy'}
          onReady={(event: YouTubeEvent) => setPlayer(event)}
          onEnd={() => {
            player?.target.destroy();
            setTrailers(undefined);
          }}
          onError={() => {
            player?.target.destroy();
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
