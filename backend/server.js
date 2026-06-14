const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares básicos para leer JSON y formularios
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir los archivos estáticos del Frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Conexión automática a la Base de Datos SQLite (se creará un archivo llamado asistencia.db)
const db = new sqlite3.Database('./asistencia.db', (err) => {
    if (err) {
        console.error('Error al conectar a SQLite:', err.message);
    } else {
        console.log('Conectado con éxito a la base de datos SQLite.');
    }
});

// Ruta de prueba inicial
app.get('/api/test', (req, res) => {
    res.json({ mensaje: "El servidor de asistencia está respondiendo correctamente." });
});

// Encender el servidor
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
