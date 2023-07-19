import { useContext, useRef } from 'react';
import { Link } from 'react-router-dom';

type ProjectNavPropType = {
  slide: string;
  imgSrc: string;
  projectName: string;
  projectType: string;
  imgStyle?: React.CSSProperties;
  dataStatus: string;
  demoLink?: string;
  dataActivity: string;
};

const ProjectNavProp = ({ slide, imgSrc, projectName, projectType, imgStyle, dataStatus, demoLink, dataActivity }: ProjectNavPropType): JSX.Element => {
  const revealRefs = useRef<HTMLElement[]>([]);
  revealRefs.current = [];

  const addToRefs = (elem: HTMLElement) => {
    if (elem && !revealRefs.current.includes(elem)) {
      revealRefs.current.push(elem);
    }
  };

  // const setDataStatus = () => {
  //   const closestIndex = useContext(MainContext);
  //   revealRefs.current.forEach((article, index) => {
  //     if (article) {
  //       const dataStatus = index === closestIndex ? 'enabled' : 'disabled';
  //       article.setAttribute('data-status', dataStatus);
  //     }
  //   });
  // };

  return (
    <article className="sliderArticle" data-status={dataStatus} ref={addToRefs}>
      <div className="sliderArticle__data">
        <div className="sliderArticle__data__left">
          <span className="sliderArticle__data__left__slideNum">{slide}.</span>
          <hgroup>
            <span>
              <h3>{projectType}</h3>
              <h2>{projectName}</h2>
            </span>
          </hgroup>
        </div>
        <div className="sliderArticle__data__liveDemo">
          {demoLink ? (
            <Link to={demoLink} target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.25 9A6.75 6.75 0 0 1 8 2.25h4a6.75 6.75 0 0 1 0 13.5h-2a.75.75 0 0 1 0-1.5h2a5.25 5.25 0 1 0 0-10.5H8a5.25 5.25 0 0 0-3.913 8.75a.75.75 0 0 1-1.118 1A6.728 6.728 0 0 1 1.25 9ZM12 9.75a5.25 5.25 0 1 0 0 10.5h4a5.25 5.25 0 0 0 3.913-8.75a.75.75 0 1 1 1.118-1A6.75 6.75 0 0 1 16 21.75h-4a6.75 6.75 0 0 1 0-13.5h2a.75.75 0 0 1 0 1.5h-2Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {'Open Demo'}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="sliderArticle__pictureWrapper">
        <picture data-activity={dataActivity}>
          {imgSrc ? <img src={imgSrc} alt="" draggable="false" loading="lazy" decoding="async" fetchpriority="high" style={imgStyle} /> : null}
        </picture>
      </div>
    </article>
  );
};

export default ProjectNavProp;
