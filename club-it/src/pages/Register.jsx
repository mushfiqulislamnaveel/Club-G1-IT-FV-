import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', { username, password, is_admin: false });
            navigate('/login');
        } catch (error) {
            console.error('Error registering:', error);
            alert('Registration failed');
        }
    };

    return (
        <div className="auth-page">
            <h2>Register</h2>
            <form onSubmit={handleRegister} className="auth-form">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            <button className="secondary-button" onClick={() => navigate('/login')}>
                Back to Login
            </button>
        </div>
    );
};

export default Register;
