import { useState } from 'react';
import Skills from '../../assets/data/Skills';

let activeIndex: number = 0; //document.getElementsByClassName('skills__wrapper__icon')[0];

const DevInfo = () => {
  const [detail, setDetail]: any = useState<string>('My name is');
  let [name, setName]: any = useState<string>('Justin Barker');
  const [description, setDescription]: any =
    useState<string>(`I'm a front end web developer. I build dynamic, responsive and feature rich web applications that handle complex
        interpersonal data and interactions for the end user.`);

  const getSkill = (event: {
    currentTarget: {
      getAttribute: any;
      index?: any;
      id: string;
    };
  }) => {
    // Compares Target.id to Skills array of objects until it finds a match, updates State
    const target: string = event?.currentTarget.id,
      skill = Skills.find((obj) => obj.id === target)!;
    // Updates active Index with Target Index, toggles status
    const targetIndex: number = event.currentTarget.getAttribute('data-num'),
      activeElement: HTMLElement = document.querySelector(`[data-num="${activeIndex}"]`)!,
      nextElement: HTMLElement = document.querySelector(`[data-num="${targetIndex}"]`)!;

    activeElement instanceof HTMLElement ? (activeElement.dataset.status = 'inactive') : console.log(Error());
    setTimeout(() => {
      activeIndex = targetIndex;
      nextElement instanceof HTMLElement ? (nextElement.dataset.status = 'active') : console.log(Error());
      //
      setDetail(skill.detail);
      setName(skill.name);
      setDescription(skill.description);
    }, 50);
  };

  return (
    <article id="developerIntroduction" aria-label="Developer Introduction">
      <h4 id="introduction__name" aria-label={detail}>
        {detail}
      </h4>
      <br />
      <span id="introduction__subName" className="highlight" aria-label={name}>
        <h2>{name}</h2>
      </span>
      <p id="introduction__description" aria-label={description}>
        {description}
      </p>

      <div className="skills">
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="developer" role="tab" tabIndex={6} data-status="active" data-num="0" onClick={getSkill}>
            <img src="src/portfolio/assets/images/fontawesome/skills/fa-dev.svg" alt="Developer" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="html5" role="tab" tabIndex={6} data-status="inactive" data-num="1" onClick={getSkill}>
            <img src="src/portfolio/assets/images/fontawesome/skills/fa-html5.svg" alt="HyperText Markup Language 5" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="css3" role="tab" tabIndex={7} data-status="inactive" data-num="2" onClick={getSkill}>
            <img src="src/portfolio/assets/images/fontawesome/skills/fa-css3-alt.svg" alt="CSS3" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="sass" role="tab" tabIndex={8} data-status="inactive" data-num="3" onClick={getSkill}>
            <img className="--sass" src="src/portfolio/assets/images/fontawesome/skills/fa-sass.svg" alt="Sass" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="javascript" role="tab" tabIndex={9} data-status="inactive" data-num="4" onClick={getSkill}>
            <img src="src/portfolio/assets/images/fontawesome/skills/fa-square-javascript.svg" alt="JavaScript" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="typescript" role="tab" tabIndex={9} data-status="inactive" data-num="5" onClick={getSkill}>
            <img src="/src/portfolio/assets/images/brands/TypeScript.svg" alt="TypeScript" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="nodejs" role="tab" tabIndex={10} data-status="inactive" data-num="6" onClick={getSkill}>
            <img className="--node" src="src/portfolio/assets/images/fontawesome/skills/fa-node.svg" alt="NodeJS" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="npm" role="tab" tabIndex={11} data-status="inactive" data-num="7" onClick={getSkill}>
            <img className="--npm" src="src/portfolio/assets/images/fontawesome/skills/fa-npm.svg" alt="Node Package Manager" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="vite" role="tab" tabIndex={12} data-status="inactive" data-num="8" onClick={getSkill}>
            <img className="--vite" src="src/portfolio/assets/images/brands/ViteLogo.svg" alt="Vite" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="vitest" role="tab" tabIndex={13} data-status="inactive" data-num="9" onClick={getSkill}>
            <img className="--vitest" src="src/portfolio/assets/images/brands/VitestLogo.svg" alt="Vitest" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="react" role="tab" tabIndex={14} data-status="inactive" data-num="10" onClick={getSkill}>
            <img src="src/portfolio/assets/images/fontawesome/skills/fa-react.svg" alt="React" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="github" role="tab" tabIndex={15} data-status="inactive" data-num="11" onClick={getSkill}>
            <img src="src/portfolio/assets/images/fontawesome/skills/fa-square-github.svg" alt="GitHub" />
          </button>
        </span>
      </div>
    </article>
  );
};

export default DevInfo;
