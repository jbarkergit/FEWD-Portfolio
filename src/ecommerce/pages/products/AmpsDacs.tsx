import Header from '../../layouts/navigation/Header';
import Footer from '../../layouts/navigation/Footer';
import AmpsDacsGrid from '../../layouts/products/AmpsDacsGrid';

const EcomProducts = () => {
  return (
    <>
      <Header />
      <section className="flexBox justifyCenter alignUnset">
        <AmpsDacsGrid />
      </section>
      <Footer />
    </>
  );
};
export default EcomProducts;
