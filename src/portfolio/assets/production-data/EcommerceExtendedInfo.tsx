const EcommerceExtendedInfo = (): JSX.Element => {
  return (
    <article className='projectDetails__projectOverview'>
      <h2>Ecommerce Project Overview</h2>
      <h3>Key Technologies: HTML, CSS, SASS, JavaScript, TypeScript, Vite, Vitest, ESLint, Prettier, React, React Router DOM</h3>
      <p>
        This eCommerce project was developed with the primary goal of establishing a solid foundation in building dynamic web applications. Through iterative
        processes, I successfully achieved this objective without relying on third-party libraries to enforce stronger problem solving and critical thinking
        skill-sets.
      </p>
      <p>
        The implementation of Dynamic Audio was influenced by React Native behaviors and code splitting methodology. I utilized a single useState hook within context
        to streamline logic and complexity, ultimately reducing initial page load times. This approach posed challenges, such as the need to persist data across page
        loads, individual product category pages, filtered pages and managing React Router Dom routes which are mapped by gathering unique sets of companies, product
        categories and styles. All of which were explored, rethought and refactored until I could no longer improve upon performance.
      </p>
      <p>
        A deeper knowledge of React's behaviors and mannerisms was required to implement better code practices such as DRY methodology, splitting nested code into
        individual components, component prop drilling, and more, to avoid unnecessary re-renders and to manage side effects across the application. I've come to
        find I'm more opinionated on topics now but still challenge myself, opinions and knowledge. Naturally, unit testing become a topic of concern. Given I opted
        into using Vite to bundle my application, I also chose to use Vitest to help me produce reliable code. Along the journey, I learned to counteract warnings
        and bugs prompted by React and learned its opinionated rules such as not using indexes from maps for unique keys.
      </p>
      <p>
        To address this, I updated the mentioned state, which was then processed by a custom reduce hook to filter an array of self-generated product objects. This
        array was then divided into smaller segments, each pushed into useState as the last product element entered the viewport. This was facilitated by
        JavaScript's Intersectional Observer API, leading to efficient component re-renders via the useState setter.
      </p>
      <p>
        For product filters, I employed the constructor pattern to craft reusable functional components. These components are conditionally rendered based on the
        useState context utilized for product filtering.
      </p>
      <p>
        The shopping cart functionality was realized using React's useReducer. Actions were dispatched, and local storage was employed to maintain data across page
        loads. While my backend learning journey is in its early stages, I have yet to integrate Stripe as initially planned or transition the product database to
        mySQL.
      </p>
      <p>
        This project was time absorbent, given I stitched together design styles through an array of inspirational resources. Additionally, I spent as much time as
        possible refactoring code structure to conceptualize and test complex layouts. Having had owned an eCommerce business prior to this web development journey,
        I seated the user experience at the table of consideration, ultimately settling on a blend of my own ideas and pieces of style structures from other domains
        such as Apple, RollieNation, NewEgg and miscellaneous domains from awwwards for both the desktop layout and the mobile layout. I did not aim to re-invent the
        wheel, nor make anything grand and unique; rather, learn. I did; however, find myself questioning the lack of 2K monitor scaling support, which I believe to
        be lacking in the industry given the comparison of statistics from when developers stop supporting browsers based on user usage and Steam's user data.
      </p>
      <p>
        From articles and courses to coding challenges, my primary focus has been on understanding how to tackle pending issues rather than memorizing solutions.
        This project encapsulates my dedication to idealizing potential solutions, seeking more sound solutions and becoming a better craftsman of the development
        trade. Moving forward, I am determined to further expand my knowledge, bridge gaps, and cultivate a stronger, more robust foundation for continuous
        improvement through exploration of JavaScript topics like the Big O via articles and books while I build muscle memory on a professional level. Eventually, I
        plan to slowly transition into becoming a more rounded developer by learning mySQL and exploring the back end of web development.
      </p>
    </article>
  );
};

export default EcommerceExtendedInfo;
