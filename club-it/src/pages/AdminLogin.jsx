import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            const { token } = response.data;
            const decodedToken = JSON.parse(atob(token.split('.')[1]));
            if (decodedToken.isAdmin) {
                localStorage.setItem('token', token);
                setAuth({ token, user: username, isAdmin: true });
                navigate('/admin');
            } else {
                setMessage('Admin access required');
            }
        } catch (error) {
            setMessage(error.response.data.message);
        }
    };

    return (
        <div className="center-container">
            <div className="form-container">
                <h2>Admin Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <button type="submit">Login</button>
                </form>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
};

export default AdminLogin;
