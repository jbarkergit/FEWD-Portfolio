import { Link } from 'react-router-dom';

type ProjectNavPropsType = {
  linkTo: string;
  imgSrc: string;
  projectName: string;
  projectType: string;
};

const ProjectNavProps = ({ linkTo, imgSrc, projectName, projectType }: ProjectNavPropsType): JSX.Element => {
  return (
    <Link to={linkTo} className="portFooter__projects">
      <article>
        <picture>
          <img src={imgSrc} alt="" draggable="false" loading="lazy" decoding="async" fetchpriority="high" />
        </picture>
        <hgroup>
          <h3>{projectType}</h3>
          <h2>{projectName}</h2>
        </hgroup>
      </article>
    </Link>
  );
};

export default ProjectNavProps;
