import { useFormatApiKey } from '../../../hooks/formatters/useFormatApiKey';

type Type_PropDrill = {
  mapKey: string;
};

const FDSectionHeader = ({ mapKey }: Type_PropDrill) => {
  return (
    <div className='FDMediaGrid__header'>
      <h2 className='FDMediaGrid__header--h2'>{useFormatApiKey(mapKey)}</h2>
    </div>
  );
};
export default FDSectionHeader;
