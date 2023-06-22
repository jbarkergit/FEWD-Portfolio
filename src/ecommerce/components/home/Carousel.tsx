import { useEffect, useRef } from 'react';

const Carousel = () => {
  const carouselTrack = useRef<HTMLDivElement>(null!);

  const CarouselSlides = () => {
    type carouselPropTypes = { carouselImg: string; carouselAlt: string };

    const CarouselProps = ({ carouselImg, carouselAlt }: carouselPropTypes) => {
      return (
        <picture className={`carousel__track__slide`} onClick={(e) => {}}>
          <img src={carouselImg} alt={carouselAlt} loading="lazy" decoding="async" fetchpriority="low" />
        </picture>
      );
    };

    return (
      <>
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/bernin-uben-tioYUDleMjg-unsplash.jpg"
          carouselAlt="Slide A"
        />
        <CarouselProps carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/blocks-T3mKJXfdims-unsplash.jpg" carouselAlt="Slide B" />
        <CarouselProps carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/erwi-AJ3r-NL28PI-unsplash.jpg" carouselAlt="Slide C" />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/jukka-aalho-OaPksPcVp50-unsplash.jpg"
          carouselAlt="Slide D"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/norman-hermle-1Zfo0Aj3OZI-unsplash.jpg"
          carouselAlt="Slide E"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/obafemi-moyosade-zndslHAXhAw-unsplash.jpg"
          carouselAlt="Slide F"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/zac-bromell-e2ETjLSj940-unsplash.jpg"
          carouselAlt="Slide G"
        />
      </>
    );
  };

  const carousel = useRef<HTMLDivElement>(null!),
    userMouseDown = useRef<boolean>(false),
    xCoordinates = useRef<{
      initialX: number;
      finalX: number;
    }>({
      initialX: 0,
      finalX: 0,
    });

  useEffect(() => {
    let ca = carousel.current,
      cT = carouselTrack.current,
      uMD = userMouseDown.current,
      xC = xCoordinates.current;

    if (!cT || !ca) return;
    const box = cT;
    const container = ca;

    const onMouseDown = (e: MouseEvent) => {
      uMD = true;
      xC.initialX = e.clientX;
    };

    const onMouseUp = (e: MouseEvent) => {
      uMD = false;
      xC.finalX = box.offsetLeft;
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!uMD) return;
      const nextX = e.clientX - xC.initialX + xC.finalX;
      box.style.left = `${nextX}px`;
    };

    box.addEventListener('mousedown', onMouseDown);
    box.addEventListener('mouseup', onMouseUp);
    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseUp);

    const componentWillUnmount = () => {
      box.removeEventListener('mousedown', onMouseDown);
      box.removeEventListener('mouseup', onMouseUp);
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseUp);
    };

    return componentWillUnmount;
  }, []);

  return (
    <section>
      <section className="carousel__heading">
        <h2>
          Audio equipment for <span className="highlight">every</span> setting and <span className="highlight">every</span> environment
        </h2>
      </section>
      <section className="carousel" ref={carousel}>
        <div className="carousel__track" ref={carouselTrack}>
          <CarouselSlides />
          <CarouselSlides />
        </div>
        <div className="carousel__navigation">
          <button>
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>
          <button>
            <i className="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
      </section>
    </section>
  );
};

export default Carousel;
