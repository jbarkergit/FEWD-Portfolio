// React
import { useState } from 'react';
import { useParams } from 'react-router-dom';

// Context
import { CartProvider } from '../context/CartContext';

// Components
import Header from '../components/navigation/header/EcoHeader';
import EFooter from '../components/navigation/footer/eFooter';
import { useProductDatabase } from '../hooks/useProductDatabase';
import { ProductType } from '../types/ProductType';
import ProductPageDetails from '../components/product/product-page/ProductPageDetails';
import ProductPageImgDisplay from '../components/product/product-page/ProductPageImgDisplay';
import ProductPageImgSelect from '../components/product/product-page/ProductPageImgSelect';
import MoreLikeThis from '../components/product/product-recommenders/MoreLikeThis';

const ProductDetailPage = (): JSX.Element => {
  const { paramId } = useParams() as { paramId: string };
  const findProduct = useProductDatabase.find((product: ProductType) => product.sku === paramId)!;
  const [activeDisplay, setActiveDisplay] = useState<number>(0);

  return (
    <CartProvider>
      <div id='ecommerce'>
        <Header />
        <div className='skuPage'>
          <main className='skuPage__grid'>
            {findProduct.images!.small.length > 1 ? <ProductPageImgSelect findProduct={findProduct} setActiveDisplay={setActiveDisplay} /> : null}
            <ProductPageImgDisplay findProduct={findProduct} activeDisplay={activeDisplay} setActiveDisplay={setActiveDisplay} />
            <ProductPageDetails findProduct={findProduct} />
          </main>
          <MoreLikeThis findProduct={findProduct} />
        </div>
        <EFooter />
      </div>
    </CartProvider>
  );
};

export default ProductDetailPage;
