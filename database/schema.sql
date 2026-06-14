-- Creación de la tabla de Usuarios / Empleados
CREATE TABLE IF NOT EXISTS usuarios (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    rol TEXT DEFAULT 'empleado' -- 'empleado' o 'admin'
);

-- Creación de la tabla de Registro de Asistencia
CREATE TABLE IF NOT EXISTS asistencia (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER,
    fecha TEXT NOT NULL,         -- Formato: YYYY-MM-DD
    hora_entrada TEXT NOT NULL,  -- Formato: HH:MM:SS
    hora_salida TEXT,            -- Formato: HH:MM:SS (Puede ser NULL al iniciar el día)
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
);
