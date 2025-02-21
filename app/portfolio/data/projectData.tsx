import { Link } from 'react-router';

export const projectData = [
  {
    key: 'film database',
    url: 'film-database',
    technologies: {
      application_programming_interface: ['tmdb'],
      ui_component_libraries: ['react-youtube', 'react hook form'],
      software_development_kits: ['firebase', 'firebase-tools'],
      utilities_and_services: ['zod'],
      tools_and_libraries: ['vite', 'react', 'react-router', 'typescript', 'sass'],
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
    imgSrc: '/app/portfolio/assets/carousel-posters/film-database-screenshot.webp',
    imgAlt: 'Film Database Development Project',
  },
  {
    key: 'ecommerce',
    url: 'ecommerce',
    technologies: {
      application_programming_interface: ['N/A'],
      ui_component_libraries: ['N/A'],
      software_development_kits: ['N/A'],
      utilities_and_services: ['N/A'],
      tools_and_libraries: ['vite', 'react', 'react-router', 'typescript', 'sass'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: (
      <>
        <h2>A Dynamic eCommerce Application with Monochromatic and Neumorphic Styling</h2>
        <p>
          This audio shop was built with a focus on maintainability and performance. To streamline potential complexities, site-wide conditions were defined before
          building components. This introduced the challenge of acquiring a database with diverse key-value pairs. Issues such as routing, data persistence, and
          component re-renders arose, highlighting that the real challenge of this project was idealizing solutions before writing any code.
        </p>
        <p>
          Instead of using an API, I opted to partially scrape images and data, which involved image touch-ups, aspect ratio matching, and large batch exports to
          meet Web Core Vitals for three device breakpoints. Initially, the database was written in TSX format but was later converted to JSON post-completion—a
          clear example of why planning ahead is essential. This was eventually reformatted once more during React Router V7 migration. I built custom hooks to
          filter and return alphabetized, unique data from the database; enabling dynamic route mapping, product search functionality, filters, and
          categories—effectively resolving most pending issues.
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
          pleasure of writing useReducer boilerplate. Firebase and Stripe integration was omitted. This project remains imperfect and will only be maintained to
          properly render as it was my first from scratch full-fledged site, so you can imagine it would require a lot of love to be production worthy.
        </p>
      </>
    ),
    imgSrc: '/app/portfolio/assets/carousel-posters/ecommerce-screenshot.webp',
    imgAlt: 'Ecommerce Web Development Project',
  },
  {
    key: '2024 portfolio',
    url: '',
    technologies: {
      application_programming_interface: ['N/A - Custom JSON Store'],
      ui_component_libraries: ['React Hook Form'],
      software_development_kits: ['N/A'],
      utilities_and_services: ['Zod', 'Web3Forms'],
      tools_and_libraries: ['vite', 'react', 'react-router', 'typescript', 'sass'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: (
      <>
        <h2>An Application Hub with Seamless Transitions</h2>
        <p>
          This portfolio was designed to serve as an intuitive environment for skill assessment, housing multiple applications under one domain to enhance the user
          experience. While working with React Router v6, I encountered challenges related to routing complexities and optimizing Web Core Vitals such as Largest
          Contentful Paint (LCP) and Time to Interactive (TTI).
        </p>
        <p>
          Initially, I focused on lazy-loading project landing pages and improving performance metrics. Using the Network Developer Tool, I analyzed file sizes and
          transfer times, dynamically generating routes and managing them in the state to create a module loading queue. However, I faced issues with the 404 error
          handler loading prematurely, which required a workaround involving network observers and prop drilling to pass error states to the Suspense loader.
        </p>
        <p>
          After experimenting with custom solutions, I realized the need for a more scalable and flexible approach. I decided to implement a simpler, manually routed
          system with dynamic imports. This change significantly reduced complexity, improved performance, and provided a more maintainable structure. The focus was
          on optimizing both routing and the overall user experience, resulting in a smoother and more efficient application hub.
        </p>
        <p>
          Upon the release of React Router V7, the application no longer required a manual routing solution. I thoroughly reviewed the new documentation, scaffolded
          a new Vite project with React and React Router V7, and successfully migrated my application to the latest version. This migration significantly improved
          performance metrics, reduced the boilerplate code associated with manual routing, and enabled efficient prerendering, ultimately enhancing the
          application's overall performance and maintainability.
        </p>
      </>
    ),
    imgSrc: '/app/portfolio/assets/carousel-posters/portfolio-screenshot.webp',
    imgAlt: 'Portfolio Project Hub',
  },
];
