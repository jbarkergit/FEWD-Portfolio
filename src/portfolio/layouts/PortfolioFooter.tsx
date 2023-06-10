import { useState } from 'react';
import NavigationLabel from '../components/props/footer/NavigationLabelProps';

const PortfolioFooter = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0),
    demos: HTMLCollection = document.getElementsByClassName('demoSection');

  function useLeftNav() {
    const nextIndex: number = activeIndex - 1 >= 0 ? activeIndex - 1 : demos.length - 1,
      activeDemo: HTMLElement = document.querySelector(`[data-index="${activeIndex}"]`)!,
      nextDemo: HTMLElement = document.querySelector(`[data-index="${nextIndex}"]`)!;

    activeDemo instanceof HTMLElement ? (activeDemo.dataset.status = 'after') : console.log(Error());
    nextDemo instanceof HTMLElement ? (nextDemo.dataset.status = 'active-from-before') : console.log(Error());

    setTimeout(() => {
      nextDemo.dataset.status = 'active';
      setActiveIndex(nextIndex);
    }, 50);
  }

  function useRightNav() {
    const nextIndex: number = activeIndex + 1 <= demos.length - 1 ? activeIndex + 1 : 0,
      activeDemo: HTMLElement = document.querySelector(`[data-index="${activeIndex}"]`)!,
      nextDemo: HTMLElement = document.querySelector(`[data-index="${nextIndex}"]`)!;

    activeDemo instanceof HTMLElement ? (activeDemo.dataset.status = 'before') : console.log(Error());
    nextDemo instanceof HTMLElement ? (nextDemo.dataset.status = 'active-from-after') : console.log(Error());

    setTimeout(() => {
      nextDemo.dataset.status = 'active';
      setActiveIndex(nextIndex);
    }, 50);
  }

  function useActiveDemo() {
    if (activeIndex === 0) {
      const portfolio = document.querySelector('.portfolio')!;
      portfolio.classList.toggle('invalidShakeAnimation');
      setTimeout(function () {
        portfolio.classList.toggle('invalidShakeAnimation');
      }, 165);
    } else if (activeIndex === 1) {
      location.href = '/ecommerce';
    } else {
      location.href = '*';
    }
  }

  return (
    <section>
      <footer aria-label="Footer Navigation">
        <nav className="portNav">
          <section className="portNav__block">
            <button type="button" role="tab" tab-index={6} onClick={useLeftNav} aria-label="Navigate to Previous Project">
              <span className="portNav__block__inline">
                <img src="src/portfolio/assets/images/fontawesome/miscellaneous/fa-angles-left.svg" />
              </span>
            </button>
          </section>
          <section className="portNav__block --labels flexBox">
            <NavigationLabel projectLink="" tabIndex={7} ariaLabel="Navigate to Project One" htmlFor="demo-1" id="" />
            <NavigationLabel projectLink="" tabIndex={8} ariaLabel="Navigate to Project Two" htmlFor="demo-2" id="" />
            <NavigationLabel projectLink="" tabIndex={9} ariaLabel="Navigate to Project Three" htmlFor="demo-3" id="" />
          </section>
          <section className="portNav__block">
            <button type="button" role="tab" tab-index={10} onClick={useRightNav} aria-label="Navigate to Next Project">
              <span className="portNav__block__inline">
                <img src="src/portfolio/assets/images/fontawesome/miscellaneous/fa-angles-right.svg" />
              </span>
            </button>
          </section>
          <section className="portNav__block">
            <button role="tab" tab-index={11} onClick={useActiveDemo} aria-label="Navigate to Current Project">
              <span className="portNav__block__inline" id="activeDemoInline">
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
