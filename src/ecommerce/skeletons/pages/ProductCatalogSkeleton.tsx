import EHeaderSkeleton from '../components/HeaderSkeleton';

const ProductCatalogSkeleton = () => {
  return (
    <div className='skeleton'>
      <EHeaderSkeleton />
      <div className='skeleton__catalog --flexEnd'>
        <div className='skeleton__catalog__filters'>
          <div className='skeleton__genericFlex --flexStart'>
            <div className='skeleton--button' />
          </div>
          <div className='skeleton__genericFlex --flexEnd'>
            <div className='skeleton--button' />
            <div className='skeleton--button' />
          </div>
        </div>
        <ul className='skeleton__catalog__grid'>
          <li className='skeleton__catalog__grid--li' />
          <li className='skeleton__catalog__grid--li' />
          <li className='skeleton__catalog__grid--li' />
          <li className='skeleton__catalog__grid--li' />
          <li className='skeleton__catalog__grid--li' />
          <li className='skeleton__catalog__grid--li' />
        </ul>
      </div>
    </div>
  );
};
export default ProductCatalogSkeleton;
