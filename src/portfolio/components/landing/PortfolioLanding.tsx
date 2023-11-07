import { useEffect, useRef, useState } from 'react';

const PortfolioLanding = () => {
  /** useRef */
  const portfolioLandingRef = useRef<HTMLElement>(null);

  /** Landing Page Tracker */
  const [userLanded, setUserLanded] = useState<boolean>(true);

  /** Initialize loading transition */
  useEffect(() => {
    userLanded ? portfolioLandingRef.current?.setAttribute('data-transition', 'true') : portfolioLandingRef.current?.setAttribute('data-transition', 'false');
  }, [userLanded]);

  if (userLanded)
    return (
      <section className='portfolioLanding' ref={portfolioLandingRef}>
        <h2 className='portfolioLanding--mandatoryHeading'>About the Developer, Justin Barker</h2>
        <article className='portfolioLanding__article'>
          <h3 className='portfolioLanding__article--h3'>Whoa, hey! I'm Justin.</h3>
          <p className='portfolioLanding__article--p'>
            I'm a Front-End Developer specializing in <abbr title='React: A JavaScript library for building user interfaces'>React</abbr>. I build responsive,
            interactive, <abbr title='Search Engine Optimization'>SEO</abbr>-optimized, and{' '}
            <abbr title='Web Accessibility Initiative - Accessible Rich Internet Applications'>WAI-ARIA</abbr>-compliant components for client-facing web
            applications; with a focus on performance-oriented <abbr title='Largest Contentful Paint'>LCP</abbr>, <abbr title='First Input Delay'>FID</abbr>, and{' '}
            <abbr title='Cumulative Layout Shift'>CLS</abbr> metrics. If you are a company interested in my skill acquisition for employment, please reach out for
            more information.
          </p>
        </article>
      </section>
    );
};
export default PortfolioLanding;
