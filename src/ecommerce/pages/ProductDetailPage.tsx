import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../components/navigation/header/Header';
import Footer from '../components/navigation/footer/eFooter';
import { ProductDatabase } from '../assets/production-data/ProductDatabase';
import { ProductType } from '../types/ProductType';
import ProductPageDetails from '../components/product/product-page/ProductPageDetails';
import ProductPageImgDisplay from '../components/product/product-page/ProductPageImgDisplay';
import ProductPageImgSelect from '../components/product/product-page/ProductPageImgSelect';
import MoreLikeThis from '../components/product/product-recommenders/MoreLikeThis';

const ProductDetailPage = (): JSX.Element => {
  const { paramId } = useParams() as { paramId: string };
  const findProduct = ProductDatabase.find((product: ProductType) => product.sku === paramId)!;
  const [activeDisplay, setActiveDisplay] = useState<number>(0);

  return (
    <>
      <Header />
      <div className="skuPage">
        <main className="skuPage__grid">
          <ProductPageImgDisplay findProduct={findProduct} activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
          <ProductPageDetails findProduct={findProduct} />
          {findProduct.images!.length > 1 ? <ProductPageImgSelect findProduct={findProduct} setActiveDisplay={setActiveDisplay} /> : null}
        </main>
        <div className="skuPage__recommendations">
          <MoreLikeThis findProduct={findProduct} />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductDetailPage;
