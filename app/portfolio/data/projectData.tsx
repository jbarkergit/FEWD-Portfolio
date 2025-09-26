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
        <h2>Neumorphic eCommerce Audio Shop</h2>
        <p>
          This audio shop was built with maintainability and scalability in mind. Site-wide conditions were defined
          before building components, requiring a flexible database structure and consideration of routing, data
          persistence, and component re-renders—challenges that revealed the limits of my early frontend foundation and
          informed better practices in later projects.
        </p>
        <p>
          To make the project feel more personal, I opted out of API usage. Instead, I partially scraped images and
          data, optimizing them in Photoshop to meet Web Core Vitals across three device breakpoints. The database was
          initially written in TSX, converted to JSON, and later restructured during React Router V7 migration to
          support dynamic pathing as the application scaled. A simple database utility filters and returns unique,
          alphabetized data, enabling dynamic routing, product search, and basic commerce features.
        </p>
        <p>
          Components were designed to be reusable, type-safe, and performant. Lazy loading and Intersection Observer
          managed expanding lists efficiently, while careful handling of state, side effects, and conditional animations
          ensured smooth interactions.
        </p>
        <p>
          The UI blends experimental monochromatic and neumorphic styles with subtle interactive elements and loading
          skeletons. Styling may render differently across monitors depending on color calibration, which was an
          intentional design tradeoff.
        </p>
        <p>
          Core functionality, including authentication and shopping cart storage, was implemented using native
          JavaScript and localStorage rather than full solutions like Firebase or Stripe. This first-from-scratch
          application demonstrates architectural and design decisions for a maintainable eCommerce site. It is not
          production-ready, but reflects growth, experimentation, and practical problem-solving in frontend development.
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
          This portfolio was designed as an intuitive environment for skill demonstration, hosting multiple applications
          under one domain to improve the user experience. While working with React Router v6, I faced challenges with
          routing complexity and optimizing Web Core Vitals such as Largest Contentful Paint (LCP) and Time to
          Interactive (TTI).
        </p>
        <p>
          Initially, I focused on lazy-loading project landing pages and improving performance metrics. Using the
          Network Developer Tool, I analyzed file sizes and transfer times, dynamically generating routes and managing a
          module loading queue in state. A key issue was the 404 error handler loading prematurely, which required a
          workaround using network observers and prop drilling to propagate error states to the Suspense loader.
        </p>
        <p>
          After experimenting with custom solutions, I implemented a simpler, manually routed system with dynamic
          imports. This reduced complexity, improved performance, and created a more maintainable structure. The focus
          remained on optimizing routing and overall user experience, resulting in a smoother and more efficient
          application hub.
        </p>
        <p>
          With the release of React Router V7, the manual routing system became unnecessary. I reviewed the new
          documentation, scaffolded a reference Vite project with React and React Router V7, and successfully migrated
          the application. This migration improved performance metrics, reduced boilerplate, and enabled efficient
          prerendering, enhancing the application's maintainability and responsiveness.
        </p>
      </>
    ),
    imgSrc: '/app/portfolio/assets/projects/webp/portfolio-screenshot.webp',
    imgAlt: 'Portfolio Project Hub',
  },
];
