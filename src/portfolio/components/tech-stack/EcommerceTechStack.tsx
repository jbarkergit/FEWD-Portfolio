import { useRef, useState, useEffect, useCallback, Dispatch, SetStateAction } from 'react';
import TechStackIcons from '../../assets/tech-stack/TechStackIcons';
import TechStack from '../../assets/tech-stack/TechStack';

//Prop drill from Portfolio page
type techStackType = {
  techStack: boolean;
  setTechStack: Dispatch<SetStateAction<boolean>>;
};

const EcommerceTechStack = ({ techStack, setTechStack }: techStackType) => {
  //Push every instance of techButtonRef into empty array on mount
  const arrayOfTechButtons = useRef<HTMLButtonElement[]>([]);

  const techButtonRef = useCallback((reference: HTMLButtonElement) => {
    if (reference && !arrayOfTechButtons.current.includes(reference)) arrayOfTechButtons.current.push(reference);
  }, []);

  //Tooltip Ref & State
  const techStackTooltipRef = useRef<HTMLDivElement>(null);
  const [techName, setTechName] = useState<string>('');
  const [techDescription, setTechDescription] = useState<string>('');

  useEffect(() => {
    //Compare target.id to TechStack array of objects until it finds a match, set data
    const userPointerEnter = (e: PointerEvent) => {
      const getTechStackId = TechStack.find((techObject) => techObject.id === (e.target as HTMLButtonElement).id)!;
      setTechName(getTechStackId.name);
      setTechDescription(getTechStackId.description);
      techStackTooltipRef.current?.setAttribute('data-status', 'active'); //Enable tooltip visibility
    };

    //Disable tooltip visibility
    const userPointerLeave = () => techStackTooltipRef.current?.setAttribute('data-status', 'false');

    arrayOfTechButtons.current?.forEach((button) => button.addEventListener('pointerover', userPointerEnter));
    arrayOfTechButtons.current?.forEach((button) => button.addEventListener('pointerleave', userPointerLeave));

    return () => {
      arrayOfTechButtons.current?.forEach((button) => button.removeEventListener('pointerover', userPointerEnter));
      arrayOfTechButtons.current?.forEach((button) => button.removeEventListener('pointerleave', userPointerLeave));
    };
  }, [arrayOfTechButtons.current]);

  //Attach pointer x,y coordinates to techStackTooltipRef
  useEffect(() => {
    const getPointerPos = (e: PointerEvent) => {
      if (techStackTooltipRef.current) {
        techStackTooltipRef.current.style.top = `${e.clientY}px`;
        techStackTooltipRef.current.style.left = `${e.clientX}px`;
      }
    };

    document.addEventListener('pointermove', getPointerPos);
    return () => document.addEventListener('pointermove', getPointerPos);
  }, []);

  //Toggle active buttons
  const [activeTechStackButton, setActiveTechStackButton] = useState<string>('');

  //TechStackHero State for dynamic techStackHero background image rendering
  const [techStackHero, setTechStackHero] = useState<keyof typeof TechStackIcons>('reacttestinglibrary');

  //Dynamically change hero picture && Reduce bloat: copy activeTechStackButton state value over to TechStackHero state value
  useEffect(() => {
    setTechStackHero(activeTechStackButton as keyof typeof TechStackIcons);
  }, [activeTechStackButton]);

  //Component Render
  if (techStack === true)
    return (
      <div id='techStackWrapper'>
        <section className='techStackSelection' data-status={techStack === true ? 'active' : 'false'}>
          <div className='techStackTooltip' ref={techStackTooltipRef} data-status={techStack === true ? 'active' : 'false'}>
            <span>{techName}</span>
            <span>{techDescription}</span>
          </div>

          <button
            id='nodejs'
            aria-label='Node.js Runtime Environment'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'nodejs' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.nodejs}
          </button>

          <button
            id='npm'
            aria-label='Node Package Manager'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'npm' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.npm}
          </button>

          <button
            id='eslint'
            aria-label='ESLint'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'eslint' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.eslint}
          </button>

          <button
            id='prettier'
            aria-label='prettier'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'prettier' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.prettier}
          </button>

          <button
            id='html'
            aria-label='HyperText Markup Language'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'html' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.html}
          </button>

          <button
            id='css'
            aria-label='Cascading Style Sheets'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'css' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.css}
          </button>

          <button
            id='sass'
            aria-label='Syntactically Awesome Stylesheet Preprocessor'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'sass' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.sass}
          </button>

          <button
            id='javascript'
            aria-label='JavaScript'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'javascript' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.javascript}
          </button>

          <button
            id='typescript'
            aria-label='TypeScript'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'typescript' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.typescript}
          </button>

          <button
            id='vite'
            aria-label='Vite'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'vite' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.vite}
          </button>

          <button
            id='vitest'
            aria-label='Vitest'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'vitest' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.vitest}
          </button>

          <button
            id='reacttestinglibrary'
            aria-label='React Testing Library'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'reacttestinglibrary' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.reacttestinglibrary}
          </button>

          <button
            id='react'
            aria-label='React'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'react' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.react}
          </button>

          <button
            id='reactrouterdom'
            aria-label='React Router Dom'
            onClick={(e) => {
              setActiveTechStackButton(e.currentTarget.id);
            }}
            data-status={activeTechStackButton === 'reactrouterdom' ? 'active' : 'false'}
            ref={techButtonRef}>
            {TechStackIcons.reactrouterdom}
          </button>
        </section>
        <section className='techStackHero'>
          <picture>{TechStackIcons[techStackHero as keyof typeof TechStackIcons]}</picture>
        </section>
        <section className='techStackInformation'>
          <article>
            <h2>Lorem.</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas temporibus neque nam quia ab magnam eum quod tempore nulla numquam, voluptas minima
              impedit maiores debitis saepe quos dolores excepturi expedita. Rem, consectetur, esse fugit error, voluptas molestiae porro obcaecati vel provident
              cupiditate ipsum! Quas, excepturi.
            </p>
          </article>
        </section>
      </div>
    );
};
export default EcommerceTechStack;
