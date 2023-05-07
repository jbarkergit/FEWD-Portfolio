import { Link } from 'react-router-dom';
import { useThemeToggle } from '../hooks/useThemeToggle';
import { useResumeFade } from '../hooks/useResumeFade';
import { useFormContact } from '../hooks/useFormContact';

const PortfolioHeader = () => {
  return (
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
        {/*
        <a href="mailto:jbarkerpoc@gmail.com" role="tab" tabIndex={3} id="contactForm--submit" rel="noopener noreferrer" target="_blank" aria-label="Contact Button">
          <span className="portNav__block__inline">
            <i className="fa-solid fa-paper-plane"></i>
            <h4>Contact</h4>
          </span>
        </a>
  */}
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
  );
};

export default PortfolioHeader;
