const ProductPageTabs = () => {
  return (
    <section className='productTabs'>
      <div className='productTabs__tabs'>
        <button className='productTabs__tabs__tab'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.1em' height='1.1em' viewBox='0 0 32 32'>
            <path fill='#ffffff' d='M18 26h8v2h-8zm0-4h12v2H18zm0-4h12v2H18z'></path>
            <path
              fill='#ffffff'
              d='M20.549 11.217L16 2l-4.549 9.217L1.28 12.695l7.36 7.175L6.902 30L14 26.269v-2.26l-4.441 2.335l1.052-6.136l.178-1.037l-.753-.733l-4.458-4.347l6.161-.895l1.04-.151l.466-.943L16 6.519l2.755 5.583l.466.943l1.04.151l7.454 1.085L28 12.3l-7.451-1.083z'></path>
          </svg>
          <span>Reviews</span>
        </button>
        <button className='productTabs__tabs__tab'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.1em' height='1.1em' viewBox='0 0 24 24'>
            <path
              fill='#ffffff'
              d='M6 20q-1.25 0-2.125-.875T3 17H2q-.425 0-.713-.288T1 16V6q0-.825.588-1.413T3 4h12q.825 0 1.413.588T17 6v2h2q.475 0 .9.213t.7.587l2.2 2.925q.1.125.15.275t.05.325V16q0 .425-.288.713T22 17h-1q0 1.25-.875 2.125T18 20q-1.25 0-2.125-.875T15 17H9q0 1.25-.875 2.125T6 20Zm0-2q.425 0 .713-.288T7 17q0-.425-.288-.713T6 16q-.425 0-.713.288T5 17q0 .425.288.713T6 18Zm12 0q.425 0 .713-.288T19 17q0-.425-.288-.713T18 16q-.425 0-.713.288T17 17q0 .425.288.713T18 18Zm-1-5h4.25L19 10h-2v3Z'></path>
          </svg>
          <span>Shipment</span>
        </button>
        <button className='productTabs__tabs__tab'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.1em' height='1.1em' viewBox='0 0 14 14'>
            <g fill='none' stroke='#ffffff' strokeLinecap='round' strokeLinejoin='round'>
              <circle cx='6' cy='12.49' r='1'></circle>
              <circle cx='10.5' cy='12.49' r='1'></circle>
              <path d='M8.38 3.53A4 4 0 1 0 2 7.62m2.5-3.11L6 3.01m.5 6.49v-1H5a2 2 0 0 0-2 2v2'></path>
              <path d='M13.5 12.49v-5a1 1 0 0 0-1-1h-5a1 1 0 0 0-1 1v2'></path>
            </g>
          </svg>
          <span>Returns</span>
        </button>
        <button className='productTabs__tabs__tab'>
          <svg xmlns='http://www.w3.org/2000/svg' width='1.1em' height='1.1em' viewBox='0 0 20 20'>
            <path
              fill='#ffffff'
              fillRule='evenodd'
              d='M2.5 4A1.5 1.5 0 0 0 1 5.5V6h18v-.5A1.5 1.5 0 0 0 17.5 4h-15ZM19 8.5H1v6A1.5 1.5 0 0 0 2.5 16h15a1.5 1.5 0 0 0 1.5-1.5v-6ZM3 13.25a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75Zm4.75-.75a.75.75 0 0 0 0 1.5h3.5a.75.75 0 0 0 0-1.5h-3.5Z'
              clipRule='evenodd'></path>
          </svg>
          <span>Payments</span>
        </button>
      </div>
    </section>
  );
};
export default ProductPageTabs;
