import { useState } from 'react';
import Skills from '../../assets/data/Skills';

let activeIndex: number = 0; //document.getElementsByClassName('skills__wrapper__icon')[0];

const DevInfo = () => {
  const [detail, setDetail]: any = useState('My name is');
  let [name, setName]: any = useState('Justin Barker');
  const [description, setDescription]: any =
    useState(`I'm a front end web developer. I build dynamic, responsive and feature rich web applications that handle complex
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
    <article className="flexBox flexColumn justifyCenter" id="developerIntroduction" aria-label="Developer Introduction">
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

      <div className="skills flexBoxY justifyStart">
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="developer" role="tab" tabIndex={6} data-status="active" data-num="0" onClick={getSkill}>
            <i className="fa-brands fa-dev" aria-label="Justin Barker"></i>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="html5" role="tab" tabIndex={6} data-status="inactive" data-num="1" onClick={getSkill}>
            <i className="fa-brands fa-html5" aria-label="HyperText Markup Language 5"></i>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="css3" role="tab" tabIndex={7} data-status="inactive" data-num="2" onClick={getSkill}>
            <i className="fa-brands fa-css3-alt" aria-label="Cascading Style Sheets 3"></i>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="sass" role="tab" tabIndex={8} data-status="inactive" data-num="3" onClick={getSkill}>
            <i className="fa-brands fa-sass" aria-label="Syntactically Awesome Stylesheet Preprocessor"></i>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="javascript" role="tab" tabIndex={9} data-status="inactive" data-num="4" onClick={getSkill}>
            <i className="fa-brands fa-square-js" aria-label="JavaScript"></i>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="typescript" role="tab" tabIndex={9} data-status="inactive" data-num="5" onClick={getSkill}>
            <svg className="skillTypescript" fill="none" height="26" viewBox="0 0 27 26" width="27" xmlns="http://www.w3.org/2000/svg" aria-label="TypeScript">
              <path
                clipRule="evenodd"
                d="m.98608 0h24.32332c.5446 0 .9861.436522.9861.975v24.05c0 .5385-.4415.975-.9861.975h-24.32332c-.544597 0-.98608-.4365-.98608-.975v-24.05c0-.538478.441483-.975.98608-.975zm13.63142 13.8324v-2.1324h-9.35841v2.1324h3.34111v9.4946h2.6598v-9.4946zm1.0604 9.2439c.4289.2162.9362.3784 1.5218.4865.5857.1081 1.2029.1622 1.8518.1622.6324 0 1.2331-.0595 1.8023-.1784.5691-.1189 1.0681-.3149 1.497-.5879s.7685-.6297 1.0187-1.0703.3753-.9852.3753-1.6339c0-.4703-.0715-.8824-.2145-1.2365-.1429-.3541-.3491-.669-.6186-.9447-.2694-.2757-.5925-.523-.9692-.7419s-.8014-.4257-1.2743-.6203c-.3465-.1406-.6572-.2771-.9321-.4095-.275-.1324-.5087-.2676-.7011-.4054-.1925-.1379-.3409-.2838-.4454-.4379-.1045-.154-.1567-.3284-.1567-.523 0-.1784.0467-.3392.1402-.4824.0935-.1433.2254-.2663.3959-.369s.3794-.1824.6269-.2392c.2474-.0567.5224-.0851.8248-.0851.22 0 .4523.0162.697.0486.2447.0325.4908.0825.7382.15.2475.0676.4881.1527.7218.2555.2337.1027.4495.2216.6475.3567v-2.4244c-.4015-.1514-.84-.2636-1.3157-.3365-.4756-.073-1.0214-.1095-1.6373-.1095-.6268 0-1.2207.0662-1.7816.1987-.5609.1324-1.0544.3392-1.4806.6203s-.763.6392-1.0104 1.0743c-.2475.4352-.3712.9555-.3712 1.5609 0 .7731.2268 1.4326.6805 1.9785.4537.546 1.1424 1.0082 2.0662 1.3866.363.146.7011.2892 1.0146.4298.3134.1405.5842.2865.8124.4378.2282.1514.4083.3162.5403.4946s.198.3811.198.6082c0 .1676-.0413.323-.1238.4662-.0825.1433-.2076.2676-.3753.373s-.3766.1879-.6268.2473c-.2502.0595-.5431.0892-.8785.0892-.5719 0-1.1383-.0986-1.6992-.2959-.5608-.1973-1.0805-.4933-1.5589-.8879z"
                fill="var(--faColor)"
                fillRule="evenodd"
              ></path>
            </svg>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="nodejs" role="tab" tabIndex={10} data-status="inactive" data-num="6" onClick={getSkill}>
            <i className="fa-brands fa-node" id="nodejs" aria-label="Node.js Runtime Environment"></i>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="npm" role="tab" tabIndex={11} data-status="inactive" data-num="7" onClick={getSkill}>
            <i className="fa-brands fa-npm" aria-label="Node Package Manager"></i>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="vite" role="tab" tabIndex={12} data-status="inactive" data-num="8" onClick={getSkill}>
            <img src="src/portfolio/assets/images/svg/ViteLogo.svg" alt="Vite" aria-label="Vite" className="--vite" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="vitest" role="tab" tabIndex={12} data-status="inactive" data-num="9" onClick={getSkill}>
            <img src="src/portfolio/assets/images/svg/VitestLogo.svg" alt="Vitest" aria-label="Vitest" className="--vitest" />
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="react" role="tab" tabIndex={12} data-status="inactive" data-num="10" onClick={getSkill}>
            <i className="fa-brands fa-react" aria-label="React"></i>
          </button>
        </span>
        <span className="skills__wrapper">
          <button className="skills__wrapper__icon" id="github" role="tab" tabIndex={13} data-status="inactive" data-num="11" onClick={getSkill}>
            <i className="fa-brands fa-square-github" aria-label="GitHub"></i>
          </button>
        </span>
      </div>
    </article>
  );
};

export default DevInfo;
