import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useContext(CartContext);

    return (
        <div className="product">
            <Link to={`/product/${product.id}`}>
                <img src={product.image} alt="Product Image" />
                <p>{product.name}</p>
                <p>৳{product.price}</p>
            </Link>
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
        </div>
    );
}

export default ProductCard;
