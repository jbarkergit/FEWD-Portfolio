import { Dispatch, SetStateAction } from 'react';
import { myProjects } from '../../data/projects/myProjects';

type PropDrillType = {
  projectSlideIndex: number;
  setProjectSlideIndex: Dispatch<SetStateAction<number>>;
  featureState: Record<string, boolean>;
  setFeatureState: Dispatch<SetStateAction<Record<string, boolean>>>;
};

const ProjectDetails = ({ projectSlideIndex, setProjectSlideIndex, featureState, setFeatureState }: PropDrillType) => {
  /** JSX */
  return (
    <section className='projectDetails'>
      <section className='projectDetails__header'>
        <div className='projectDetails__header__left'>
          <button aria-label='Return to Project Hub' onClick={() => setFeatureState({ ...featureState, projectDetailsActive: false })}>
            <span>
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <path fill='#ffffff' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'></path>
              </svg>{' '}
              Project Hub
            </span>
          </button>
        </div>
        <div className='projectDetails__header__right'>
          <button aria-label='View previous project insights' onClick={() => setProjectSlideIndex((state) => (state === 0 ? myProjects.length - 1 : state - 1))}>
            <span>
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <path fill='#ffffff' d='m14 18l-6-6l6-6l1.4 1.4l-4.6 4.6l4.6 4.6z'></path>
              </svg>
              Previous Project
            </span>
          </button>
          <button aria-label='View next project insights' onClick={() => setProjectSlideIndex((state) => (state === myProjects.length - 1 ? 0 : state + 1))}>
            <span>
              Next Project{' '}
              <svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'>
                <path fill='#ffffff' d='M12.6 12L8 7.4L9.4 6l6 6l-6 6L8 16.6z'></path>
              </svg>
            </span>
          </button>
        </div>
      </section>

      <section className='projectDetails__insights'>
        <section className='projectDetails__insights__technology'>
          <div className='projectDetails__insights__technology__container'>
            <h2>Technology</h2>
            {Object.entries(myProjects[projectSlideIndex].technologies).map(([category, techArray]) => (
              <div className='projectDetails__insights__technology__container__tech' key={category}>
                <div className='projectDetails__insights__technology__container__tech--key'>{category.replace('_', ' ')}</div>
                <div className='projectDetails__insights__technology__container__tech__values'>
                  {techArray.map((technology: string) => (
                    <abbr className='projectDetails__insights__technology__container__tech__values--value' title={``} key={`${category}-${technology}`}>
                      {technology}{' '}
                    </abbr>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className='projectDetails__insights__project'>
          <article className='projectDetails__insights__project__article'>{myProjects[projectSlideIndex].insights}</article>
        </section>
      </section>
    </section>
  );
};

export default ProjectDetails;
