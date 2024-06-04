import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminNavbar = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        setAuth({ token: null, user: null, isAdmin: false });
    };

    return (
        <nav className="admin-navbar">
            <div className="admin-navbar-container">
                <div className="admin-navbar-links">
                    <Link to="/admin">Dashboard</Link>
                    <Link to="/admin/users">Users List</Link>
                    <Link to="/admin/orders">Orders</Link>
                    <Link to="/admin/products">Products</Link>
                </div>
                <div className="admin-navbar-user">
                    <span>Hello, {auth.user}</span>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
