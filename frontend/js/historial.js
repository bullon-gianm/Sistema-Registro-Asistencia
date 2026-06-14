const usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario) window.location.href = 'login.html';

function formatearAMPM(horaCadena) {
    if (!horaCadena) return '<span style="color:#ff007f; text-shadow:0 0 5px #ff007f;">Pendiente</span>';
    let [horas, minutos, segundos] = horaCadena.split(':');
    horas = parseInt(horas);
    const ampm = horas >= 12 ? 'P.M.' : 'A.M.';
    horas = horas % 12;
    horas = horas ? horas : 12;
    return `${horas.toString().padStart(2, '0')}:${minutos}:${segundos.substr(0,2)} ${ampm}`;
}

async function cargarHistorial() {
    const res = await fetch(`/api/asistencia/historial/${usuario.id}`);
    const datos = await res.json();
    const tabla = document.getElementById('tablaHistorial');
    
    tabla.innerHTML = datos.map(reg => `
        <tr>
            <td>${reg.fecha}</td>
            <td class="badge-entrada">${formatearAMPM(reg.hora_entrada)}</td>
            <td class="badge-salida">${formatearAMPM(reg.hora_salida)}</td>
        </tr>
    `).join('');
}
cargarHistorial();
