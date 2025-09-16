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
      code_quality: ['prettier', 'eslint', 'eslint-config-airbnb'],
      content_moderation: ['naughty-words'],
    },
    insights: (
      <>
        <h2>Film Database</h2>
        <p>
          This self-initiated movie database website was developed from the ground up using Vite, React, TypeScript, and
          styled with SASS. It integrates the TheMovieDatabase (TMDB) API for movie data, React-YouTube for embedded
          video playback, and Firebase for authentication and full CRUD operations. Form validation is handled using
          Zod.
        </p>
        <p>
          Working with TMDB presented several challenges, such as inconsistently formatted URLs and the absence of WEBP
          image support. To minimize the risk of API call failures, I built custom type-safe fetch utilities and used
          TypeScript guards—paired with an experimental naming convention—for reliable type inference and
          autocompletion. I also optimized data fetching by leveraging sessionStorage to avoid redundant requests. While
          these solutions improved performance and stability, some areas could benefit from further refactoring.
        </p>
        <p>
          The user interface draws inspiration from platforms like Netflix and Prime Video. For trailer playback, I
          integrated the YouTube IFrame Player API, and to enhance the user experience, I developed a custom overlay
          using React-YouTube to match the application’s aesthetic. While YouTube’s recommendation overlays cannot be
          removed, the final implementation maintains a cohesive and visually consistent experience.
        </p>
        <p>
          A significant UI challenge was implementing a responsive carousel with dynamically sized items. Rather than
          relying on JavaScript-heavy solutions, I built a CSS-driven approach using viewport-based calculations and
          custom properties to determine item dimensions. The layout adapts across screen sizes using media queries
          informed by real-world device usage statistics. Custom properties dynamically calculate width-to-height ratios
          and the number of items per page. To support interactivity and synchronize layout logic, I mounted resize
          event listeners and passed computed values through context as dependencies for various components. This
          approach improved performance, reduced layout-related edge cases, and achieved a maintainable balance between
          CSS and JavaScript.
        </p>
        <p>
          To deepen my backend integration experience, I implemented authentication and a modal feature that allows
          users to organize movies into custom collections and queue trailers for sequential viewing. These interactions
          are backed by Firestore for data persistence and real-time updates. Rather than using drag-and-drop libraries
          like dndkit or relying on HTML5’s native draggable attributes, I chose to build the drag-and-drop
          functionality from scratch to better understand the underlying mechanics. This involved managing native drag
          events, calculating distances, handling complex state transitions, and resolving race conditions. A limitation
          to this approach is reduced accessibility—due to the deprecation of ARIA support for draggable elements, full
          WAI-ARIA compliance is not fully achievable.
        </p>
        <p>
          Finally, the project offered a chance to refine my CSS animation and transition skills. I optimized
          stylesheets, explored advanced animation properties, and ensured smooth visual transitions across devices,
          contributing to a polished and responsive user experience.
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
