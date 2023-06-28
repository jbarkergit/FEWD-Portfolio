type SideBySidePropTypes = { h4: string; h2: string; p: string; videoAriaLabel: string; videoSrc: string };

const SideBySideProps = ({ h4, h2, p, videoAriaLabel, videoSrc }: SideBySidePropTypes) => {
  return (
    <section className="sideBySide">
      <article className="sideBySide__information">
        <h4>{h4}</h4>
        <h2>{h2}</h2>
        <p>{p}</p>
      </article>
      <aside className="sideBySide__video" aria-label={videoAriaLabel}>
        <video id="projects__demo-1" preload="none" autoPlay loop muted src={videoSrc} />
      </aside>
    </section>
  );
};

const SideBySide = () => {
  return (
    <SideBySideProps
      h4="Satisfaction Guaranteed"
      h2="Superior Audio Backed by Groundbreaking Tech"
      p="From design to manufactoring, our supporting companies offer nothing but the most innovative audio equipment. Lighter membranes, concentrated air gaps, acoustic transducer designs, precision fabric and full metal housings. We can assure even the most particular audiophile will be satisfied with our HiFi gear."
      videoSrc="src/ecommerce/assets/production-videos/stockfootagesplice.webm"
      videoAriaLabel="Video of joyful people wearing headphones listening to music"
    />
  );
};

export default SideBySide;
