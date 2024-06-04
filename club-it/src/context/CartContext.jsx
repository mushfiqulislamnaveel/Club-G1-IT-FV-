import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchCart = async () => {
            if (auth.token) {
                try {
                    const response = await axios.get('http://localhost:5000/api/cart', {
                        headers: { Authorization: `Bearer ${auth.token}` }
                    });
                    setCart(response.data);
                } catch (error) {
                    console.error('Error fetching cart:', error);
                }
            }
        };

        fetchCart();
    }, [auth.token]);

    const addToCart = async (product) => {
        if (auth.token) {
            try {
                const response = await axios.post(
                    'http://localhost:5000/api/cart',
                    {
                        product_id: product.id,
                        name: product.name,
                        price: product.price,
                        quantity: 1,
                        image: product.image
                    },
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                setCart(prevCart => [...prevCart, response.data]);
            } catch (error) {
                console.error('Error adding to cart:', error.response ? error.response.data : error.message);
            }
        } else {
            console.error('User is not authenticated');
        }
    };

    const updateQuantity = async (id, quantity) => {
        if (auth.token) {
            try {
                await axios.put(
                    `http://localhost:5000/api/cart/${id}`,
                    { quantity },
                    { headers: { Authorization: `Bearer ${auth.token}` } }
                );
                setCart(prevCart =>
                    prevCart.map(item => (item.id === id ? { ...item, quantity } : item))
                );
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        }
    };

    const removeFromCart = async (id) => {
        if (auth.token) {
            try {
                await axios.delete(`http://localhost:5000/api/cart/${id}`, {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setCart(prevCart => prevCart.filter(item => item.id !== id));
            } catch (error) {
                console.error('Error removing from cart:', error);
            }
        }
    };

    const clearCart = async () => {
        if (auth.token) {
            try {
                await axios.delete('http://localhost:5000/api/cart', {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setCart([]);
            } catch (error) {
                console.error('Error clearing cart:', error);
            }
        }
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
