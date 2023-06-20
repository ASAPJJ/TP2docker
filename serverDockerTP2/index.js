const express = require('express');
const app = express();
const cors = require('cors');
const { query, pool } = require('./database');

app.use(express.json());
app.use(cors());

// Ruta GET para obtener productos
app.get('/productos', async (req, res) => {
  let dbConnection;
    try {
        dbConnection = await pool.getConnection();
        await dbConnection.query(`
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name_prod VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL);
    `);
    const rows = await dbConnection.query('SELECT * FROM products');
        return res.json({products:rows});
    } catch (error) {
        throw error;
    } finally {
        if (dbConnection) dbConnection.end();
    }
});

// Ruta POST para subir un producto
app.post('/productos', async (req, res) => {
  const { name_prod, price } = req.body;
  const values = [name_prod, price];

  try {
    await query('INSERT INTO products (name_prod, price) VALUES (?, ?)', values);
    return res.status(201).json({ message: 'Producto subido exitosamente' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error al subir el producto' });
  }
});

app.listen(4000, () => {
  console.log('el server esta corriendo puerto 4000');
});
