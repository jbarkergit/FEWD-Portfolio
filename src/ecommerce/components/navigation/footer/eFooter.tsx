import ENewsletter from './ENewsletter';
import EServices from './EServices';
import ESupport from './ESupport';

const EFooter = (): JSX.Element => {
  return (
    <footer className="eFooter">
      <section className="eFooter__newsCta">
        <h2>Let's stay in touch</h2>
        <ENewsletter />
      </section>
      <nav className="eFooter__kit">
        <section className="eFooter__kit__customerSupport">
          <ESupport />
        </section>
        <section className="eFooter__kit__customerSupport">
          <EServices />
        </section>
      </nav>
      <section className="eFooter__company">
        <small>2023 Dynamic Audio</small>
        <address>1800 DAUDIO</address>
        <address>support@dynamicaudio.com</address>
      </section>
    </footer>
  );
};

export default EFooter;
