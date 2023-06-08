type SideBySidePropTypes = { h4: string; h2: string; p: string; videoAriaLabel: string; videoSrc: string };

const SideBySideProps = ({ h4, h2, p, videoAriaLabel, videoSrc }: SideBySidePropTypes) => {
  return (
    <section className="sideBySide">
      <article className="sideBySide__information">
        <h4>{h4}</h4>
        <h2>{h2}</h2>
        <p>{p}</p>
      </article>
      <aside className="sideBySide__video flexBox justifyCenter" aria-label={videoAriaLabel}>
        <video id="projects__demo-1" preload="none" autoPlay loop muted src={videoSrc} />
      </aside>
    </section>
  );
};

export default SideBySideProps;
