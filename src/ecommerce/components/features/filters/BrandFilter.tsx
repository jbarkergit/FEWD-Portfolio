import { useRef, useEffect, useState } from 'react';
import Companies from './Companies';

const BrandFilter = (): JSX.Element => {
  const selectMenuRef = useRef<HTMLDivElement>(null),
    accordionRef = useRef<HTMLUListElement>(null);

  return (
    <div className="selectMenu" ref={selectMenuRef}>
      <div className="selectMenu__selection">
        <span className="selectMenu__selection__indicator">
          <span className="selectMenu__selection__indicator--area">Filter by Brand</span>
          <span className="selectMenu__selection__indicator--area">
            <i className="fa-solid fa-sort"></i>
          </span>
        </span>
        <div className="selectMenu--divider"></div>
      </div>
      <ul className="selectMenu__accordion" data-status="false" ref={accordionRef}>
        <Companies />
      </ul>
    </div>
  );
};

export default BrandFilter;
