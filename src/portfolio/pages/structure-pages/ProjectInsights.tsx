import { Dispatch, SetStateAction } from 'react';
import { projectDatabase } from '../../assets/data/project-database/projectDatabase';

type PropDrillType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const ProjectInsights = ({ projectSlideIndex, setProjectSlideIndex, featureState, setFeatureState }: PropDrillType) => {
  /** JSX */
  return (
    <section className='projectDetails'>
      <section className='projectDetails__header'>
        <h2>Project Insights Navigation Links</h2>
        <nav className='projectDetails__header__nav' aria-labelledby='insights-navigation'>
          <div className='projectDetails__header__nav__left'>
            <button id='insights-navigation' aria-label='Return to Project Hub' onClick={() => setFeatureState({ ...featureState, projectDetailsActive: false })}>
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                  <path fill='#ffffff' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'></path>
                </svg>{' '}
                Project Hub
              </span>
            </button>
          </div>
          <div className='projectDetails__header__nav__right'>
            <button
              id='insights-navigation'
              aria-label='View previous project insights'
              onClick={() => setProjectSlideIndex((state) => (state === 0 ? projectDatabase.length - 1 : state - 1))}>
              <span>
                <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                  <path fill='#ffffff' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'></path>
                </svg>
                Previous
              </span>
            </button>
            <button
              id='insights-navigation'
              aria-label='View next project insights'
              onClick={() => setProjectSlideIndex((state) => (state === projectDatabase.length - 1 ? 0 : state + 1))}>
              <span>
                Next{' '}
                <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                  <path fill='#ffffff' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'></path>
                </svg>
              </span>
            </button>
          </div>
        </nav>
      </section>

      <article className='projectDetails__insights'>
        <section className='projectDetails__insights__technology'>
          <div className='projectDetails__insights__technology__container'>
            <h2>Technology</h2>
            {Object.entries(projectDatabase[projectSlideIndex].technologies).map(([category, techArray]) => (
              <section className='projectDetails__insights__technology__container__tech' key={category}>
                <h3 className='projectDetails__insights__technology__container__tech--key'>{category.replace('_', ' ')}</h3>
                <ul className='projectDetails__insights__technology__container__tech__values'>
                  {techArray.map((technology: string) => (
                    <li key={`${category}-${technology}`}>
                      <abbr className='projectDetails__insights__technology__container__tech__values--value' title={``}>
                        {technology}{' '}
                      </abbr>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        </section>

        <section className='projectDetails__insights__project'>
          <article className='projectDetails__insights__project__article'>{projectDatabase[projectSlideIndex].insights}</article>
        </section>
      </article>
    </section>
  );
};

export default ProjectInsights;
