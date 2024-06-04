import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const { auth } = useContext(AuthContext);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/orders', {
                    headers: { Authorization: `Bearer ${auth.token}` }
                });
                setOrders(response.data);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };
        fetchOrders();
    }, [auth.token]);

    return (
        <div className="admin-page">
            <h2>Customer Orders</h2>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Address</th>
                        <th>Payment Method</th>
                        <th>Status</th>
                        <th>Payment Status</th>
                        <th>Product ID</th>
                        <th>Product Name</th>
                        <th>Product Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, index) => (
                        <tr key={`${order.id}-${index}`}>
                            <td>{order.id}</td>
                            <td>{order.user_id}</td>
                            <td>{order.full_name}</td>
                            <td>{order.address}</td>
                            <td>{order.payment_method}</td>
                            <td>{order.status}</td>
                            <td>{order.payment_status}</td>
                            <td>{order.product_id}</td>
                            <td>{order.product_name}</td>
                            <td>{order.product_price}</td>
                            <td>{order.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminOrders;
