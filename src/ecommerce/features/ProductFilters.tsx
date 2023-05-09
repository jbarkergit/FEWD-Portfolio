import { useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProductFilters = () => {
  const [pageHeading, setPageHeading] = useState('');
  const handlePageHeadingState = () => {
    useLocation().pathname === './products' ? setPageHeading('Browse All') : null;
    useLocation().pathname === './headphones' ? setPageHeading('Headphones') : null;
    useLocation().pathname === './amps' ? setPageHeading('Amps') : null;
    useLocation().pathname === './dacs' ? setPageHeading('Dacs') : null;
    useLocation().pathname === './equalizers' ? setPageHeading('Equalizer') : null;
    useLocation().pathname === './amp-dac-comboes' ? setPageHeading('Amp/Dac Comboes') : null;
    useLocation().pathname === './microphones' ? setPageHeading('Microphones') : null;
    useLocation().pathname === './interfaces' ? setPageHeading('Interfaces') : null;
    return pageHeading;
  };
  return (
    <section className="productFilters flexBox">
      <div className="productFilters--half">
        <h2>{pageHeading}temp</h2>
      </div>
      <div className="productFilters--half">
        <span className="productFilters--half__button flexBox justifyEnd">
          <button role="button">
            <i className="fa-solid fa-grip-vertical"></i>
          </button>
          <button role="button">
            <i className="fa-solid fa-grip"></i>
          </button>
          <button role="button">
            <i className="fa-solid fa-list"></i>
          </button>
        </span>
      </div>
    </section>
  );
};

export default ProductFilters;
