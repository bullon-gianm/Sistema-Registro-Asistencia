const usuario = JSON.parse(localStorage.getItem('usuario'));

if (!usuario) {
    window.location.href = 'login.html';
} else {
    document.getElementById('bienvenida').innerText = `⚡ ${usuario.nombre} ⚡`;
    
    // Revelar la puerta trasera del Administrador si posee el rol
    if (usuario.rol === 'admin') {
        const linkAdmin = document.getElementById('linkAdmin');
        linkAdmin.style.display = 'inline';
    }
}

// Función Centralizada para enviar la Marcación Segura
async function enviarMarcacion(tipoAccion) {
    const ahora = new Date();
    // Ajustar formato local YYYY-MM-DD sin desfase horario
    const fecha = ahora.toLocaleDateString('sv-SE'); 
    const hora = ahora.toTimeString().split(' ')[0]; 

    const res = await fetch('/api/asistencia/marcar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usuario_id: usuario.id, fecha, hora, accion: tipoAccion })
    });
    
    const data = await res.json();
    alert(data.mensaje);
}

// Enlazar los nuevos botones independientes
document.getElementById('btnEntrada').addEventListener('click', () => enviarMarcacion('entrada'));
document.getElementById('btnSalida').addEventListener('click', () => enviarMarcacion('salida'));

// Control de Cierre de Sesión Seguro
document.getElementById('btnCerrarSesion').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
});
