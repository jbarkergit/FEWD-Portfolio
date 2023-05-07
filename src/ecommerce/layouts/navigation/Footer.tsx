import CtaNewsletter from '../../components/navigation/footer/CtaNewsletter';
import FooterKit from '../../components/navigation/footer/FooterKit';

function EFooter() {
  return (
    <section>
      <footer className="eFooter flexBox justifyCenter">
        <CtaNewsletter />
        <FooterKit />
      </footer>
    </section>
  );
}

export default EFooter;
