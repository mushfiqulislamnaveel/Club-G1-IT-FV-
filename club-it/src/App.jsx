import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminNavbar from './components/AdminNavbar';
import Home from './pages/Home';
import Category from './pages/Category';
import ProductDetailPage from './pages/ProductDetailPage';
import Cart from './components/Cart';
import Register from './pages/Register';
import Login from './pages/Login';
import ConfirmOrder from './pages/ConfirmOrder';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminUsers from './pages/AdminUsers';
import { AuthContext } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    return auth.token ? children : <Navigate to="/login" />;
};

const AdminRoute = ({ children }) => {
    const { auth } = useContext(AuthContext);
    return auth.token && auth.isAdmin ? children : <Navigate to="/admin-login" />;
};

const App = () => {
    const { auth } = useContext(AuthContext);

    return (
        <Router>
            {auth.isAdmin ? <AdminNavbar /> : <Header />}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:categoryName" element={<Category />} />
                <Route path="/product/:productId" element={<ProductDetailPage />} />
                <Route path="/cart" element={<PrivateRoute><Cart /></PrivateRoute>} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/confirm-order" element={<PrivateRoute><ConfirmOrder /></PrivateRoute>} />
                <Route path="/admin-login" element={<AdminLogin />} />
                <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
                <Route path="/admin/products" element={<AdminRoute><AdminProducts /></AdminRoute>} />
                <Route path="/admin/orders" element={<AdminRoute><AdminOrders /></AdminRoute>} />
                <Route path="/admin/users" element={<AdminRoute><AdminUsers /></AdminRoute>} />
            </Routes>
            {!auth.isAdmin && <Footer />}
        </Router>
    );
};

export default App;
