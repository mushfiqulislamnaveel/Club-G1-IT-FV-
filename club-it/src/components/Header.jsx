import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
    const { auth, setAuth } = useContext(AuthContext);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('isAdmin');
        setAuth({ token: null, user: null, isAdmin: false });
    };

    return (
        <header className="header">
            <div className="logo-search">
                <Link to="/">
                    <img src="https://i.ibb.co/Dbc0vGs/CLUBG1-LOG.png" alt="Club IT Logo" className="logo" />
                </Link>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/category/motherboard">Motherboards</Link>
                    </li>
                    <li>
                        <Link to="/category/graphics-card">Graphics Cards</Link>
                    </li>
                    <li>
                        <Link to="/category/monitor">Monitors</Link>
                    </li>
                    <li>
                        <Link to="/category/casing">Casing</Link>
                    </li>
                    <li>
                        <Link to="/category/laptop">Laptops</Link>
                    </li>
                    <li>
                        <Link to="/category/cpu-cooler">CPU Coolers</Link>
                    </li>
                    <li>
                        <Link to="/cart">Cart</Link>
                    </li>
                    {auth.token ? (
                        <>
                            <li>Hello, {auth.user}</li>
                            <li>
                                <button onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                    )}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
