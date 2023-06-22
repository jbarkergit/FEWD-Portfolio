import { Link } from 'react-router-dom';
import useLocalStorage from '../../shared/hooks/useLocalStorage';

const PortfolioHeader = () => {
  const [theme, setTheme] = useLocalStorage('theme', '' ? 'neumorphicDark' : 'neumorphicLight');
  return (
    <section>
      <header className="portNav" aria-label="Primary Navigation">
        <section className="portNav__block">
          <button
            id="themeToggler"
            type="button"
            role="tab"
            tab-index={1}
            aria-label="Theme Toggle Button"
            onClick={() => {
              theme === 'neumorphicLight' ? setTheme('neumorphicDark') : setTheme('neumorphicLight');
            }}
          >
            <span className="portNav__block__inline">
              <h4>theme</h4>
            </span>
          </button>
        </section>
        <section className="portNav__block">
          <button
            type="button"
            role="tab"
            tab-index={2}
            onClick={() =>
              document.querySelector('.toggleResume')!.getAttribute('data-activity') === 'inactive'
                ? document.querySelector('.toggleResume')!.setAttribute('data-activity', 'active')
                : document.querySelector('.toggleResume')!.setAttribute('data-activity', 'inactive')
            }
            aria-label="View Resume Button"
          >
            <span className="portNav__block__inline">
              <h4>Resume</h4>
            </span>
          </button>
        </section>
        <section className="portNav__block">
          <button
            type="button"
            role="tab"
            tab-index={3}
            onClick={() =>
              document.querySelector('.contact')!.getAttribute('data-activity') === 'inactive'
                ? document.querySelector('.contact')!.setAttribute('data-activity', 'active')
                : document.querySelector('.contact')!.setAttribute('data-activity', 'inactive')
            }
            aria-label="View Contact Form Button"
          >
            <span className="portNav__block__inline">
              <h4>Contact</h4>
            </span>
          </button>
        </section>
        <section className="portNav__block">
          <Link to="https://github.com/jbarkergit?tab=repositories" target="_blank" role="tab" tab-index={4} aria-label="GitHub Redirect Button">
            <span className="portNav__block__inline">
              <img className="fa-square-github" src="src/portfolio/assets/images/fontawesome/skills/fa-square-github.svg" alt="GitHub" />
            </span>
          </Link>
        </section>
      </header>
    </section>
  );
};

export default PortfolioHeader;
