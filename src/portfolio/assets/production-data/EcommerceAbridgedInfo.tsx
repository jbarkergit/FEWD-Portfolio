const EcommerceAbridgedInfo = (): JSX.Element => {
  return (
    <article className='projectDetails__projectSummary'>
      <details>
        <h2>Ecommerce Project Summary</h2>
        <h3>Tech Stack: HTML, CSS, SASS, JavaScript, TypeScript, Vite, Vitest, ESLint, Prettier, React, React Router DOM</h3>
        <p>
          Objective: Establish a strong foundation in building dynamic web applications through iterative processes, emphasizing problem-solving skills and critical
          thinking.
        </p>
        <p>Key Highlights:</p>
        <p>
          Conceptualization: Inspired by React Native behaviors and code splitting methodology, utilized a single useState hook to handle navigation and data
          filtering to force a deeper understanding of React development and optimizing performance.
        </p>
        <p>
          Challenges: Addressed data persistence challenges across various pages, including individual product category and filtered pages. Managed React Router Dom
          routes by mapping unique sets of companies, product categories, and styles. Identified and managed rerenders and side effects. Refactored component
          architecture until performance was satisfactory. Minimalized logic by adopting constructor patterns. Centering divs.
        </p>
        <p>
          Best Practices: Adopted DRY and BEM methodology, componentization, opinionated file structuring, efficient prop drilling, reusable components and lazy
          loading. Overall refining my understanding of opinionated rules, and honed in on problem-solving skills opposed to memorizing solutions.
        </p>
        <p>
          Performance: Implemented Intersectional Observer API for optimized re-renders via useState. Utilized constructor pattern for reusable product filter
          components. Carefully opted-in to React's performance hooks such as useCallback and useMemo. Used data fallbacks in the event that functions failed to fire
          or return through use of undefined checks and conditional rendering.
        </p>
        <p> Shopping Cart Functionality: Employed React's useReducer and local storage for data persistence across page loads.</p>
        <p>
          User Experience: Fused design styles from various sources. Achieved a balanced blend of personal ideas and established style structures. Didn't aim to
          re-invent the wheel, nor make anything grand and unique; rather, learn.
        </p>
        <p>
          Learning Journey: Focused on understanding how to tackle issues rather than memorizing solutions. Dedicated to ongoing growth and expansion of knowledge,
          with a plan to explore JavaScript concepts and backend development.
        </p>
      </details>
    </article>
  );
};

export default EcommerceAbridgedInfo;
