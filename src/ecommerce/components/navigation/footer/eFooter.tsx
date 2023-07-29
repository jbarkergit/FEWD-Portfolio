import Newsletter from './Newsletter';
import Service from './Service';
import Support from './Support';

const eFooter = (): JSX.Element => {
  return (
    <footer className="eFooter">
      <section className="eFooter__newsCta">
        <h2>Keep in touch</h2>
        <Newsletter />
      </section>
      <nav className="footerKit">
        <section className="footerKit__customerSupport">
          <Support />
        </section>
        <section className="footerKit__customerSupport">
          <div>
            <Service />
          </div>
        </section>
      </nav>
      <small>2023 Dynamic Audio</small>
    </footer>
  );
};

export default eFooter;
