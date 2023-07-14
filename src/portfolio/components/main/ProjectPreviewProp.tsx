import { Link } from 'react-router-dom';

type ProjectPreviewPropType = {
  h2: string;
  h3: string;
  p: string;
  linkTo: string;
  imgSrc: string;
};

const ProjectPreviewProp = ({ h2, h3, p, linkTo, imgSrc }: ProjectPreviewPropType): JSX.Element => {
  return (
    <article className="projectSlider__projectPreview">
      <hgroup>
        <h3>{h3}</h3>
        <h2>{h2}</h2>
        <p>{p}</p>
      </hgroup>
      <Link to={linkTo}>
        <i className="fa-solid fa-anchor"></i> VIEW DEMO
      </Link>
      <picture>{imgSrc ? <img src={imgSrc} draggable="false" loading="lazy" decoding="async" fetchpriority="high" /> : null}</picture>
    </article>
  );
};

export default ProjectPreviewProp;
