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
          images. To address these issues, I implemented a type library of sorts and additional type-guarded fetch logic to ensure successful HTTP responses. Through
          iterative refactoring and performance checks, I developed custom hooks to process data safely and efficiently. While the final solution is somewhat
          verbose, it performs well, though there’s always room for further optimization.
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
          This audio shop was built with a focus on maintainability and performance. To streamline potential complexities, site-wide conditions were defined before
          building components. This introduced the challenge of acquiring a database with diverse key-value pairs. Issues such as routing, data persistence, and
          component re-renders arose, highlighting that the real challenge of this project was idealizing solutions before writing any code.
        </p>
        <p>
          Instead of using an API, I opted to partially scrape images and data, which involved image touch-ups, aspect ratio matching, and large batch exports to
          meet Web Core Vitals for three device breakpoints. Initially, the database was written in TSX format but was later converted to JSON post-completion—a
          clear example of why planning ahead is essential. I built custom hooks to filter and return alphabetized, unique data from the database; enabling dynamic
          route mapping, product search functionality, filters, and categories—effectively resolving most pending issues.
        </p>
        <p>
          The app utilizes reusable, type-safe functional components, incorporating best practices like lazy loading and the Intersection Observer API to reduce
          bloat and optimize performance. React's performance hooks, constructor patterns, BEM methodology, and DRY principles helped streamline refactoring, though
          SEO and WAI-ARIA compliance posed a bigger challenge. Managing side effects, event propagation, and resolving conflicts between conditional rendering and
          animations required the most effort.
        </p>
        <p>
          Conceptualizing the UX and UI was a major focus. By blending various style structures from miscellaneous domains, I aimed for an experimental and playful
          design with subtle interactive elements throughout the application. I also accounted for edge cases in image and data mappings. However, the neumorphic
          styling, not ideal for production environments, may not display correctly if monitors aren’t calibrated.
        </p>
        <p>
          To simulate the core functionality of an eCommerce site, I implemented user registration and authentication using localStorage, solely for practice, with
          Regular Expressions for field validation. The final step was adding shopping cart functionality, which provided the highly sought-after honor and absolute
          pleasure of writing useReducer boilerplate. Stripe integration is currently omitted. This application remains imperfect as it was my first from scratch
          full-fledged site, so you can imagine it would require a lot of love to be production worthy.
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
      api: ['Web3Forms'],
      data: ['Custom JSON Store'],
      libraries: ['Zod', 'React Hook Form', 'uuid'],
      core_libraries: ['vite', 'react', 'react router dom', 'sass'],
      web_technologies: ['html', 'css', 'javascript', 'typescript'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: (
      <>
        <h2>An Application Hub with Seamless Transitions</h2>
        <p>
          The primary goal of this portfolio was to create an intuitive environment tailored for skill assessment. However, achieving this simplicity posed
          challenges, particularly in navigating routing complexities and optimizing Web Core Vital metrics. What initially seemed like an unassuming design evolved
          into a time-consuming process.
        </p>
        <p>
          My first strategy focused on prioritizing each project's landing page and implementing lazy loading for corresponding pages to optimize the largest
          contentful paint and time to interact. While this standard approach appeared promising, it prompted a reconsideration of the routing strategy, especially
          in light of the application's future scalability. Utilizing the Network developer tool became essential for visualizing file sizes, transfer times, and the
          import queue.
        </p>
        <p>
          To create a module loading queue, I dynamically generated routes and spread them in the state. However, challenges emerged, particularly with the 404 error
          handler loading before the requested page. My attempts to resolve this led to a somewhat hacky solution: dismissing the handler, mounting an Observer on
          the Network, and prop drilling data to the Suspense loader to inform the user that the requested page couldn't be found.
        </p>
        <p>
          Diving into custom Router development raised questions about the necessity of such complexities. After careful consideration, I realized I hadn’t fully
          explored all available solutions. Manually routing paths and dynamically loading only the necessary modules would address the protocol handler issues
          without adding unnecessary complexity. This approach would also provide flexibility as the application scales.
        </p>
        <p>
          Following this evaluation and implementation, I streamlined the logic and minimized variable memory caching to enhance Web Core Vital metrics. Accepting a
          slight performance impact on the initial load, the trade-off resulted in a synchronous background queue and seamless page transitions. While I plan to
          revisit a more custom solution in the future, the current implementation is satisfactory.
        </p>
      </>
    ),
    imgSrc: '/src/portfolio/assets/carousel-posters/portfolio-screenshot.webp',
    imgAlt: 'Portfolio Project Hub',
  },
];
