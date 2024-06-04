import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
        is_admin: false
    });
    const [editMode, setEditMode] = useState(false);
    const { auth } = useContext(AuthContext);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/users', {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [auth.token]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNewUser({ ...newUser, [name]: type === 'checkbox' ? checked : value });
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/users', newUser, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setNewUser({
                username: '',
                password: '',
                is_admin: false
            });
            fetchUsers();
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleDeleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/users/${id}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            fetchUsers();
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    const handleUpdateUser = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/users/${newUser.id}`, newUser, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setNewUser({
                username: '',
                password: '',
                is_admin: false
            });
            setEditMode(false);
            fetchUsers();
        } catch (error) {
            console.error('Error updating user:', error);
        }
    };

    const handleEditButtonClick = (user) => {
        setNewUser(user);
        setEditMode(true);
    };

    return (
        <div className="admin-page">
            <h2>Manage Users</h2>
            <form onSubmit={editMode ? handleUpdateUser : handleAddUser} className="user-form">
                <input type="text" name="username" placeholder="Username" value={newUser.username} onChange={handleInputChange} required />
                <input type="password" name="password" placeholder="Password" value={newUser.password} onChange={handleInputChange} required />
                <label>
                    Admin
                    <input type="checkbox" name="is_admin" checked={newUser.is_admin} onChange={handleInputChange} />
                </label>
                <button type="submit">{editMode ? 'Update User' : 'Add User'}</button>
            </form>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Username</th>
                        <th>Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={`${user.id}-${index}`}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.is_admin ? 'Yes' : 'No'}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditButtonClick(user)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminUsers;
