import { NavigateLeft, NavigateRight } from '../hooks/useDemoNavigation';
import { useActiveDemo } from '../hooks/useActiveDemo';

import NavigationLabel from '../components/props/footer/NavigationLabelProps';

const PortfolioFooter = () => {
  return (
    <section>
      <footer aria-label="Footer Navigation">
        <nav className="portNav">
          <section className="portNav__block">
            <button type="button" role="tab" tab-index={6} id="footerBtnLeft" onClick={NavigateLeft} aria-label="Previous Project Button">
              <span className="portNav__block__inline">
                <i className="fa-solid fa-angles-left"></i>
              </span>
            </button>
          </section>
          <section className="portNav__block --labels flexBox">
            <NavigationLabel projectLink="" tabIndex={7} ariaLabel="Navigation Button for Project One" htmlFor="demo-1" id="" />
            <NavigationLabel projectLink="" tabIndex={8} ariaLabel="Navigation Button for Project Two" htmlFor="demo-2" id="" />
            <NavigationLabel projectLink="" tabIndex={9} ariaLabel="Navigation Button for Project Three" htmlFor="demo-3" id="" />
          </section>
          <section className="portNav__block">
            <button type="button" role="tab" tab-index={10} id="footerBtnRight" onClick={NavigateRight} aria-label="Next Project Button">
              <span className="portNav__block__inline">
                <i className="fa-solid fa-angles-right"></i>
              </span>
            </button>
          </section>
          <section className="portNav__block">
            <button role="tab" tab-index={11} onClick={useActiveDemo} aria-label="Navigate Button to Current Project">
              <span className="portNav__block__inline" id="activeDemoInline">
                <i className="fa-solid fa-expand"></i>
                <h4>Live Demo</h4>
              </span>
            </button>
          </section>
        </nav>
      </footer>
    </section>
  );
};

export default PortfolioFooter;
