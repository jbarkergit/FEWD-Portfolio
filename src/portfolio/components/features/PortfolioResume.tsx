const PortfolioResume = () => {
  return (
    <section className="toggleResume" data-activity="inactive">
      <section className="resume">
        <article className="resume__block">
          <span className="resume__block--header">
            <h5>2015 - 2017</h5>
          </span>
          <span>
            <h2>Education</h2>
          </span>
          <span>
            <p>
              Attended Lamar State College in Port Arthur, TX with a full-ride scholarship provided by Texas Department of Assistive and Rehabilitative Services.
              Focused on core curriculum with intentions to pursue a psychology major. Ceased further education to aid individuals impacted by Hurricane Harvey in
              2017.
            </p>
          </span>
        </article>
        <article className="resume__block">
          <span>
            <h2>Skills & Interests</h2>
          </span>
          <span>
            <p>
              Technologically advanced, problem solver, emotionally intelligent and self driven.
              <br />
              Graphic Design, Video Editing, Audio Engineering and the New York Stock Exchange.
            </p>
          </span>
        </article>
        <div className="resume__navigation">
          <button className="resume__navigation--button">
            <i className="fa-solid fa-chevron-left"></i>
          </button>
          <button className="resume__navigation--button">
            <i className="fa-regular fa-paper-plane"></i>
          </button>
          <button className="resume__navigation--button">
            <i className="fa-solid fa-at"></i>
          </button>
        </div>
      </section>

      <section className="resume">
        <article className="resume__block">
          <span className="resume__block--header">
            <h5>Mane Juice Co., LLC</h5>
            <h5>2018 - 2021</h5>
          </span>
          <span>
            <h2>Sole Proprietor</h2>
          </span>
          <span>
            <p>
              Mane Juice Co. was an ecommerce business providing smoke free alternatives to consumers actively using traditional tobacco products. All business roles
              were solely fulfilled by the proprietor. These roles included, but are not limited to, UI/UX Designer, Front End Web Developer, Business Development
              Executive, Business Relationship Management, Digital Marketing Manager, Sales Executive (SaaS), and Customer Service Management. The business was
              dissolved in 2021 due to Food and Drug Administration regulations and Coronavirus’ business related impacts.
            </p>
          </span>
        </article>
        <article className="resume__block">
          <span className="resume__block--header">
            <h5>{'Colonial Claims (FEMA)'}</h5>
            <h5>2018 - Inactive</h5>
          </span>
          <span>
            <h2>Flood Insurance Claim Adjuster</h2>
          </span>
          <span>
            <p>Evaluated and estimated property damage of insured according to insurance policy, FEMA protocol and guidelines using Xactimate.</p>
          </span>
        </article>
        <article className="resume__block">
          <span className="resume__block--header">
            <h5>{'Administrative Strategies (FEMA)'}</h5>
            <h5>2017 - 2018</h5>
          </span>
          <span>
            <h2>Flood Insurance Claim Adjuster</h2>
          </span>
          <span>
            <p>Evaluated and estimated property damage of insured according to insurance policy, FEMA protocol and guidelines using Xactimate.</p>
          </span>
        </article>
        <article className="resume__block">
          <span>
            <h2>Miscellaneous Work</h2>
          </span>
          <ol>
            <li>
              <h3>{'Web Developer (Freelance)'}</h3>
            </li>
            <li>
              <h3>{'Graphic Design (Freelance)'}</h3>
            </li>
            <li>
              <h3>{'Video Editor (Freelance)'}</h3>
            </li>
            <li>
              <h3>Target Closing Expert</h3>
            </li>
            <li>
              <h3>Children's Summer Camp Assistant</h3>
            </li>
            <li>
              <h3>Independent Janitorial Work</h3>
            </li>
          </ol>
        </article>
      </section>
    </section>
  );
};

export default PortfolioResume;
