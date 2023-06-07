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
          <CarouselProps
            carouselImg="https://images.unsplash.com/photo-1633933703119-5d25460ad829?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            carouselAlt=""
          />
          <CarouselProps
            carouselImg="https://images.unsplash.com/photo-1669892689930-dda996c7e5b7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            carouselAlt=""
          />
          <CarouselProps carouselImg="https://www.schiit.com/public/upload/images/magni%20plus%20stack%201920-2.jpg" carouselAlt="" />
          <CarouselProps carouselImg="https://www.schiit.com/public/upload/images/asgard 3 bifrost 2 insitu-2.jpg" carouselAlt="" />
          <CarouselProps
            carouselImg="https://images.unsplash.com/photo-1590602847861-f357a9332bbc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            carouselAlt=""
          />
          <CarouselProps
            carouselImg="https://images.unsplash.com/photo-1626126525119-638de4e1032a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80"
            carouselAlt=""
          />
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
