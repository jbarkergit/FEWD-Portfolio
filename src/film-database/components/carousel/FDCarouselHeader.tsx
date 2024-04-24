type Type_PropDrill = {
  dataLabel: string | undefined;
  dataKey: string;
};

const FDCarouselHeader = ({ dataLabel, dataKey }: Type_PropDrill) => {
  return (
    <div className='FDMediaGrid__header'>
      <h2 className='FDMediaGrid__header--h2'>{dataLabel ? dataLabel : dataKey.replace('_', ' ')}</h2>
    </div>
  );
};
export default FDCarouselHeader;
