import { useRef, useState } from 'react';
import CarouselProps from '../../components/home/CarouselProps';

const Carousel = () => {
  return (
    <section>
      <div className="sectionHeading flexBox">
        <i className="fa-solid fa-circle"></i>
        <h2>Ecommerce built for consumers, by consumers</h2>
      </div>
      <div className="carousel">
        <div className="carousel__track">
          <CarouselProps carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/bernin-uben-tioYUDleMjg-unsplash.jpg" carouselAlt="" />
          <CarouselProps carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/blocks-T3mKJXfdims-unsplash.jpg" carouselAlt="" />
          <CarouselProps carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/erwi-AJ3r-NL28PI-unsplash.jpg" carouselAlt="" />
          <CarouselProps carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/jukka-aalho-OaPksPcVp50-unsplash.jpg" carouselAlt="" />
          <CarouselProps carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/norman-hermle-1Zfo0Aj3OZI-unsplash.jpg" carouselAlt="" />
          <CarouselProps
            carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/obafemi-moyosade-zndslHAXhAw-unsplash.jpg"
            carouselAlt=""
          />
          <CarouselProps carouselImg="/src/ecommerce/assets/production-images/compressed-home-page/carousel/zac-bromell-e2ETjLSj940-unsplash.jpg" carouselAlt="" />
        </div>
        <div className="carousel__navigation">
          <button className="carousel__navigation--button flexBox justifyCenter" role="button">
            <i className="fa-solid fa-circle-chevron-left"></i>
          </button>
          <button className="carousel__navigation--button flexBox justifyCenter" role="button">
            <i className="fa-solid fa-circle-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
