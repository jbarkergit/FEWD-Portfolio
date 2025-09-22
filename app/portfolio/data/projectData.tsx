export const projectData = [
  {
    key: 'film database',
    url: 'film-database',
    technologies: {
      application_programming_interface: ['tmdb'],
      ui_component_libraries: ['react-youtube'],
      software_development_kits: ['firebase', 'firebase-tools'],
      utilities_and_services: ['zod'],
      tools_and_libraries: ['vite', 'react', 'react-router', 'typescript', 'sass'],
      testing_tools: ['Vitest', '@testing-library/react'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
      content_moderation: ['naughty-words'],
    },
    insights: (
      <>
        <h2>Film Database</h2>
        <p>
          This self-initiated movie database website was built from scratch using Vite, React, TypeScript, and styled
          with SASS. It integrates TheMovieDatabase (TMDB) API for movie data, React-YouTube for embedded video
          playback, and Firebase for authentication and full CRUD operations. Form validation is handled with Zod.
        </p>
        <p>
          Working with TMDB presented challenges, such as inconsistently formatted URLs and the lack of WEBP image
          support. To reduce API calls and prevent failures, I built a type-safe API wrapper from scratch. It handles
          endpoint construction, type inference, caching via sessionStorage, and batch requests with
          `Promise.allSettled`. This gave me autocompletion, consistent error handling, and predictable data shaping
          across the app. I invested time in Vitest for unit testing the wrapper and explored advanced TypeScript
          patterns to make the codebase developer-friendly.
        </p>
        <p>
          To capture the polished feel of platforms like Netflix, I built a custom SCSS-driven loading screen that
          appears on initial load. It uses staggered animations and subtle transforms to create a smooth reveal,
          juggling CSS timing, scale effects, and transition sequencing—a fun little challenge that ensures a polished
          first impression without impacting performance. The loader also ties into our React Router v7 client loader,
          prefetching the movie carousel data to make the UI feel responsive from the very first render.
        </p>
        <p>
          For trailer playback, I used YouTube's IFrame Player API, which aligns with TMDB's trailer results. To match
          the aesthetic of other movie-driven platforms, I stretched the iFrame. This came at the cost of losing the
          native controller, so I built a custom one to handle positioning and maintain a consistent, polished look
          where the custom embed exists.
        </p>
        <p>
          A major UI challenge was implementing a responsive carousel with dynamically sized items. Instead of relying
          on JavaScript-heavy solutions, I used CSS with viewport-based calculations and custom properties to determine
          item dimensions. This was a real head-scratcher, and the resolution became clear after poking around in
          Amazon’s DOM—shout out to whoever wrote the CSS calculations, they were super handy as a reference. I also
          considered approaches like preloading or skeleton states, but ultimately went with an IntersectionObserver
          solution that toggles data-attributes to manage display properties and fetch-priority hints without adding
          unnecessary network load.
        </p>
        <p>
          Implementing search and content filtering introduced an interesting challenge. TMDB’s 'adult' query parameter
          partially filters adult results, but gaps remain. I explored options such as region-locking, genre-based
          filtering, and rating restrictions, but decided on a simpler approach: removing results flagged as adult and
          filtering the remaining titles/overviews through the <code>naughty-words</code> npm package. It’s a
          lightweight, non-subscription solution that responsibly cuts down inappropriate results without slowing
          searches—good enough to keep search both usable and safe.
        </p>
        <p>
          I also built features that let users organize movies into custom collections and queue trailers for sequential
          viewing. Firestore handles data persistence and real-time updates. Drag-and-drop functionality was built from
          scratch to better understand native drag events, state transitions, and race conditions. A limitation remains:
          full WAI-ARIA compliance is not possible due to deprecation of ARIA support for draggable elements.
        </p>
        <p>
          This project helped me solidify my understanding of React, refine CSS animations and transitions, and deliver
          smoother visual updates across devices. Having rewritten it multiple times, it remains my flagship project and
          demonstrates my ongoing focus on improving both code quality and the user experience.
        </p>
      </>
    ),
    imgSrc: '/app/portfolio/assets/projects/webp/filmDatabase-screenshot.webp',
    imgAlt: 'Film Database Development Project',
  },
  {
    key: 'ecommerce',
    url: 'ecommerce',
    technologies: {
      application_programming_interface: ['N/A - Custom JSON Store'],
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
          This audio shop was built with a focus on maintainability and performance. To streamline potential
          complexities, site-wide conditions were defined before building components. This introduced the challenge of
          acquiring a database with diverse key-value pairs. Issues such as routing, data persistence, and component
          re-renders arose, highlighting that the real challenge of this project was idealizing solutions before writing
          any code.
        </p>
        <p>
          Instead of using an API, I opted to partially scrape images and data, which involved image touch-ups, aspect
          ratio matching, and large batch exports to meet Web Core Vitals for three device breakpoints. Initially, the
          database was written in TSX format but was later converted to JSON post-completion—a clear example of why
          planning ahead is essential. This was eventually reformatted once more during React Router V7 migration. I
          built custom hooks to filter and return alphabetized, unique data from the database; enabling dynamic route
          mapping, product search functionality, filters, and categories—effectively resolving most pending issues.
        </p>
        <p>
          The app utilizes reusable, type-safe functional components, incorporating best practices like lazy loading and
          the Intersection Observer API to reduce bloat and optimize performance. React's performance hooks, constructor
          patterns, BEM methodology, and DRY principles helped streamline refactoring, though SEO and WAI-ARIA
          compliance posed a bigger challenge. Managing side effects, event propagation, and resolving conflicts between
          conditional rendering and animations required the most effort.
        </p>
        <p>
          Conceptualizing the UX and UI was a major focus. By blending various style structures from miscellaneous
          domains, I aimed for an experimental and playful design with subtle interactive elements throughout the
          application. I also accounted for edge cases in image and data mappings. However, the neumorphic styling, not
          ideal for production environments, may not display correctly if monitors aren’t calibrated.
        </p>
        <p>
          To simulate the core functionality of an eCommerce site, I implemented user registration and authentication
          using localStorage, solely for practice, with Regular Expressions for field validation. The final step was
          adding shopping cart functionality, which provided the highly sought-after honor and absolute pleasure of
          writing useReducer boilerplate. Firebase and Stripe integration was omitted. This project remains imperfect
          and will only be maintained to properly render as it was my first from scratch full-fledged site, so you can
          imagine it would require a lot of love to be production worthy.
        </p>
      </>
    ),
    imgSrc: '/app/portfolio/assets/projects/webp/ecommerce-screenshot.webp',
    imgAlt: 'Ecommerce Web Development Project',
  },
  {
    key: '2024 portfolio',
    url: '',
    technologies: {
      application_programming_interface: ['N/A'],
      software_development_kits: ['N/A'],
      utilities_and_services: ['Zod', 'Web3Forms'],
      tools_and_libraries: ['vite', 'react', 'react-router', 'typescript', 'sass'],
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
    },
    insights: (
      <>
        <h2>An Application Hub with Seamless Transitions</h2>
        <p>
          This portfolio was designed to serve as an intuitive environment for skill assessment, housing multiple
          applications under one domain to enhance the user experience. While working with React Router v6, I
          encountered challenges related to routing complexities and optimizing Web Core Vitals such as Largest
          Contentful Paint (LCP) and Time to Interactive (TTI).
        </p>
        <p>
          Initially, I focused on lazy-loading project landing pages and improving performance metrics. Using the
          Network Developer Tool, I analyzed file sizes and transfer times, dynamically generating routes and managing
          them in the state to create a module loading queue. However, I faced issues with the 404 error handler loading
          prematurely, which required a workaround involving network observers and prop drilling to pass error states to
          the Suspense loader.
        </p>
        <p>
          After experimenting with custom solutions, I realized the need for a more scalable and flexible approach. I
          decided to implement a simpler, manually routed system with dynamic imports. This change significantly reduced
          complexity, improved performance, and provided a more maintainable structure. The focus was on optimizing both
          routing and the overall user experience, resulting in a smoother and more efficient application hub.
        </p>
        <p>
          Upon the release of React Router V7, the application no longer required a manual routing solution. I
          thoroughly reviewed the new documentation, scaffolded a new Vite project with React and React Router V7, and
          successfully migrated my application to the latest version. This migration significantly improved performance
          metrics, reduced the boilerplate code associated with manual routing, and enabled efficient prerendering,
          ultimately enhancing the application's overall performance and maintainability.
        </p>
      </>
    ),
    imgSrc: '/app/portfolio/assets/projects/webp/portfolio-screenshot.webp',
    imgAlt: 'Portfolio Project Hub',
  },
];
