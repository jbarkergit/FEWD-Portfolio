import { Link } from 'react-router-dom';
import { useResumeFade } from '../hooks/useResumeFade';
import { useFormContact } from '../hooks/useFormContact';

const PortfolioHeader = () => {
  return (
    <section>
      <header className="portNav" aria-label="Primary Navigation">
        <section className="portNav__block">
          <button id="themeToggler" type="button" role="tab" tab-index={1} aria-label="Theme Toggle Button">
            <span className="portNav__block__inline flexColumn">
              <h4>theme</h4>
            </span>
          </button>
        </section>
        <section className="portNav__block">
          <button type="button" role="tab" tab-index={2} onClick={useResumeFade} aria-label="View Resume Button">
            <span className="portNav__block__inline">
              <h4>Resume</h4>
            </span>
          </button>
        </section>
        <section className="portNav__block">
          <button type="button" role="tab" tab-index={3} onClick={useFormContact} aria-label="View Contact Form Button">
            <span className="portNav__block__inline">
              <h4>Contact</h4>
            </span>
          </button>
        </section>
        <section className="portNav__block">
          <Link to="https://github.com/jbarkergit?tab=repositories" target="_blank" role="tab" tab-index={4} aria-label="GitHub Redirect Button">
            <span className="portNav__block__inline">
              <i className="fa-brands fa-github"></i>
            </span>
          </Link>
        </section>
      </header>
    </section>
  );
};

export default PortfolioHeader;
