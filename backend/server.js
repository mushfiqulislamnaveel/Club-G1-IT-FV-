const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce_db'
});

db.connect(err => {
    if (err) throw err;
    console.log('MySQL connected...');
});

// app.use((req, res, next) => {
//     console.log(`${req.method} ${req.path}`);
//     next();
// });

const createUsersTable = `
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE,
    password VARCHAR(255),
    is_admin BOOLEAN DEFAULT FALSE
)`;

db.query(createUsersTable, err => {
    if (err) throw err;
    console.log('Users table created or already exists');
});

const createCartTable = `
CREATE TABLE IF NOT EXISTS cart (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id VARCHAR(255),
    name VARCHAR(255),
    price DECIMAL(10, 2),
    quantity INT,
    image VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;

db.query(createCartTable, err => {
    if (err) throw err;
    console.log('Cart table created or already exists');
});

const createProductsTable = `
CREATE TABLE IF NOT EXISTS products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description TEXT,
    price DECIMAL(10, 2),
    image VARCHAR(255)
)`;

db.query(createProductsTable, err => {
    if (err) throw err;
    console.log('Products table created or already exists');
});

app.post('/api/register', async (req, res) => {
    const { username, password, is_admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password, is_admin) VALUES (?, ?, ?)';
    db.query(sql, [username, hashedPassword, is_admin || false], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Username already exists' });
            }
            throw err;
        }
        res.status(201).json({ message: 'User registered successfully' });
    });
});

app.post('/api/login', (req, res) => {
    const { username, password } = req.body;

    const sql = 'SELECT * FROM users WHERE username = ?';
    db.query(sql, [username], async (err, result) => {
        if (err) throw err;
        if (result.length === 0) {
            console.log('Invalid username');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const user = result[0];
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log('Invalid password');
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        console.log('User authenticated');
        const token = jwt.sign({ userId: user.id, isAdmin: user.is_admin }, 'your_jwt_secret', { expiresIn: '1h' });
        res.json({ token });
    });
});



const authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, 'your_jwt_secret');
        req.user = decoded;
        next();
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
    }
};

const adminOnly = (req, res, next) => {
    if (!req.user.isAdmin) {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

app.get('/api/cart', authenticate, (req, res) => {
    const sql = 'SELECT * FROM cart WHERE user_id = ?';
    db.query(sql, [req.user.userId], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.post('/api/cart', authenticate, (req, res) => {
    const { product_id, name, price, quantity, image } = req.body;
    const sql = 'INSERT INTO cart (user_id, product_id, name, price, quantity, image) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(sql, [req.user.userId, product_id, name, price, quantity, image], (err, result) => {
        if (err) throw err;
        res.json({ id: result.insertId, product_id, name, price, quantity, image });
    });
});

app.put('/api/cart/:id', authenticate, (req, res) => {
    const { quantity } = req.body;
    const sql = 'UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?';
    db.query(sql, [quantity, req.params.id, req.user.userId], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/api/cart/:id', authenticate, (req, res) => {
    const sql = 'DELETE FROM cart WHERE id = ? AND user_id = ?';
    db.query(sql, [req.params.id, req.user.userId], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.delete('/api/cart', authenticate, (req, res) => {
    const sql = 'DELETE FROM cart WHERE user_id = ?';
    db.query(sql, [req.user.userId], (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Admin routes
// CRUD operations for products

app.post('/api/products', (req, res) => {
    const product = req.body;
    const sql = 'INSERT INTO products SET ?';
    db.query(sql, product, (err, result) => {
        if (err) throw err;
        res.send('Product added...');
    });
});

app.get('/api/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

app.put('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const product = req.body;
    const sql = 'UPDATE products SET ? WHERE product_id = ?';
    db.query(sql, [product, id], (err, result) => {
        if (err) throw err;
        res.send('Product updated...');
    });
});

app.delete('/api/products/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM products WHERE product_id = ?';
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.send('Product deleted...');
    });
});

// Fetch all orders
app.get('/api/orders', authenticate, adminOnly, (req, res) => {
    const sql = `
        SELECT orders.id, orders.user_id, orders.full_name, orders.address, orders.payment_method, orders.status, orders.payment_status,
               order_items.product_id, order_items.name AS product_name, order_items.price AS product_price, order_items.quantity, order_items.image
        FROM orders
        JOIN order_items ON orders.id = order_items.order_id
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Fetch all customers
app.get('/api/customers', authenticate, adminOnly, (req, res) => {
    const sql = 'SELECT id, username, is_admin FROM users';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});


// app.get('/api/customers', authenticate, adminOnly, (req, res) => {
//     const sql = 'SELECT id, username, is_admin FROM users';
//     db.query(sql, (err, result) => {
//         if (err) throw err;
//         res.json(result);
//     });
// });


app.post('/api/users', async (req, res) => {
    const { username, password, is_admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, is_admin };
    const sql = 'INSERT INTO users SET ?';
    db.query(sql, user, (err, result) => {
        if (err) throw err;
        res.send('User added...');
    });
});

// Get all users
app.get('/api/users', (req, res) => {
    const sql = 'SELECT * FROM users';
    db.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// Update a user with hashed password
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, password, is_admin } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = { username, password: hashedPassword, is_admin };
    const sql = 'UPDATE users SET ? WHERE id = ?';
    db.query(sql, [user, id], (err, result) => {
        if (err) throw err;
        res.send('User updated...');
    });
});

// Delete a user
app.delete('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM users WHERE id = ?';
    db.query(sql, id, (err, result) => {
        if (err) throw err;
        res.send('User deleted...');
    });
});

app.post('/api/confirm-order', authenticate, (req, res) => {
    const { fullName, address, paymentMethod, cart } = req.body;

    // Save order details to the orders table
    const sqlOrder = 'INSERT INTO orders (user_id, full_name, address, payment_method) VALUES (?, ?, ?, ?)';
    db.query(sqlOrder, [req.user.userId, fullName, address, paymentMethod], (err, result) => {
        if (err) throw err;
        const orderId = result.insertId;

        // Save each cart item as an order item
        const orderItems = cart.map(item => [orderId, item.product_id, item.name, item.price, item.quantity, item.image]);
        const sqlOrderItems = 'INSERT INTO order_items (order_id, product_id, name, price, quantity, image) VALUES ?';
        db.query(sqlOrderItems, [orderItems], (err, result) => {
            if (err) throw err;
            res.json({ message: 'Order confirmed' });
        });
    });
});

// Create orders and order_items tables if they don't exist
const createOrdersTable = `
CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    full_name VARCHAR(255),
    address TEXT,
    payment_method VARCHAR(255),
    status VARCHAR(255) DEFAULT 'Pending',
    payment_status VARCHAR(255) DEFAULT 'Unpaid',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
)`;

db.query(createOrdersTable, err => {
    if (err) throw err;
    console.log('Orders table created or already exists');
});

const createOrderItemsTable = `
CREATE TABLE IF NOT EXISTS order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    product_id VARCHAR(255),
    name VARCHAR(255),
    price DECIMAL(10, 2),
    quantity INT,
    image VARCHAR(255),
    FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE
)`;

db.query(createOrderItemsTable, err => {
    if (err) throw err;
    console.log('Order Items table created or already exists');
});

app.post('/api/create-admin', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = 'INSERT INTO users (username, password, is_admin) VALUES (?, ?, true)';
    db.query(sql, [username, hashedPassword], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Username already exists' });
            }
            throw err;
        }
        res.status(201).json({ message: 'Admin user created successfully' });
    });
});




app.listen(5000, () => {
    console.log('Server started on port 5000');
});
