import { Dispatch, SetStateAction } from 'react';
// API Types
import { Type_Tmdb_ApiCall_Union } from '../../api/types/TmdbDataTypes';
// Components
import FDVideoPlayerPanel from './panel/FDVideoPlayerPanel';
import FDiFrame from './iframe/FDiFrame';

type Type_PropDrill = {
  videoPlayerState: boolean;
  setVideoPlayerState: Dispatch<SetStateAction<boolean>>;
  videoPlayerTrailer: {
    key: string;
    label?: string | undefined;
    value: Type_Tmdb_ApiCall_Union[];
  }[];
};

const FDVideoPlayer = ({ videoPlayerState, setVideoPlayerState, videoPlayerTrailer }: Type_PropDrill) => {
  return (
    <section className='FDVideoPlayer'>
      <FDVideoPlayerPanel />
      <FDiFrame videoPlayerState={videoPlayerState} setVideoPlayerState={setVideoPlayerState} videoPlayerTrailer={videoPlayerTrailer} />
    </section>
  );
};
export default FDVideoPlayer;
