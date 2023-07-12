type ProjectNavPropType = {
  imgSrc: string;
  projectName: string;
  projectType: string;
};

const ProjectNavProp = ({ imgSrc, projectName, projectType }: ProjectNavPropType): JSX.Element => {
  return (
    <article>
      <picture>{imgSrc ? <img src={imgSrc} alt="" draggable="false" loading="lazy" decoding="async" fetchpriority="high" /> : null}</picture>
      <hgroup>
        <h3>{projectType}</h3>
        <h2>{projectName}</h2>
      </hgroup>
    </article>
  );
};

export default ProjectNavProp;
