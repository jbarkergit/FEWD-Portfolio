import Header from '../../layouts/navigation/Header';
import Footer from '../../layouts/navigation/Footer';
import InterfaceGrid from '../../layouts/products/InterfaceGrid';

const Interfaces = () => {
  return (
    <>
      <Header />
      <section className="flexBox justifyCenter alignUnset">
        <InterfaceGrid />
      </section>
      <Footer />
    </>
  );
};
export default Interfaces;
