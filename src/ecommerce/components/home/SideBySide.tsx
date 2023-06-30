const SideBySide = () => {
  return (
    <article className="sideBySide">
      <div className="sideBySide__information">
        <h4>
          <span className="highlight">Satisfaction Guaranteed</span>
        </h4>
        <h2>Superior Audio Backed by Groundbreaking Tech</h2>
        <p>
          From design to manufactoring, our supporting companies offer nothing but the most innovative audio equipment. Lighter membranes, concentrated air gaps,
          acoustic transducer designs, precision fabric and full metal housings. We can assure even the most particular audiophile will be satisfied with our HiFi
          gear.
        </p>
      </div>
      <div className="sideBySide__minis">
        <picture>
          <img
            src="/src/ecommerce/assets/production-images/compressed-home-page/side-by-side/beyerdynamic-tesla-driver.png.jpg"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
        </picture>
        <picture>
          <img
            src="/src/ecommerce/assets/production-images/compressed-home-page/side-by-side/beyerdynamic-full-metal-housing.jpg"
            loading="lazy"
            decoding="async"
            fetchpriority="low"
          />
        </picture>
      </div>
      <aside className="sideBySide__video">
        <video preload="metadata" playsInline autoPlay loop muted aria-label="Video of joyful people wearing headphones listening to music">
          <source src="/src/ecommerce/assets/production-videos/stockfootagesplice.webm" type="video/webm" />
        </video>
      </aside>
    </article>
  );
};

export default SideBySide;
