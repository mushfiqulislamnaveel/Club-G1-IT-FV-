import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        status: '',
        code: '',
        brand: '',
        features: '',
        emi_price: '',
        image: '',
        product_category: ''
    });
    const [editMode, setEditMode] = useState(false);
    const { auth } = useContext(AuthContext);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products', {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [auth.token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct({ ...newProduct, [name]: value });
    };

    const handleAddProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/api/products', newProduct, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setNewProduct({
                name: '',
                price: '',
                status: '',
                code: '',
                brand: '',
                features: '',
                emi_price: '',
                image: '',
                product_category: ''
            });
            fetchProducts();
        } catch (error) {
            console.error('Error adding product:', error);
        }
    };

    const handleDeleteProduct = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/products/${id}`, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            fetchProducts();
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/products/${newProduct.product_id}`, newProduct, {
                headers: { Authorization: `Bearer ${auth.token}` }
            });
            setNewProduct({
                name: '',
                price: '',
                status: '',
                code: '',
                brand: '',
                features: '',
                emi_price: '',
                image: '',
                product_category: ''
            });
            setEditMode(false);
            fetchProducts();
        } catch (error) {
            console.error('Error updating product:', error);
        }
    };

    const handleEditButtonClick = (product) => {
        setNewProduct(product);
        setEditMode(true);
    };

    return (
        <div className="admin-page">
            <h2>Manage Products</h2>
            <form onSubmit={editMode ? handleUpdateProduct : handleAddProduct} className="product-form">
                <input type="text" name="name" placeholder="Name" value={newProduct.name} onChange={handleInputChange} required />
                <input type="number" name="price" placeholder="Price" value={newProduct.price} onChange={handleInputChange} required />
                <input type="text" name="status" placeholder="Status" value={newProduct.status} onChange={handleInputChange} required />
                <input type="text" name="code" placeholder="Code" value={newProduct.code} onChange={handleInputChange} required />
                <input type="text" name="brand" placeholder="Brand" value={newProduct.brand} onChange={handleInputChange} required />
                <textarea name="features" placeholder="Features" value={newProduct.features} onChange={handleInputChange} required></textarea>
                <input type="number" name="emi_price" placeholder="EMI Price" value={newProduct.emi_price} onChange={handleInputChange} required />
                <input type="text" name="image" placeholder="Image URL" value={newProduct.image} onChange={handleInputChange} required />
                <input type="text" name="product_category" placeholder="Category" value={newProduct.product_category} onChange={handleInputChange} required />
                <button type="submit">{editMode ? 'Update Product' : 'Add Product'}</button>
            </form>
            <table className="admin-table">
                <thead>
                    <tr>
                        <th>Product ID</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Status</th>
                        <th>Code</th>
                        <th>Brand</th>
                        <th>Features</th>
                        <th>EMI Price</th>
                        <th>Image</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, index) => (
                        <tr key={`${product.product_id}-${index}`}>
                            <td>{product.product_id}</td>
                            <td>{product.name}</td>
                            <td>{product.price}</td>
                            <td>{product.status}</td>
                            <td>{product.code}</td>
                            <td>{product.brand}</td>
                            <td>{product.features}</td>
                            <td>{product.emi_price}</td>
                            <td><img src={product.image} alt={product.name} width="50" /></td>
                            <td>{product.product_category}</td>
                            <td>
                                <button className="edit-button" onClick={() => handleEditButtonClick(product)}>Edit</button>
                                <button className="delete-button" onClick={() => handleDeleteProduct(product.product_id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminProducts;
