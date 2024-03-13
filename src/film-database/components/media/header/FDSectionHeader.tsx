import { useFormatApiKey } from '../../../hooks/useFormatApiKey';

type Type_PropDrill = {
  mapKey: string;
};

const FDSectionHeader = ({ mapKey }: Type_PropDrill) => {
  return (
    <div className='fdFlatGrid__header'>
      <h2 className='fdFlatGrid__header--h2'>{useFormatApiKey(mapKey)}</h2>
    </div>
  );
};
export default FDSectionHeader;
