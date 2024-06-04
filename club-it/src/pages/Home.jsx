import React from 'react';
import { Link } from 'react-router-dom';
import HeroCarousel from '../components/HeroCarousel';

const Home = () => {
    return (
        <div>
            <section className="hero">
                <HeroCarousel />
            </section>
            <section className="categories">
                <Link to="/category/motherboard" className="category">Motherboard</Link>
                <Link to="/category/graphics-card" className="category">Graphics Card</Link>
                <Link to="/category/monitor" className="category">Monitor</Link>
                <Link to="/category/casing" className="category">Casing</Link>
                <Link to="/category/laptop" className="category">Laptop</Link>
                <Link to="/category/cpu-cooler" className="category">CPU Cooler</Link>
            </section>
            <section className="gallery">
                <h2>Best Selling Gallery</h2>
                <div className="gallery-images">
                    <img src="https://i.ibb.co/QCsSd9C/1.jpg" alt="Gallery Image 1" />
                    <img src="https://i.ibb.co/0F9P0vk/6.jpg" alt="Gallery Image 2" />
                    <img src="https://i.ibb.co/db4LQt6/2.jpg" alt="Gallery Image 3" />
                    <img src="https://i.ibb.co/VmkznMn/3.jpg" alt="Gallery Image 4" />
                    <img src="https://i.ibb.co/55rYR1s/5.jpg" alt="Gallery Image 5" />
                    <img src="https://i.ibb.co/pw4B9C4/4.jpg" alt="Gallery Image 6" />
                </div>
            </section>
        </div>
    );
}

export default Home;
