const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crea o lee el archivo de la base de datos en la raíz del proyecto
const dbPath = path.join(__dirname, '../../asistencia.db');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar a SQLite:', err.message);
    } else {
        console.log('Base de datos SQLite conectada con éxito.');
        crearTablas();
    }
});

function crearTablas() {
    db.serialize(() => {
        // Tabla de Usuarios
        db.run(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            rol TEXT DEFAULT 'empleado'
        )`);

        // Tabla de Asistencia
        db.run(`CREATE TABLE IF NOT EXISTS asistencia (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            usuario_id INTEGER,
            fecha TEXT NOT NULL,
            hora_entrada TEXT NOT NULL,
            hora_salida TEXT,
            FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
        )`);
    });
}

module.exports = db;
