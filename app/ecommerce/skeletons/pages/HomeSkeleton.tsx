import HeaderSkeleton from '../components/HeaderSkeleton';

const HomeSkeleton = () => {
  return (
    <div className='skeleton'>
      <HeaderSkeleton />
      <div className='skeleton__infographic'>
        <div className='skeleton__infographic__section'>
          <div className='skeleton__infographic__section--textPrimary' />
          <div className='skeleton__infographic__section--card' />
        </div>
        <div className='skeleton__infographic__section'>
          <div className='skeleton__infographic__section--cardFocus' />
        </div>
        <div className='skeleton__infographic__section'>
          <div className='skeleton__infographic__section--text' />
          <div className='skeleton__infographic__section--card' />
        </div>
      </div>
    </div>
  );
};
export default HomeSkeleton;
