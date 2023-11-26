import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import TechStackIcons from './components/TechStackIcons';
import TechStackInformation from './components/TechStackInformation';

//Prop drill from pages/Portfolio
type TechStackType = {
  featureState: {
    projectDetailsActive: boolean;
    contactFormActive: boolean;
    techStackActive: boolean;
  };
  setFeatureState: Dispatch<
    SetStateAction<{
      projectDetailsActive: boolean;
      contactFormActive: boolean;
      techStackActive: boolean;
    }>
  >;
};

const EcommerceTechStack = ({ featureState, setFeatureState }: TechStackType) => {
  // GROUPED STATE: button attr data-status && techStackHero image, active technology information
  const [activeTechnologyIndex, setActiveTechnologyIndex] = useState<number>(0);

  // Previously active technology
  const [previouslyActiveTechnology, setPreviouslyActiveTechnology] = useState<number>(activeTechnologyIndex);

  useEffect(() => {
    if (activeTechnologyIndex === 0) {
      setPreviouslyActiveTechnology(activeTechnologyIndex);
    } else {
      setPreviouslyActiveTechnology(activeTechnologyIndex - 1);
    }
  }, [activeTechnologyIndex]);

  // ActiveTechnology (information) setter assistant
  const technologyIndexSetter = (e: PointerEvent) => TechStackInformation.findIndex((techObject) => techObject.id === (e.currentTarget as HTMLButtonElement)?.id);

  //** */ By-pass conditional rendering animation issues
  // Seperate state as an animation trigger
  const [triggerAnim, setTriggerAnim] = useState<boolean>(false);

  // TriggerAnim state setter
  useEffect(() => setTriggerAnim(featureState.techStackActive), [featureState.techStackActive]);

  // Attribute Setter: ref data-status && techStackActive false boolean setter
  useEffect(() => {
    if (triggerAnim) {
      setTriggerAnim(true);
    } else {
      setTimeout(() => setFeatureState({ ...featureState, techStackActive: false }), 260);
      setTriggerAnim(false);
    }
  }, [triggerAnim]);
  //** */

  //** */ By-pass dynamic rendering animation issues for dynamic rendering of Hero Picture && ActiveTechnology info upon action
  const previousTechStackHero = useRef<HTMLPictureElement>(null);
  const techStackHero = useRef<HTMLPictureElement>(null);
  const previousTechStackInfo = useRef<HTMLElement>(null);
  const techStackInfo = useRef<HTMLElement>(null);

  // Component Render
  return (
    <section className='techStack'>
      <h2>Tech Stack</h2>
      <div className='techStack__selection'>
        {TechStackInformation.map((technologyInfo) => (
          <button
            key={technologyInfo.id}
            id={technologyInfo.id}
            aria-label={technologyInfo.name}
            onClick={(e) => setActiveTechnologyIndex(technologyIndexSetter(e as unknown as PointerEvent))}
            data-status={TechStackIcons[activeTechnologyIndex].id === `${technologyInfo.id}` ? 'active' : 'false'}>
            {TechStackIcons[TechStackIcons.findIndex((technologyIcon) => technologyInfo.id === technologyIcon.id)].svg}
          </button>
        ))}
        <button aria-label='Close Tech Stack Modal' onClick={() => setTriggerAnim(false)}>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' id='techStackReturn'>
            <path
              fill='#ffffff'
              fillRule='evenodd'
              d='M12 22c-4.714 0-7.071 0-8.536-1.465C2 19.072 2 16.714 2 12s0-7.071 1.464-8.536C4.93 2 7.286 2 12 2c4.714 0 7.071 0 8.535 1.464C22 4.93 22 7.286 22 12c0 4.714 0 7.071-1.465 8.535C19.072 22 16.714 22 12 22ZM8.97 8.97a.75.75 0 0 1 1.06 0L12 10.94l1.97-1.97a.75.75 0 0 1 1.06 1.06L13.06 12l1.97 1.97a.75.75 0 1 1-1.06 1.06L12 13.06l-1.97 1.97a.75.75 0 1 1-1.06-1.06L10.94 12l-1.97-1.97a.75.75 0 0 1 0-1.06Z'
              clipRule='evenodd'></path>
          </svg>
        </button>
      </div>
      <div className='techStack__hero' data-status={triggerAnim ? 'active' : 'false'}>
        <picture key={TechStackInformation[activeTechnologyIndex].id} ref={previousTechStackHero} data-status={'false'}>
          {TechStackIcons[previouslyActiveTechnology].svg}
        </picture>
        <picture key={TechStackInformation[activeTechnologyIndex].name} ref={techStackHero} data-status={'active'}>
          {TechStackIcons[activeTechnologyIndex].svg}
        </picture>
      </div>
      <div className='techStack__information' data-status={triggerAnim ? 'active' : 'false'}>
        <article ref={previousTechStackInfo} data-status={'false'}>
          <h2>{TechStackInformation[activeTechnologyIndex].name}</h2>
          <p>{TechStackInformation[activeTechnologyIndex].description}</p>
        </article>
        <article ref={techStackInfo} data-status={'active'}>
          <h2>{TechStackInformation[activeTechnologyIndex].name}</h2>
          <p>{TechStackInformation[activeTechnologyIndex].description}</p>
        </article>
      </div>
    </section>
  );
};
export default EcommerceTechStack;
