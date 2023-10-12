import { useState, Dispatch, SetStateAction } from 'react';
import TechStackIcons from './TechStackIcons';
import TechStackInformation from './TechStackInformation';

//Prop drill from Page/Portfolio
type TechStackType = {
  techStackActive: boolean;
  setTechStackActive: Dispatch<SetStateAction<boolean>>;
};

const EcommerceTechStack = ({ techStackActive, setTechStackActive }: TechStackType) => {
  //** */
  // GROUPED STATE: button attr data-status && techStackHero image, active technology information
  const [activeTechnology, setActiveTechnology] = useState<keyof typeof TechStackIcons>('nodejs');

  // activeTechnology setter assistant
  const technologySetterType = (e: PointerEvent) => (e.currentTarget as HTMLButtonElement)?.id as keyof typeof TechStackIcons;
  //** */

  //Component Render
  if (techStackActive === true)
    return (
      <div id='techStackWrapper'>
        <section className='techStackSelection' data-status={techStackActive === true ? 'active' : 'false'}>
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
