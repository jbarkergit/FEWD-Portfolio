import { Dispatch, SetStateAction } from 'react';
// API Types
import { Type_Tmdb_ApiCall_Union } from '../../api/types/TmdbDataTypes';
// Components
import FDVideoPlayerPanel from './panel/FDVideoPlayerPanel';
import FDiFrame from './iframe/FDiFrame';

type Type_PropDrill = {
  videoPlayerState: boolean;
  setVideoPlayerState: Dispatch<SetStateAction<boolean>>;
  videoPlayerTrailer:
    | {
        title: string;
        backdrop: string;
        overview: string;
        trailerObjData: {
          key: string;
          label?: string | undefined;
          value: Type_Tmdb_ApiCall_Union[];
        }[];
      }
    | undefined;
};

const FDVideoPlayer = ({ videoPlayerState, setVideoPlayerState, videoPlayerTrailer }: Type_PropDrill) => {
  if (videoPlayerTrailer)
    return (
      <section className='FDVideoPlayer'>
        <FDVideoPlayerPanel title={videoPlayerTrailer.title} overview={videoPlayerTrailer.overview} />
        <FDiFrame videoPlayerState={videoPlayerState} setVideoPlayerState={setVideoPlayerState} videoPlayerTrailer={videoPlayerTrailer.trailerObjData} />
      </section>
    );
};
export default FDVideoPlayer;
