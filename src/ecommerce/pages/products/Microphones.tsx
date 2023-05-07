import Header from '../../layouts/navigation/Header';
import Footer from '../../layouts/navigation/Footer';
import MicrophoneGrid from '../../layouts/products/MicrophoneGrid';

const Microphones = () => {
  return (
    <>
      <Header />
      <section className="flexBox justifyCenter alignUnset">
        <MicrophoneGrid />
      </section>
      <Footer />
    </>
  );
};
export default Microphones;
