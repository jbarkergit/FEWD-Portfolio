import { useState, Dispatch, SetStateAction, useEffect, useRef } from 'react';
import TechStackIcons from './TechStackIcons';
import TechStackInformation from './TechStackInformation';

//Prop drill from Page/Portfolio
type TechStackType = {
  techStackActive: boolean;
  setTechStackActive: Dispatch<SetStateAction<boolean>>;
};

const EcommerceTechStack = ({ techStackActive, setTechStackActive }: TechStackType) => {
  // GROUPED STATE: button attr data-status && techStackHero image, active technology information
  const [activeTechnology, setActiveTechnology] = useState<keyof typeof TechStackIcons>('nodejs');

  // ActiveTechnology setter assistant
  const technologySetterType = (e: PointerEvent) => (e.currentTarget as HTMLButtonElement)?.id as keyof typeof TechStackIcons;

  //** */
  // Seperate state as an animation trigger (by-pass conditional rendering issues)
  const [triggerAnim, setTriggerAnim] = useState<boolean>(false);
  // TriggerAnim state setter
  useEffect(() => setTriggerAnim(techStackActive), [techStackActive]);

  // Attribute Setter: ref data-status && techStackActive false boolean setter
  useEffect(() => {
    if (triggerAnim) {
      setTriggerAnim(true);
    } else {
      setTimeout(() => setTechStackActive(false), 260);
      setTriggerAnim(false);
    }
  }, [triggerAnim]);
  //** */

  // Component Render
  if (techStackActive)
    return (
      <div id='techStackWrapper' data-status={triggerAnim ? 'active' : 'false'}>
        <section className='techStackSelection' data-status={triggerAnim ? 'active' : 'false'}>
          {TechStackInformation.map((technology) => (
            <button
              key={technology.id}
              id={technology.id}
              aria-label={technology.name}
              onClick={(e) => setActiveTechnology(technologySetterType(e as unknown as PointerEvent))}
              data-status={activeTechnology === `${technology.id}` ? 'active' : 'false'}>
              {TechStackIcons[technology.id as keyof typeof TechStackIcons]}
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
        </section>
        <section className='techStackHero'>
          <picture>{TechStackIcons[activeTechnology]}</picture>
        </section>
        <section className='techStackInformation'>
          <article>
            <h2>{TechStackInformation.find((technology) => technology.id === activeTechnology)?.name}</h2>
            <p>{TechStackInformation.find((technology) => technology.id === activeTechnology)?.description}</p>
          </article>
        </section>
      </div>
    );
};
export default EcommerceTechStack;
