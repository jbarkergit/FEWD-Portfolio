import { Dispatch, SetStateAction, useEffect, useRef } from 'react';

type ProjectNavPropType = {
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

const ProjectNavProp = ({ imgSrc, dataStatus, dataActivity, addToRefs }: ProjectNavPropType): JSX.Element => {
  const sliderArticleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sliderArticleRef.current) addToRefs(sliderArticleRef.current);
  }, [addToRefs]);

  return (
    <article className="mainContent__article" data-status={dataStatus} ref={addToRefs}>
      <div className="mainContent__article__pictureWrapper">
        <picture data-activity={dataActivity}>
          {imgSrc ? <img src={imgSrc} alt="" draggable="false" loading="lazy" decoding="async" fetchpriority="high" /> : null}
        </picture>
      </div>
    </article>
  );
};

export default ProjectNavProp;
