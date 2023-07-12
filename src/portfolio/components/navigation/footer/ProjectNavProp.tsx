import { Link } from 'react-router-dom';

type ProjectNavPropType = {
  linkTo: string;
  imgSrc: string;
  projectName: string;
  projectType: string;
};

const ProjectNavProp = ({ linkTo, imgSrc, projectName, projectType }: ProjectNavPropType): JSX.Element => {
  return (
    <Link to={linkTo}>
      <article>
        <picture>{imgSrc ? <img src={imgSrc} alt="" draggable="false" loading="lazy" decoding="async" fetchpriority="high" /> : null}</picture>
        <hgroup>
          <h3>{projectType}</h3>
          <h2>{projectName}</h2>
        </hgroup>
      </article>
    </Link>
  );
};

export default ProjectNavProp;
