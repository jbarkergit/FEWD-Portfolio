import { Link } from 'react-router-dom';

export const projectData = [
  {
    key: 'film database',
    url: 'http://localhost:5173/film-database',
    technologies: {
      sdk: ['firebase', 'firebase-tools'],
      api: ['tmdb'],
      libraries: ['uuid', 'react-youtube'],
      core_libraries: ['vite', 'react', 'react router dom', 'sass'],
      web_technologies: ['html', 'css', 'javascript', 'typescript'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: (
      <>
        <h2>Film Database</h2>
        <p>
          From the core architecture to the user interface elements, this project represents a self-directed effort to build a movie-database website from scratch.
          It was an excellent opportunity to deepen my JavaScript knowledge and sharpen my critical thinking skills. The project utilizes{' '}
          <Link to='https://www.themoviedb.org/'>TheMovieDatabase API</Link> for data, the{' '}
          <Link to='https://www.npmjs.com/package/react-youtube'>React-YouTube</Link> library for integrating a custom iFrame controller, and Firebase for
          authentication and CRUD functionality.
        </p>
        <p>
          Working with <Link to='https://www.themoviedb.org/'>TMDB</Link> presented several challenges, such as inconsistently formatted URLs and the lack of WEBP
          images. To address these issues, I implemented additional type-guarded fetch logic to ensure successful HTTP responses. Through iterative refactoring and
          performance checks, I developed custom hooks to process data safely and efficiently. While the final solution is somewhat verbose, it performs well, though
          there’s always room for further optimization.
        </p>
        <p>
          The UI design was heavily inspired by Netflix and Prime Video. To create a consistent and visually appealing interface, I used{' '}
          <Link to='https://developers.google.com/youtube/iframe_api_reference'>YouTube's Player API</Link> to display trailers. However, the native controls didn't
          fit the desired aesthetic, which led me to develop a custom solution for the video player interface. Despite the challenges with the iFrame’s native
          behavior and limited documentation, I successfully integrated a custom controller overlay using{' '}
          <Link to='https://www.npmjs.com/package/react-youtube'>React-YouTube</Link>, achieving a seamless design.
        </p>
        <p>
          Once the UI was complete, I focused on improving my CSS transition skills, which provided invaluable experience. This project deepened my appreciation for
          intricate, CSS-based animations. Navigating new complexities required a thorough cleanup of my stylesheets and exploration of unfamiliar properties.
          Through trial and error, I optimized performance to ensure a smooth user experience across all devices.
        </p>
      </>
    ),
    imgSrc: '/src/portfolio/assets/carousel-posters/film-database-screenshot.webp',
    imgAlt: 'Film Database Development Project',
  },
  {
    key: 'ecommerce',
    url: 'http://localhost:5173/ecommerce',
    technologies: {
      libraries: ['uuid'],
      core_libraries: ['vite', 'react', 'react router dom', 'sass'],
      web_technologies: ['html', 'css', 'javascript', 'typescript'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: (
      <>
        <h2>A dynamic eCommerce application with monochromatic and neumorphic styling.</h2>
        <p>
          This audio shop was built with a dynamic foundation, keeping production maintenance and performance in mind. To streamline potential complexities,
          site-wide conditionals had to be satisfied prior to building components. This posed the challenge of acquiring a database with diverse key value pairs.
          Pending issues ensued from routing to persisting data site-wide and component re-renders. I quickly understood the real challenge of this application was
          idealizing solutions before writing any code.
        </p>
        <p>
          If I wasn't a glutton for punishment, I would have opted for the use of an API. Instead, I chose to partially scrape images and data. This involved image
          touch-ups, aspect-ratio matching, and large batch exports to satisfy Web Core Vitals for three device breakpoints. If that wasn't bad enough, I initially
          wrote the database in TSX format, then post-application completion, converted it to JSON. Utilizing the product database, I built numerous custom hooks
          that filtered and returned alphabetized unique data. Naturally, this paved the way for dynamic route mapping, product search functionality, product
          filters, and product categories. The vast majority of the application's data was dealt with, resolving any pending issues.
        </p>
        <p>
          Incorporating reusable, type-safe functional components that adhered to best practices, such as lazy loading and leveraging the Intersection Observer API
          for efficient querying, became an integral integration to reduce bloat and optimize performance. With React's performance hooks, constructor patterns, BEM
          methodology, and DRY, documented logic, refactoring component architecture was less of an issue than SEO and WAI-ARIA compliance. Side effect management,
          event propagation, and conditional rendering conflicts with animations took the most effort.
        </p>
        <p>
          Conceptualization of the application's UX and UI was the next big priority. By blending style structures from miscellaneous domains, I created something
          imperfect, experimental, and fun. I put a lot of emphasis on subtle element interactions throughout the application. Additionally, covered all edge cases
          for conditional mapping of images and data. Please note that if your monitor(s) are not calibrated, the neumorphic styling that is not suitable for
          production applications, may be lost.
        </p>
        <p>
          To truly mark this as an eCommerce project, user registry and authentication had to be simulated. I employed localStorage to handle data and Regular
          Expressions to handle field validation. The last step was shopping cart functionality, which gave me the great pleasure of writing useReducer boilerplate.
          Stripe and user account pages were omitted due to lack of a backend.
        </p>
      </>
    ),
    imgSrc: '/src/portfolio/assets/carousel-posters/ecommerce-screenshot.webp',
    imgAlt: 'Ecommerce Web Development Project',
  },
  {
    key: '2024 portfolio',
    url: '',
    technologies: {
      data: ['Custom JSON Store'],
      libraries: ['uuid'],
      core_libraries: ['vite', 'react', 'react router dom', 'sass'],
      web_technologies: ['html', 'css', 'javascript', 'typescript'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: (
      <>
        <h2>An Application Hub with Seamless Transitions</h2>
        <p>
          The primary goal of this portfolio was to craft an intuitive environment tailored for skill assessment. However, achieving such simplicity presented
          challenges, especially in dealing with routing intricacies and optimizing Web Core Vital metrics. What initially appeared as an unassuming design unfolded
          into a time-consuming process.
        </p>
        <p>
          The first strategy involved prioritizing each project's landing page and lazy loading corresponding pages to optimize the largest contentful paint and time
          to interact. While this standard approach seemed promising, it prompted a reconsideration of the routing strategy, especially considering the application's
          future scalability. Utilizing the Network developer tool became crucial for visualizing file sizes, transfer times, and the import queue.
        </p>
        <p>
          To create a module loading queue, I dynamically generated routes and spread them in state. Challenges arose, particularly with the 404 protocol error
          handler loading before the requested page. Attempting to address this led to a somewhat hacky solution involving dismissal of the handler, mounting an
          Observer to the Network, and prop drilling data to the Suspense loader just to prompt the user that the requested page couldn't be found.
        </p>
        <p>
          Navigating into the realm of custom Router development raised questions about the need for such intricacies. After careful consideration, I realized I
          hadn't exhausted all solutions. Manually routing paths and dynamically loading only the necessary modules would solve the protocol handler issues without
          adding complexity. This approach would also offer flexibility as the application scaled.
        </p>
        <p>
          Following this evaluation and implementation, I streamlined logic and minimalized variable memory caching to reduce Web Core Vital metrics. Accepting a
          minuscule performance impact on initial load, the trade-off would be a synchronous background queue and seamless page transitions. While I do intend on
          revisiting a more custom solution, the current solution is satisfactory.
        </p>
      </>
    ),
    imgSrc: '/src/portfolio/assets/carousel-posters/portfolio-screenshot.webp',
    imgAlt: 'Portfolio Project Hub',
  },
];
