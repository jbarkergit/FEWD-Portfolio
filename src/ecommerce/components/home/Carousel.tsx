import { useEffect, useRef } from 'react';

const Carousel = (): JSX.Element => {
  const carousel = useRef<HTMLDivElement>(null!),
    carouselTrack = useRef<HTMLDivElement>(null!),
    carouselTrackSlide = useRef<HTMLPictureElement>(null!),
    userMouseDown = useRef<boolean>(false),
    userMouseMove = useRef<boolean>(false);

  type carouselPropTypes = { carouselImg: string; carouselAlt: string; carouselActivity: string };

  const CarouselProps = ({ carouselImg, carouselAlt, carouselActivity }: carouselPropTypes): JSX.Element => {
    return (
      <picture className={`carousel__track__slide ${carouselActivity}`} ref={carouselTrackSlide}>
        <img src={carouselImg} alt={carouselAlt} draggable="false" loading="lazy" decoding="async" fetchpriority="low" />
      </picture>
    );
  };

  useEffect(() => {
    if (!carousel || !carouselTrack) return;

    const onMouseDown = (e: MouseEvent): void => {
      userMouseDown.current = true;
      userMouseMove.current = false;
      carouselTrack.current.dataset.mouseDownAt = `${e.clientX}`;
    };

    const onMouseMove = (e: MouseEvent): void => {
      userMouseMove.current = true;
      const mouseDownAt: string = carouselTrack.current?.dataset.mouseDownAt as unknown as string,
        mouseDelta: number = parseFloat(mouseDownAt) - e.clientX,
        maxDelta: number = window.innerWidth / 1.8,
        percentage: number = (mouseDelta / maxDelta) * -100,
        nextPerc: string = carouselTrack.current?.dataset.prevPercentage as unknown as string;
      let nextPercentage: number = parseFloat(nextPerc) + percentage;

      if (!userMouseDown.current) {
        return;
      } else {
        userMouseMove.current = true;
        const trackWidthMax: number = (carouselTrack.current.offsetWidth / 32) * -1;
        nextPercentage = Math.max(trackWidthMax, Math.min(6.5, nextPercentage));
        carouselTrack.current.dataset.percentage = `${nextPercentage}`;
      }

      if (carouselTrack.current.dataset.mouseDownAt === '0') {
        return;
      } else {
        carouselTrack.current.animate(
          {
            transform: `translateX(${nextPercentage}%)`,
          },
          { duration: 1200, fill: 'both' }
        );
        const arrayOfImages: Element[] = Array.from(carouselTrack.current.children);
        [...arrayOfImages].forEach((el: Element) => {
          el.children[0].animate(
            {
              objectPosition: `${85 + nextPercentage / 2}% 100%`,
            },
            { duration: 1200, fill: 'both' }
          );
        });
      }
    };

    const onMouseLeave = (): void => {
      userMouseDown.current = false;
      userMouseMove.current = false;
    };

    const onMouseUp = (e: MouseEvent): void => {
      userMouseDown.current = false;
      carouselTrack.current.dataset.mouseDownAt = '0';
      carouselTrack.current.dataset.prevPercentage = carouselTrack.current.dataset.percentage;

      const target = e.target as HTMLPictureElement;
      if (!userMouseMove.current) {
        [...carouselTrack.current.children].forEach((child) => child.classList.replace('active', 'disabled'));
        target.classList.contains('active') ? target.classList.replace('active', 'disabled') : target.classList.replace('disabled', 'active');
      }
    };

    carousel.current?.addEventListener('mousedown', onMouseDown);
    carouselTrack.current?.addEventListener('mousemove', onMouseMove);
    carousel.current?.addEventListener('mouseleave', onMouseLeave);
    carousel.current?.addEventListener('mouseup', onMouseUp);

    const listenerUnmount = (): void => {
      carousel.current?.removeEventListener('mousedown', onMouseDown);
      carouselTrack.current?.removeEventListener('mousemove', onMouseMove);
      carousel.current?.removeEventListener('mouseleave', onMouseLeave);
      carousel.current?.removeEventListener('mouseup', onMouseUp);
    };

    return listenerUnmount;
  }, []);

  return (
    <section className="carousel" ref={carousel}>
      <h2 className="carousel__heading">
        Audio equipment for <span className="highlight">every</span> setting and <span className="highlight">every</span> environment
      </h2>
      <div className="carousel__track" ref={carouselTrack} data-mouse-down-at="0" data-prev-percentage="0">
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/brian-tromp-rWMAni9akN8-unsplash.jpg"
          carouselAlt="Slide A"
          carouselActivity="active"
        />
        <CarouselProps
          carouselImg="src/ecommerce/assets/production-images/compressed-home-page/carousel/katrina-beachy-c_egiHy2x4Y-unsplash.jpg"
          carouselAlt="Slide C"
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
      </div>
    </section>
  );
};

export default Carousel;
