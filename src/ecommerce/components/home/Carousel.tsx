import { useEffect, useRef } from 'react';

const Carousel = () => {
  const CarouselSlides = () => {
    type carouselPropTypes = { carouselImg: string; carouselAlt: string; carouselActivity: string };

    const CarouselProps = ({ carouselImg, carouselAlt, carouselActivity }: carouselPropTypes) => {
      const trackSlide = useRef<HTMLPictureElement>(null!);
      // let userMouseDown = useRef<boolean>(false),
      //   userMouseMove = useRef<boolean>(false);

      // useEffect(() => {
      //   const onMouseDown = () => {
      //     userMouseDown.current = true;
      //     userMouseMove.current = false;
      //   };
      //   const onMouseMove = () => {
      //     if (!userMouseDown.current) return;
      //     userMouseMove.current = true;
      //   };
      //   const onMouseLeave = () => {
      //     userMouseDown.current = false;
      //     userMouseMove.current = false;
      //   };
      //   const onMouseUp = (e: MouseEvent) => {
      //     const target = e.currentTarget as HTMLElement;
      //     userMouseDown.current = false;
      //     if (!userMouseMove.current)
      //       target.classList[1].includes('active') ? target.classList.replace('active', 'disabled') : target.classList.replace('disabled', 'active');
      //     return;
      //   };

      //   trackSlide.current?.addEventListener('mousedown', onMouseDown);
      //   trackSlide.current?.addEventListener('mousemove', onMouseMove);
      //   trackSlide.current?.addEventListener('mouseleave', onMouseLeave);
      //   trackSlide.current?.addEventListener('mouseup', onMouseUp);

      //   const componentWillUnmount = () => {
      //     trackSlide.current?.removeEventListener('mousedown', onMouseDown);
      //     trackSlide.current?.removeEventListener('mousemove', onMouseMove);
      //     trackSlide.current?.removeEventListener('mouseleave', onMouseLeave);
      //     trackSlide.current?.removeEventListener('mouseup', onMouseUp);
      //   };

      //   return componentWillUnmount;
      // }, []);

      return (
        <picture className={`carousel__track__slide ${carouselActivity}`} ref={trackSlide}>
          <img src={carouselImg} alt={carouselAlt} draggable="false" loading="lazy" decoding="async" fetchpriority="low" />
        </picture>
      );
    };

    return (
      <>
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/brian-tromp-rWMAni9akN8-unsplash.jpg"
          carouselAlt="Slide A"
          carouselActivity="active"
        />
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/lena-kudryavtseva-hdODD2TVIlM-unsplash.jpg"
          carouselAlt="Slide B"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/katrina-beachy-c_egiHy2x4Y-unsplash.jpg"
          carouselAlt="Slide C"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/westwind-air-service-LT1WeeVzd6g-unsplash.jpg"
          carouselAlt="Slide D"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/techivation-vVRmYWSWy7A-unsplash.jpg"
          carouselAlt="Slide E"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/rekkr-insitu-black.jpg"
          carouselAlt="Slide F"
          carouselActivity="disabled"
        />
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/soundtrap-uCNrr-3i2oI-unsplash.jpg"
          carouselAlt="Slide G"
          carouselActivity="disabled"
        />
      </>
    );
  };

  const carousel = useRef<HTMLDivElement>(null!),
    carouselTrack = useRef<HTMLDivElement>(null!);

  useEffect(() => {
    if (!carousel || !carouselTrack) return;

    carouselTrack.current.onmousedown = (e: MouseEvent) => {
      carouselTrack.current.dataset.mouseDownAt = `${e.clientX}`;
    };

    carousel.current.onmousemove = (e: MouseEvent) => {
      const mouseDownAt: string = carouselTrack.current?.dataset.mouseDownAt as unknown as string,
        mouseDelta: number = parseFloat(mouseDownAt) - e.clientX,
        maxDelta: number = window.innerWidth / 1.8,
        percentage: number = (mouseDelta / maxDelta) * -100,
        nextPerc: string = carouselTrack.current?.dataset.prevPercentage as unknown as string;
      let nextPercentage: number = parseFloat(nextPerc) + percentage;

      nextPercentage = Math.max(-138, Math.min(0, nextPercentage));

      carouselTrack.current.dataset.percentage = `${nextPercentage}`;

      if (carouselTrack.current.dataset.mouseDownAt === '0') return;
      carouselTrack.current.animate(
        {
          transform: `translateX(${nextPercentage}%)`,
        },
        { duration: 1200, fill: 'forwards' }
      );

      const arrayOfImages: Element[] = Array.from(carouselTrack.current.children);
      arrayOfImages.forEach((el) => {
        el.children[0].animate(
          {
            objectPosition: `${100 + nextPercentage}% center`,
          },
          { duration: 1200, fill: 'both' }
        );
      });
    };

    carouselTrack.current.onmouseup = () => {
      carouselTrack.current.dataset.mouseDownAt = '0';
      carouselTrack.current.dataset.prevPercentage = carouselTrack.current.dataset.percentage;
    };
  }, []);

  return (
    <section>
      <section className="carousel__heading">
        <h2>
          Audio equipment for <span className="highlight">every</span> setting and <span className="highlight">every</span> environment
        </h2>
      </section>
      <section className="carousel" ref={carousel}>
        <div className="carousel__track" ref={carouselTrack} data-mouse-down-at="0" data-prev-percentage="0">
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
