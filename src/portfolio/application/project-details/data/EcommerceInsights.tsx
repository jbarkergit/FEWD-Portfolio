const EcommerceInsights = (): JSX.Element => {
  return (
    <section className='projectDetails__article__insights__projectOverview'>
      <h2>A dynamic eCommerce application with monochromatic and neumorphic styling.</h2>
      <p>
        This audio shop was built with a dynamic foundation, keeping production maintenance and performance in mind. To streamline potential complexities, site-wide
        conditionals had to be satisfied prior to building components. This posed the challenge of filtering unique, alphabetized, and building a product database
        with carefully chosen key-value pairs. Pending issues ensued from routing to persisting data site-wide and component re-renders. I quickly understood the
        real challenge of this application was idealizing solutions before writing any code.
      </p>
      <p>
        If I wasn't a glutton for punishment, I would have opted for the use of an API. Instead, I chose to partially scrape images and data. This involved image
        touch-ups, aspect-ratio matching, and large batch exports to satisfy Web Core Vitals for three device breakpoints. If that wasn't bad enough, I initially
        wrote the database in TSX format, then post-application completion, converted it to JSON.
      </p>
      <p>
        Utilizing the product database, I built numerous custom hooks that filtered and returned alphabetized unique data. The biggest challenge, again, was ensuring
        that the key-value pairs were broad enough to simplify the filtering process. Naturally, this paved the way for dynamic route mapping, product search
        functionality, product filters, and product categories. The vast majority of the application's data was dealt with, and routes could now be dynamically
        mapped, resolving any pending issues.
      </p>
      <p>
        Incorporating reusable, type-safe functional components that adhered to best practices, such as lazy loading and leveraging the Intersection Observer API for
        efficient querying, became an integral integration to reduce bloat and optimize performance. With React's performance hooks, constructor patterns, BEM
        methodology, and DRY, documented logic, refactoring component architecture was less of an issue than SEO and WAI-ARIA compliance. Side effect management,
        event propagation, and conditional rendering conflicts with animations took the most effort; yet, nothing worth mentioning. Conceptualization of the
        application's UX and UI was the next big priority. By blending style structures from miscellaneous domains, I created something imperfect, experimental, and
        fun. I put a lot of emphasis on subtle element interactions throughout the application. Additionally, covered all edge cases for conditional mapping of
        images and data. This project contains neumorphic styling not suitable for production applications. Please note that if your monitor(s) are not calibrated,
        the styling may be lost.
      </p>
      <p>
        To truly mark this as an eCommerce project, user registry and authentication had to be simulated. Given I am a front-end developer, I employed localStorage
        to handle data and Regular Expressions to handle field validation. The last step was shopping cart functionality, which gave me the great pleasure of writing
        useReducer boilerplate enough times to understand the frustration associated with this hook 🙄. I, of course, have not built out user account pages nor
        integrated Stripe due to a lack of a back-end.
      </p>
    </section>
  );
};

export default EcommerceInsights;
