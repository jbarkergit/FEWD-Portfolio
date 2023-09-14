import EcommerceTechStack from './EcommerceTechStack';

const EcommerceAbridgedInfo = (): JSX.Element => {
  return (
    <article className='projectDetails__projectSummary'>
      <h2>Ecommerce Project Summary</h2>
      <EcommerceTechStack />
      <section className='projectDetails__projectSummary__information'>
        <p>
          <span>Objective</span>
          <br />
          Establish a strong foundation in building dynamic web applications through iterative processes, emphasizing problem-solving skills and critical thinking.
        </p>
        <p>
          <span>Key Highlights</span>
          <br />
          Conceptualization: Inspired by React Native behaviors and code splitting methodology, utilized a single useState hook to handle navigation and data
          filtering to force a deeper understanding of React development and optimizing performance.
        </p>
        <p>
          <span>Challenges</span>
          <br />
          Addressed data persistence challenges across various pages, including individual product category and filtered pages. Managed React Router Dom routes by
          mapping unique sets of companies, product categories, and styles. Identified and managed rerenders and side effects. Refactored component architecture
          until performance was satisfactory. Minimalized logic by adopting constructor patterns. Centering divs.
        </p>
        <p>
          <span>Best Practices</span>
          <br />
          Adopted DRY and BEM methodology, componentization, opinionated file structuring, efficient prop drilling, reusable components and lazy loading. Overall
          refining my understanding of opinionated rules, and honed in on problem-solving skills opposed to memorizing solutions.
        </p>
        <p>
          <span>Performance</span>
          <br />
          Implemented Intersectional Observer API for optimized re-renders via useState. Utilized constructor pattern for reusable product filter components.
          Carefully opted-in to React's performance hooks such as useCallback and useMemo. Used data fallbacks in the event that functions failed to fire or return
          through use of undefined checks and conditional rendering.
        </p>
        <p>
          <span>Shopping Cart Functionality</span>
          <br />
          Employed React's useReducer and local storage for data persistence across page loads.
        </p>
        <p>
          <span>User Experience</span>
          <br />
          Fused design styles from various sources. Achieved a balanced blend of personal ideas and established style structures. Didn't aim to re-invent the wheel,
          nor make anything grand and unique; rather, learn.
        </p>
        <p>
          <span>Learning Journey</span>
          <br />
          Focused on understanding how to tackle issues rather than memorizing solutions. Dedicated to ongoing growth and expansion of knowledge, with a plan to
          explore JavaScript concepts and backend development.
        </p>
      </section>
    </article>
  );
};

export default EcommerceAbridgedInfo;
