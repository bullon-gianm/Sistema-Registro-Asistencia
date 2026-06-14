const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Registro de usuarios
router.post('/register', (req, res) => {
    const { nombre, correo, password, rol } = req.body;
    const query = `INSERT INTO usuarios (nombre, correo, password, rol) VALUES (?, ?, ?, ?)`;
    
    db.run(query, [nombre, correo, password, rol || 'empleado'], function(err) {
        if (err) return res.status(400).json({ error: 'El correo ya está registrado.' });
        res.status(201).json({ mensaje: 'Usuario registrado con éxito', id: this.lastID });
    });
});

// Login de usuarios
router.post('/login', (req, res) => {
    const { correo, password } = req.body;
    const query = `SELECT * FROM usuarios WHERE correo = ? AND password = ?`;
    
    db.get(query, [correo, password], (err, user) => {
        if (err || !user) return res.status(401).json({ error: 'Credenciales incorrectas' });
        res.json({ mensaje: 'Ingreso exitoso', user: { id: user.id, nombre: user.nombre, rol: user.rol } });
    });
});

module.exports = router;
