import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type ProjectNavPropType = {
  slide: string;
  projectName: string;
  extendedInfo?: string;
  abridgedInfo?: string;
  demoLink?: string;
  imgSrc?: string;
  dataStatus: string;
  dataActivity: string;
  addToRefs: (reference: HTMLElement) => void;
  setClosestIndex: Dispatch<SetStateAction<number>>;
  closestIndex: number;
};

const ProjectNavProp = ({
  slide,
  projectName,
  extendedInfo,
  abridgedInfo,
  demoLink,
  imgSrc,
  dataStatus,
  dataActivity,
  addToRefs,
  closestIndex,
  setClosestIndex,
}: ProjectNavPropType): JSX.Element => {
  const sliderArticleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sliderArticleRef.current) addToRefs(sliderArticleRef.current);
  }, [addToRefs]);

  return (
    <article className="mainContent__slider__article" data-status={dataStatus} ref={addToRefs}>
      <section className="mainContent__slider__article__header">
        <h2 style={{ display: 'none' }}>{projectName}</h2>
        <nav>
          {extendedInfo ? <button>Project Overview</button> : null}
          {abridgedInfo ? <button>Project Summary</button> : null}
          {demoLink ? <Link to={demoLink}>Live Demo</Link> : null}
        </nav>
      </section>
      <section className="mainContent__slider__article__pictureWrapper">
        <picture data-activity={dataActivity}>
          {imgSrc ? <img src={imgSrc} alt="" draggable="false" loading="lazy" decoding="async" fetchpriority="high" /> : null}
        </picture>
      </section>
    </article>
  );
};

export default ProjectNavProp;
