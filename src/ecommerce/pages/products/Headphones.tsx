import Header from '../../layouts/navigation/Header';
import Footer from '../../layouts/navigation/Footer';
import HeadphoneGrid from '../../layouts/products/HeadphoneGrid';

const EcomProducts = () => {
  return (
    <>
      <Header />
      <section className="flexBox justifyCenter alignUnset">
        <HeadphoneGrid />
      </section>
      <Footer />
    </>
  );
};
export default EcomProducts;
