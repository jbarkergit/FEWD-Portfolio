const HeaderSkeleton = () => {
  return (
    <div className='skeleton__header'>
      <div className='skeleton--gridColumn --flexStart'>
        <div className='skeleton--logo' />
      </div>
      <div className='skeleton--gridColumn --flexCenter'>
        <div className='skeleton--link' />
        <div className='skeleton--link' />
        <div className='skeleton--link' />
        <div className='skeleton--link' />
        <div className='skeleton--link' />
      </div>
      <div className='skeleton--gridColumn --flexEnd'>
        <div className='skeleton--button' />
        <div className='skeleton--button' />
        <div className='skeleton--button' />
      </div>
    </div>
  );
};
export default HeaderSkeleton;
