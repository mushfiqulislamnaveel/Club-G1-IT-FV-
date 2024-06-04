import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';

const ConfirmOrder = () => {
    const [fullName, setFullName] = useState('');
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('');
    const { cart, clearCart } = useContext(CartContext);
    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                'http://localhost:5000/api/confirm-order',
                {
                    fullName,
                    address,
                    paymentMethod,
                    cart
                },
                {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    }
                }
            );
            clearCart();
            navigate('/order-success');
        } catch (error) {
            console.error('Error confirming order:', error);
        }
    };

    return (
        <div className="center-container">
            <div className="form-container">
                <h2>Confirm Order</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name:</label>
                        <input
                            type="text"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Address:</label>
                        <input
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label>Payment Method:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                            required
                        >
                            <option value="">Select Payment Method</option>
                            <option value="Credit Card">Credit Card</option>
                            <option value="PayPal">PayPal</option>
                            <option value="Cash on Delivery">Cash on Delivery</option>
                        </select>
                    </div>
                    <button type="submit">Proceed</button>
                </form>
            </div>
        </div>
    );
};

export default ConfirmOrder;
