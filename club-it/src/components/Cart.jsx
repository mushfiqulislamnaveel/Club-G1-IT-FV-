import React, { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const Cart = () => {
    const { cart, updateQuantity, removeFromCart, clearCart } = useContext(CartContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleQuantityChange = (id, event) => {
        const quantity = parseInt(event.target.value);
        if (quantity > 0) {
            updateQuantity(id, quantity);
        }
    };

    const handleRemove = (id) => {
        removeFromCart(id);
    };

    const handleConfirmOrder = () => {
        navigate('/confirm-order');
    };

    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (!auth.token) {
        return (
            <div className="center-container">
                <div className="form-container">
                    <h2>Please Log In</h2>
                    <p>You need to be logged in to view your cart.</p>
                    <Link to="/login"><button>Login</button></Link>
                </div>
            </div>
        );
    }

    return (
        <section className="cart">
            <h2>Shopping Cart</h2>
            <ul>
                {cart.map(item => (
                    <li key={item.id} className="cart-item">
                        <img src={item.image} alt={item.name} className="cart-item-image" />
                        <div className="cart-item-details">
                            <p>{item.name}</p>
                            <p>{item.price}৳</p>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => handleQuantityChange(item.id, e)}
                                min="1"
                            />
                            <button onClick={() => handleRemove(item.id)}>Remove</button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="cart-total">
                <h3>Total: {totalPrice}৳</h3>
                <button onClick={handleConfirmOrder}>Confirm Order</button>
            </div>
        </section>
    );
};

export default Cart;
