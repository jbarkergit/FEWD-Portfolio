import { useEffect } from 'react';
import { Type_Tmdb_Parent_StateObjArr, Type_Tmdb_Trailer_Obj } from '../../../api/types/TmdbDataTypes';

type Type_PropDrill = {
  videoPlayerState: boolean;
  videoPlayerVideos: Type_Tmdb_Parent_StateObjArr;
};

const FDVideoPlayer = ({ videoPlayerState, videoPlayerVideos }: Type_PropDrill) => {
  const trailerKey: string | undefined =
    videoPlayerVideos && videoPlayerVideos.length > 0
      ? (videoPlayerVideos[0]?.value as Type_Tmdb_Trailer_Obj[])?.find((object) => object.site === 'YouTube' && object.type === 'Trailer')?.key
      : undefined;

  useEffect(() => {
    console.log(videoPlayerVideos);
  }, [videoPlayerVideos]);

  if (trailerKey)
    return (
      <section className='fdVideoPlayer' data-status={videoPlayerState}>
        <iframe
          className='fdVideoPlayer--iframe'
          src={`https://www.youtube.com/embed/${trailerKey}`}
          title='YouTube video player'
          allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
          allowFullScreen
        />
      </section>
    );
};
export default FDVideoPlayer;
