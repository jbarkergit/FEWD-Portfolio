import { useEffect, useRef, useState } from 'react';

const PortfolioLanding = () => {
  const portfolioLandingRef = useRef<HTMLDivElement>(null);

  const [userLanded, setUserLanded] = useState<boolean>(false);
  const [loader, setLoader] = useState<number>(0);

  /** Initialize loading transition */
  useEffect(() => {
    userLanded ? portfolioLandingRef.current?.setAttribute('data-transition', 'true') : portfolioLandingRef.current?.setAttribute('data-transition', 'false');
  }, [userLanded]);

  /** Loader */
  useEffect(() => {}, []);

  if (userLanded)
    return (
      <div className='portfolio__landing' ref={portfolioLandingRef}>
        {loader}%
      </div>
    );
};
export default PortfolioLanding;
