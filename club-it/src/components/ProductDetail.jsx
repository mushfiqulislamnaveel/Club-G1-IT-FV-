import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const ProductDetail = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <section className="product-detail">
            <div className="product-images">
                <img src={product.image} alt={product.name} className="main-image" />
            </div>
            <div className="product-info">
                <h1>{product.name}</h1>
                <div className="product-meta">
                    <span>Price: {product.price}৳</span>
                    <span>Regular Price: {product.regularPrice}৳</span>
                    <span>Status: {product.status}</span>
                    <span>Product Code: {product.code}</span>
                    <span>Brand: {product.brand}</span>
                </div>
                <h2>Key Features</h2>
                <ul className="key-features">
                    {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                    ))}
                </ul>
                <p><a href="#">View More Info</a></p>
                <div className="star-points">
                    <span>{product.starPoints}</span> Star Points
                </div>
                <h2>Payment Options</h2>
                <div className="payment-options">
                    <div className="option">
                        <input type="radio" id="cash-price" name="payment" checked />
                        <label htmlFor="cash-price">{product.price}৳ <br /> Cash Discount Price <br /> Online / Cash Payment</label>
                    </div>
                    <div className="option">
                        <input type="radio" id="emi-price" name="payment" />
                        <label htmlFor="emi-price">{product.emiPrice}৳/month <br /> Regular Price: {product.regularPrice}৳ <br /> 0% EMI for up to 12 Months</label>
                    </div>
                </div>
                <div className="quantity-buy">
                    <input type="number" value="1" min="1" readOnly />
                    <button className="buy-now" onClick={() => addToCart(product)}>Buy Now</button>
                </div>
            </div>
        </section>
    );
}

export default ProductDetail;
