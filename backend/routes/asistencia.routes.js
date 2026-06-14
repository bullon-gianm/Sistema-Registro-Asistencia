const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Marcar Entrada o Salida (Flujo General)
router.post('/marcar', (req, res) => {
    const { usuario_id, fecha, hora, accion } = req.body;

    db.get(`SELECT * FROM asistencia WHERE usuario_id = ? AND fecha = ?`, [usuario_id, fecha], (err, row) => {
        if (err) return res.status(500).json({ error: err.message });

        if (accion === 'entrada') {
            if (row) {
                return res.status(400).json({ mensaje: 'ALERTA: Ya has registrado una entrada hoy.' });
            }
            const query = `INSERT INTO asistencia (usuario_id, fecha, hora_entrada) VALUES (?, ?, ?)`;
            db.run(query, [usuario_id, fecha, hora], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ mensaje: 'ÉXITO: Entrada registrada correctamente.' });
            });
        } 
        
        else if (accion === 'salida') {
            if (!row) {
                return res.status(400).json({ mensaje: 'ERROR: Debes marcar entrada primero.' });
            }
            if (row && row.hora_salida) {
                return res.status(400).json({ mensaje: 'ALERTA: Ya registraste tu salida hoy.' });
            }
            const query = `UPDATE asistencia SET hora_salida = ? WHERE id = ?`;
            db.run(query, [hora, row.id], function(err) {
                if (err) return res.status(500).json({ error: err.message });
                res.json({ mensaje: 'ÉXITO: Salida registrada correctamente.' });
            });
        }
    });
});

// Obtener historial de un usuario específico
router.get('/historial/:id', (req, res) => {
    db.all(`SELECT * FROM asistencia WHERE usuario_id = ? ORDER BY fecha DESC`, [req.params.id], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Obtener TODOS los registros para el Administrador
router.get('/reporte-general', (req, res) => {
    const query = `
        SELECT a.id, u.nombre, u.correo, a.fecha, a.hora_entrada, a.hora_salida 
        FROM asistencia a 
        JOIN usuarios u ON a.usuario_id = u.id 
        ORDER BY a.fecha DESC`;
    db.all(query, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows); // Se mandan los datos puros para evitar errores de actualización
    });
});

// EDITAR REGISTRO CRUCIAL (PUT)
router.put('/editar/:id', (req, res) => {
    const { id } = req.params;
    const { hora_entrada, hora_salida, rol_solicitante } = req.body;
    
    if (rol_solicitante !== 'admin') {
        return res.status(403).json({ error: 'ACCESO DENEGADO.' });
    }
    
    const query = `UPDATE asistencia SET hora_entrada = ?, hora_salida = ? WHERE id = ?`;
    db.run(query, [hora_entrada, hora_salida || null, id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'SISTEMA: Cambios guardados con éxito.' });
    });
});

// ELIMINAR REGISTRO (DELETE)
router.delete('/eliminar/:id', (req, res) => {
    const { id } = req.params;
    const query = `DELETE FROM asistencia WHERE id = ?`;
    db.run(query, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ mensaje: 'SISTEMA: Registro eliminado correctamente.' });
    });
});

module.exports = router;
