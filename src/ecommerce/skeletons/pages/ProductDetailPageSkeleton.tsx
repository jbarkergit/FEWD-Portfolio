import EHeaderSkeleton from '../components/HeaderSkeleton';

const ProductDetailPageSkeleton = () => {
  return (
    <div className='skeleton'>
      <EHeaderSkeleton />
      <div className='skeleton__detailPage'>
        <div className='skeleton__detailPage__card' />
      </div>
    </div>
  );
};
export default ProductDetailPageSkeleton;
