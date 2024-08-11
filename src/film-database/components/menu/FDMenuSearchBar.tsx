import { useRef, useState, useEffect, ChangeEvent, forwardRef } from 'react';
import { v4 as uuidv4 } from 'uuid';

type Type_PropDrill = {};

const FDMenuSearchBar = forwardRef<HTMLElement, Type_PropDrill>(({}, menuSearchRef) => {
  return (
    <section className='fdSearchBar' ref={menuSearchRef} data-menu='closed'>
      <div className='fdSearchBar__container'>
        <fieldset className='fdSearchBar__container__fieldset'>
          <legend className='fdSearchBar__container__fieldset__legend'>Find the entertainment you're looking for</legend>

          <label className='fdSearchBar__container__fieldset__label' htmlFor='fdSearchBar__fieldset__input' data-status='disabled'>
            Find the entertainment you're looking for
          </label>
          <input className='fdSearchBar__container__fieldset' />
        </fieldset>

        {/* <ul className='fdSearchBar__results' data-status={values && values.length > 0 && searchTerm.length > 0 ? 'active' : 'disabled'}> */}
        {/* {values && searchResults.length > 0 ? (
          values.slice(0, 8).map((obj) => (
            <li className='fdSearchBar__results__li' key={uuidv4()}>
              {(obj as Type_Tmdb_ApiCallMovie_Obj).title}
            </li>
          ))
        ) : searchTerm.length > 0 ? (
          <li>No results found.</li>
        ) : null} */}
        {/* </ul> */}
      </div>
    </section>
  );
});

export default FDMenuSearchBar;
