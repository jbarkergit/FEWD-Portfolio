import { useEffect, useRef } from 'react';

type ProjectNavPropType = {
  imgSrc?: string;
  dataStatus: string;
  addToRefs: (reference: HTMLElement) => void;
};

const ProjectNavProp = ({ imgSrc, dataStatus, addToRefs }: ProjectNavPropType): JSX.Element => {
  const sliderArticleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sliderArticleRef.current) addToRefs(sliderArticleRef.current);
  }, [addToRefs]);

  return (
    <article className='mainContent__article' data-status={dataStatus} ref={addToRefs}>
      <picture>
        <img src={imgSrc} alt='' draggable='false' loading='lazy' decoding='async' fetchpriority='high' />
      </picture>
    </article>
  );
};

export default ProjectNavProp;
