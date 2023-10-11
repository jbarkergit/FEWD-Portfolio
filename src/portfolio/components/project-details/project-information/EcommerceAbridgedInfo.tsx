import { Dispatch, SetStateAction } from 'react';
import EcommerceTechStack from '../tech-stack/EcommerceTechStack';
import RequestInformationStyle from './RequestInformationStyle';

type EcommerceProjectInfoType = {
  projectDetail: string;
  setProjectDetail: Dispatch<SetStateAction<string>>;
};

const EcommerceAbridgedInfo = ({ projectDetail, setProjectDetail }: EcommerceProjectInfoType): JSX.Element => {
  return (
    <article className='projectDetails__projectSummary'>
      <h2>Ecommerce Project Summary</h2>
      <RequestInformationStyle projectDetail={projectDetail} setProjectDetail={setProjectDetail} />
      <EcommerceTechStack />
      <section className='projectDetails__projectSummary__information'>
        <p>
          <span>Objective</span>
          <br />
          Establish a strong foundation in building dynamic web applications through iterative processes, emphasizing problem-solving skills and critical thinking.
          Refine my understanding of opinionated rules, and hone in on problem-solving skills opposed to memorizing solutions.
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
          Addressed data persistence challenges across various pages, including individual product categories for filtering features and filtered pages. Managed
          React Router Dom routes by mapping unique sets of companies, product categories, and styles. Identified and managed rerenders and side effects. Refactored
          component architecture until performance was satisfactory. Minimalized logic by adopting constructor patterns. Centering divs.
        </p>
        <p>
          <span>Best Practices</span>
          <br />
          Adopted DRY and BEM methodology, componentization and opinionated file structuring guidelines, documentation for code legibility and maintenance alongside
          explicit variable naming, lazy loading, font loading optimization and my own opinionated prop drilling limititations - Three components deep if file
          structure is organized, else restructuring and optimization will ensue for code organization and readability. Used data fallbacks in the event that
          functions failed to fire or return through use of undefined checks and conditional rendering.
        </p>
        <p>
          <span>Performance</span>
          <br />
          Implemented Intersectional Observer API and utilized useState setter rerenders for optimized infinite scroll querying to avoid third party libraries or
          "tech debt". Utilized constructor pattern for reusable product filter components. Carefully opted-in to React's performance hooks such as useCallback and
          useMemo. Avoided JavaScript animation entirely and refactored every function where possible to reduce logic in an effort to reduce bloat.
        </p>
        <p>
          <span>Shopping Cart Functionality</span>
          <br />
          Employed React's useReducer to handle product logic and local storage for data persistence across page loads.
        </p>
        <p>
          <span>User Experience</span>
          <br />
          Achieved a balanced blend of personal design conceptualization and pre-existing, established style structures from various sources. Didn't aim to re-invent
          the wheel, nor make anything grand and unique; rather, learn.
        </p>
        <p>
          <span>Learning Journey</span>
          <br />
          Focused on understanding <i>how</i>to tackle pending problems opposed to <i>memorizing</i> solutions. I am dedicated to pursuing personal growth in this
          industry and expanding upon my knowledge. As of now, I am exploring advanced JavaScript concepts and eventually, hope to expand into backend development.
        </p>
      </section>
    </article>
  );
};

export default EcommerceAbridgedInfo;
