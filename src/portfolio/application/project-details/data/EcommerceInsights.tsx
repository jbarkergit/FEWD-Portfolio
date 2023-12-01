const EcommerceInsights = (): JSX.Element => {
  return (
    <section className='projectDetails__article__insights__projectOverview'>
      <h2>Full-fledged eCommerce front-end with neumorphic inspiration.</h2>
      <p>
        To create a dynamic foundation, useContext and useState were paired to track component changes. The provider streamlines potential complexities and
        challenges while satisfying conditional logic throughout the application. This brought about three pending issues: routing, persisting data site-wide, and
        component re-renders.
      </p>
      <p>
        Both issues were put on the back burner since the solutions required filtering product data. I decided to opt out of using an API. Instead, like a glutton
        for punishment, I chose to partially scrape images and data. This involved image touch-ups, resizing, and large batch exports in three device dimensions and
        size compression to adhere to Web Core Vital best practices. Fun fact: I initially wrote the database in TSX format, then post-application completion,
        converted it to JSON. Couldn't tell you why.
      </p>
      <p>
        Utilizing the product database, I built numerous custom hooks that filtered and returned alphabetized unique data. This paved the way for dynamic route
        mapping, product search functionality, product filters, and product categories. That left data persistence and re-renders as pending issues, ultimately
        resolved with useEffect triggering useState to render components when required.
      </p>
      <p>
        Reusable, type-safe functional components became an imperative integration to reduce bloat and optimize performance. With React's performance hooks,
        constructor patterns, data structures, BEM methodology, and DRY, documented logic, refactoring component architecture was less an issue than SEO and
        WAI-ARIA-compliance. Side effect management, event propagation, and conditional rendering conflicts with animations took the most effort; yet, nothing worth
        mentioning. Conceptualization of the application's UX and UI was the next big priority. By blending style structures from miscellaneous domains, I created
        something imperfect, experimental, and fun; despite not being suitable for production nor grand in fashion. Please note this project contains neumorphic
        components; therefore, if your monitors aren't calibrated, the styling may be lost.
      </p>
      <p>
        Finally, to truly call this an eCommerce project, I had to simulate account authentication, account registry, and implement shopping cart functionality. Both
        the account forms and shopping cart utilize localStorage to persist data across page loads. The shopping cart bestowed the great pleasure of writing
        useReducer boilerplate enough times to build muscle memory. LocalStorage handles data for both features. I have yet to integrate Stripe.
      </p>
    </section>
  );
};

export default EcommerceInsights;
