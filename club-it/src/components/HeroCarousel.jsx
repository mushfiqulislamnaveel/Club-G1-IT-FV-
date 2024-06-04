import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

const HeroCarousel = () => {
    return (
        <Carousel autoPlay interval={3000} infiniteLoop showThumbs={false}>
            <div>
                <img src="https://i.ibb.co/HzLrkhD/1.jpg" alt="Banner 1" />
            </div>
            <div>
                <img src="https://i.ibb.co/jGhHWvj/2.jpg" alt="Banner 2" />
            </div>
            <div>
                <img src="https://i.ibb.co/0XNVynV/3.jpg" alt="Banner 3" />
            </div>
            <div>
                <img src="https://i.ibb.co/Qd20Myq/4.jpg" alt="Banner 4" />
            </div>
        </Carousel>
    );
}

export default HeroCarousel;
