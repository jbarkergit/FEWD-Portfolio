const SideBySide = (): JSX.Element => {
  return (
    <article className="sideBySide">
      <div className="sideBySide__textArea">
        <h3>
          <span className="highlight">Satisfaction Guaranteed</span>
        </h3>
        <h2>Superior Audio Backed by Groundbreaking Tech</h2>
        <p>
          Our mission at Dynamic Audio is to offer a diverse selection of superior HiFi audio products from renowned brands, to ensure top-notch sound quality for
          all. Our curated collection features high-fidelity headphones crafted by industry-leading manufacturers known for their commitment to excellence. With
          every purchase, enjoy instant satisfaction knowing you're backed by the expertise and craftsmanship of the brands we represent.
        </p>
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
