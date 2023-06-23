import { useEffect, useRef } from 'react';

const Carousel = () => {
  const CarouselSlides = () => {
    type carouselPropTypes = { carouselImg: string; carouselAlt: string; carouselActivity: string };

    const CarouselProps = ({ carouselImg, carouselAlt, carouselActivity }: carouselPropTypes) => {
      const trackSlide = useRef<HTMLPictureElement>(null!);
      let userMouseDown = useRef<boolean>(false),
        userMouseMove = useRef<boolean>(false);

      useEffect(() => {
        const onMouseDown = () => {
          userMouseDown.current = true;
          userMouseMove.current = false;
        };
        const onMouseMove = () => {
          if (!userMouseDown.current) return;
          userMouseMove.current = true;
        };
        const onMouseLeave = () => {
          userMouseDown.current = false;
          userMouseMove.current = false;
        };
        const onMouseUp = (e: MouseEvent) => {
          const target = e.currentTarget as HTMLElement;
          userMouseDown.current = false;
          if (!userMouseMove.current)
            target.classList[1].includes('active') ? target.classList.replace('active', 'disabled') : target.classList.replace('disabled', 'active');
          return;
        };

        trackSlide.current?.addEventListener('mousedown', onMouseDown);
        trackSlide.current?.addEventListener('mousemove', onMouseMove);
        trackSlide.current?.addEventListener('mouseleave', onMouseLeave);
        trackSlide.current?.addEventListener('mouseup', onMouseUp);

        const componentWillUnmount = () => {
          trackSlide.current?.removeEventListener('mousedown', onMouseDown);
          trackSlide.current?.removeEventListener('mousemove', onMouseMove);
          trackSlide.current?.removeEventListener('mouseleave', onMouseLeave);
          trackSlide.current?.removeEventListener('mouseup', onMouseUp);
        };

        return componentWillUnmount;
      }, []);

      return (
        <picture className={`carousel__track__slide ${carouselActivity}`} ref={trackSlide}>
          <img src={carouselImg} alt={carouselAlt} loading="lazy" decoding="async" fetchpriority="low" />
        </picture>
      );
    };

    return (
      <>
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/bernin-uben-tioYUDleMjg-unsplash.jpg"
          carouselAlt="Slide A"
          carouselActivity="active"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/blocks-T3mKJXfdims-unsplash.jpg"
          carouselAlt="Slide B"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/erwi-AJ3r-NL28PI-unsplash.jpg"
          carouselAlt="Slide C"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/jukka-aalho-OaPksPcVp50-unsplash.jpg"
          carouselAlt="Slide D"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/norman-hermle-1Zfo0Aj3OZI-unsplash.jpg"
          carouselAlt="Slide E"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/obafemi-moyosade-zndslHAXhAw-unsplash.jpg"
          carouselAlt="Slide F"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/zac-bromell-e2ETjLSj940-unsplash.jpg"
          carouselAlt="Slide G"
          carouselActivity="disabled"
        />
      </>
    );
  };
  const carouselTrack = useRef<HTMLDivElement>(null!),
    carousel = useRef<HTMLDivElement>(null!),
    userMouseDown = useRef<boolean>(false),
    xCoordinates = useRef<{
      initialX: number;
      finalX: number;
    }>({
      initialX: 0,
      finalX: 0,
    });

  useEffect(() => {
    if (!carousel.current || !carouselTrack.current) return;

    const onMouseDown = (e: MouseEvent) => {
      userMouseDown!.current = true;
      xCoordinates!.current.initialX = e.clientX;
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!userMouseDown!.current) {
        return;
      } else {
        const nextX = e.clientX - xCoordinates!.current.initialX + xCoordinates!.current.finalX;
        carouselTrack!.current.style.left = `${nextX}px`;
      }
    };
    const onMouseUp = (e: MouseEvent) => {
      userMouseDown.current = false;
      xCoordinates.current.finalX = carouselTrack?.current.offsetLeft;
    };

    carouselTrack.current?.addEventListener('mousedown', onMouseDown);
    carousel.current?.addEventListener('mousemove', onMouseMove);
    carousel.current?.addEventListener('mouseleave', onMouseUp);
    carouselTrack.current?.addEventListener('mouseup', onMouseUp);

    const componentWillUnmount = () => {
      carouselTrack.current?.removeEventListener('mousedown', onMouseDown);
      carousel.current?.removeEventListener('mouseleave', onMouseUp);
      carousel.current?.removeEventListener('mousemove', onMouseMove);
      carouselTrack.current?.removeEventListener('mouseup', onMouseUp);
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
