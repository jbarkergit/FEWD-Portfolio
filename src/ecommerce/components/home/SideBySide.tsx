const SideBySide = () => {
  return (
    <article className="sideBySide">
      <div className="sideBySide__information">
        <h4>Satisfaction Guaranteed</h4>
        <h2>Superior Audio Backed by Groundbreaking Tech</h2>
        <p>
          From design to manufactoring, our supporting companies offer nothing but the most innovative audio equipment. Lighter membranes, concentrated air gaps,
          acoustic transducer designs, precision fabric and full metal housings. We can assure even the most particular audiophile will be satisfied with our HiFi
          gear.
        </p>
      </div>
      <aside className="sideBySide__video">
        <video
          id="projects__demo-1"
          preload="none"
          autoPlay
          loop
          muted
          src="src/ecommerce/assets/production-videos/stockfootagesplice.webm"
          aria-label="Video of joyful people wearing headphones listening to music"
        />
      </aside>
    </article>
  );
};

export default SideBySide;
