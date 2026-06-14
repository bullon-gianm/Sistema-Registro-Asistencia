const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir archivos estáticos del Frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Integración de Rutas API
app.use('/api/auth', require('./routes/auth.routes.js'));
app.use('/api/asistencia', require('./routes/asistencia.routes.js'));

// Redirección por defecto a la página de login al entrar a la raíz
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/login.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor de asistencia corriendo en: http://localhost:${PORT}`);
});
