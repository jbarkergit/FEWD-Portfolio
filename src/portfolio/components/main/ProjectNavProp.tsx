import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type ProjectNavPropType = {
  slide: string;
  webm: string;
  projectName: string;
  projectType: string;
  dataStatus: string;
  documentationLink?: string;
  demoLink?: string;
  dataActivity: string;
  addToRefs: (reference: HTMLElement) => void;
};

const ProjectNavProp = ({
  slide,
  webm,
  projectName,
  projectType,
  dataStatus,
  documentationLink,
  demoLink,
  dataActivity,
  addToRefs,
}: ProjectNavPropType): JSX.Element => {
  const sliderArticleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sliderArticleRef.current) {
      addToRefs(sliderArticleRef.current);
    }
  }, [addToRefs]);

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
          {documentationLink ? (
            <Link to={documentationLink} target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.25 9A6.75 6.75 0 0 1 8 2.25h4a6.75 6.75 0 0 1 0 13.5h-2a.75.75 0 0 1 0-1.5h2a5.25 5.25 0 1 0 0-10.5H8a5.25 5.25 0 0 0-3.913 8.75a.75.75 0 0 1-1.118 1A6.728 6.728 0 0 1 1.25 9ZM12 9.75a5.25 5.25 0 1 0 0 10.5h4a5.25 5.25 0 0 0 3.913-8.75a.75.75 0 1 1 1.118-1A6.75 6.75 0 0 1 16 21.75h-4a6.75 6.75 0 0 1 0-13.5h2a.75.75 0 0 1 0 1.5h-2Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              {'Documentation'}
            </Link>
          ) : null}
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
        <picture data-activity={dataActivity}>{webm ? <video src={webm} /> : null}</picture>
      </div>
    </article>
  );
};

export default ProjectNavProp;
