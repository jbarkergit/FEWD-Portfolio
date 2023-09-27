import HeaderSkeleton from '../components/HeaderSkeleton';

const HomeSkeleton = () => {
  return (
    <div className='skeleton'>
      <HeaderSkeleton />
      <div className='skeleton__infographic'>
        <div className='skeleton--subHeading' />
        <div className='skeleton--heading' />
        <div className='skeleton--text' />
        <div className='skeleton__genericFlex'>
          <div className='skeleton--button' />
          <div className='skeleton--button' />
        </div>
        <div className='skeleton__infographic__carousel'>
          <div className='skeleton__infographic__carousel--partner' />
          <div className='skeleton__infographic__carousel--partner' />
          <div className='skeleton__infographic__carousel--partner' />
          <div className='skeleton__infographic__carousel--partner' />
          <div className='skeleton__infographic__carousel--partner' />
          <div className='skeleton__infographic__carousel--partner' />
        </div>
      </div>
    </div>
  );
};
export default HomeSkeleton;
