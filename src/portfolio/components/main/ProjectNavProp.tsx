import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

type ProjectNavPropType = {
  projectName: string;
  projectInfo?: string;
  demoLink?: string;
  webm?: string;
  dataStatus: string;
  dataActivity: string;
  addToRefs: (reference: HTMLElement) => void;
};

const ProjectNavProp = ({ projectName, projectInfo, demoLink, webm, dataStatus, dataActivity, addToRefs }: ProjectNavPropType): JSX.Element => {
  const sliderArticleRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (sliderArticleRef.current) addToRefs(sliderArticleRef.current);
  }, [addToRefs]);

  return (
    <article className="mainContent__slider__article" data-status={dataStatus} ref={addToRefs}>
      <div className="mainContent__slider__article__info">
        <h2>{projectName}</h2>
        <p>{projectInfo}</p>
        <nav className="mainContent__slider__article__info--nav">
          {demoLink ? (
            <Link to={demoLink} target="_blank">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  fillRule="evenodd"
                  d="M1.25 9A6.75 6.75 0 0 1 8 2.25h4a6.75 6.75 0 0 1 0 13.5h-2a.75.75 0 0 1 0-1.5h2a5.25 5.25 0 1 0 0-10.5H8a5.25 5.25 0 0 0-3.913 8.75a.75.75 0 0 1-1.118 1A6.728 6.728 0 0 1 1.25 9ZM12 9.75a5.25 5.25 0 1 0 0 10.5h4a5.25 5.25 0 0 0 3.913-8.75a.75.75 0 1 1 1.118-1A6.75 6.75 0 0 1 16 21.75h-4a6.75 6.75 0 0 1 0-13.5h2a.75.75 0 0 1 0 1.5h-2Z"
                  clipRule="evenodd"
                ></path>
              </svg>
              Live Demo
            </Link>
          ) : null}
          <Link to="https://github.com/jbarkergit" target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path
                fill="#ffffff"
                fillRule="evenodd"
                d="M11.999 1C5.926 1 1 5.925 1 12c0 4.86 3.152 8.983 7.523 10.437c.55.102.75-.238.75-.53c0-.26-.009-.952-.014-1.87c-3.06.664-3.706-1.475-3.706-1.475c-.5-1.27-1.221-1.61-1.221-1.61c-.999-.681.075-.668.075-.668c1.105.078 1.685 1.134 1.685 1.134c.981 1.68 2.575 1.195 3.202.914c.1-.71.384-1.195.698-1.47c-2.442-.278-5.01-1.222-5.01-5.437c0-1.2.428-2.183 1.132-2.952c-.114-.278-.491-1.397.108-2.91c0 0 .923-.297 3.025 1.127A10.536 10.536 0 0 1 12 6.32a10.49 10.49 0 0 1 2.754.37c2.1-1.424 3.022-1.128 3.022-1.128c.6 1.514.223 2.633.11 2.911c.705.769 1.13 1.751 1.13 2.952c0 4.226-2.572 5.156-5.022 5.428c.395.34.747 1.01.747 2.037c0 1.47-.014 2.657-.014 3.017c0 .295.199.637.756.53C19.851 20.979 23 16.859 23 12c0-6.075-4.926-11-11.001-11"
              ></path>
            </svg>
            View Repo
          </Link>
        </nav>
      </div>
      <div className="mainContent__slider__article__pictureWrapper">
        <picture data-activity={dataActivity}>{webm ? <video src={webm} /> : null}</picture>
      </div>
    </article>
  );
};

export default ProjectNavProp;
