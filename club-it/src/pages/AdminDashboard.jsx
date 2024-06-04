import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="admin-page admin-dashboard">
            <h2>Admin Dashboard</h2>
            <div className="cards">
                <Link to="/admin/products" className="card">
                    <h3>Manage Products</h3>
                </Link>
                <Link to="/admin/orders" className="card">
                    <h3>View Orders</h3>
                </Link>
                <Link to="/admin/users" className="card">
                    <h3>Users List</h3>
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
