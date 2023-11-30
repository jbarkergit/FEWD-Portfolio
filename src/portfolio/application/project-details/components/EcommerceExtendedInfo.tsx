const EcommerceExtendedInfo = (): JSX.Element => {
  return (
    <section className='projectDetails__article__insights__projectOverview'>
      <h2>An eCommerce shop with all the bells and whistles.</h2>
      <p>
        This simple application was idealized with performance in mind. To start off, I paired useContext and useState to track component changes. This would go on
        to satisfy conditionals of all dynamic components throughout the application. Which lead to the first few challenges: Routing and peristing data site-wide.
        The solutions were out of reach as to create this dynamic, streamlined environment, I'd first need a product database to gather unique data.
      </p>
      <h3>Product Database</h3>
      <p>
        A simple API fetch would fix my problems; however, I opted to build my own database. I didn't think it would be all that tedious until I realized I'd have to
        partially scrape the database, touch-up and resize product images in Adobe Photoshop, queue batch exports in three device dimensions and finally compress the
        batches to adhere to best Web Core Vital practices. Did I waste my time? Absolutely. Did I go mad? Slightly. On the upside, I love audio gear and it was
        quite fun to boot up a Spotify playlist while I researched the products I'd be presenting for no real monetary gain; until I had to create the JSON file. Fun
        fact: I initially wrote the database in TSX format, then post-application completion, converted to JSON.
      </p>
      <p>
        Utilizing my newly built product database, I built numerous hooks to filter data for route mapping, product search functionality, product filters and product
        mapping by category. In doing so, used numerous data structures to store, convert and return alphabetized data. Which left only conceptualization of the
        application's style. Having had owned an eCommerce LLC, I seated the user experience at the table of consideration. I minimalized the UI and UX by blending
        style structures from miscellaneous domains for both the desktop layout and the mobile layout. I did not aim to re-invent the wheel, nor make anything grand
        and unique; rather, learn and have fun. So calibrate your monitors, because I leaned into neumorphic design despite knowing it's a poor decision for
        in-production applications.
      </p>
      <p>
        I crafted DRY, SEO-optimized, WAI-ARIA-compliant, reusable components (deep breath here) that appreciated React's opinionated rules and native mannerisms to
        avoid unnecessary re-renders (another deep breath here) and minimalize side effects. Then, refactored component architecture until performance was
        satisfactory by carefully opting into React's performance hooks such as useCallback and useMemo. I used fallbacks for any event in which functional
        components fail to return data through use of undefined checks and conditional rendering. I avoided JavaScript animations where possible, employed
        constructor patterns for reusability and even implemented Intersectional Observer API and utilized useState setter rerenders for optimized infinite scroll
        querying. The logic behind these components is explicit, type safe and documented for legibility and maintaince.
      </p>
      <p>
        Finally, to truly make this an eCommerce project, I needed to build account registry and login forms with field validation that simulated user authentication
        and a shopping cart. The form validation uses Regular Expressions and handles error prompts. The shopping cart functionality was written using React's
        useReducer. Both the account forms and shopping cart utilize local storage to maintain data across page loads. I have yet to integrate Stripe as initially
        planned.
      </p>
    </section>
  );
};

export default EcommerceExtendedInfo;
