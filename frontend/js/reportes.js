const usuario = JSON.parse(localStorage.getItem('usuario'));
if (!usuario || usuario.rol !== 'admin') window.location.href = 'index.html';

// Función en el cliente para pintar AM/PM en la pantalla de forma vistosa
function mostrarAMPM(horaCadena) {
    if (!horaCadena) return null;
    let [horas, minutos, segundos] = horaCadena.split(':');
    horas = parseInt(horas);
    const ampm = horas >= 12 ? 'P.M.' : 'A.M.';
    horas = horas % 12;
    horas = horas ? horas : 12;
    return `${horas.toString().padStart(2, '0')}:${minutos}:${segundos.substr(0,2)} ${ampm}`;
}

async function cargarReporteGeneral() {
    const res = await fetch('/api/asistencia/reporte-general');
    const datos = await res.json();
    const tabla = document.getElementById('tablaReportes');
    
    tabla.innerHTML = datos.map(reg => `
        <tr>
            <td>${reg.nombre}</td>
            <td>${reg.correo}</td>
            <td>${reg.fecha}</td>
            <td class="badge-entrada">${mostrarAMPM(reg.hora_entrada)}</td>
            <td class="badge-salida">${mostrarAMPM(reg.hora_salida) || '<span style="color:#ff007f">No registró salida</span>'}</td>
            <td>
                <button class="btn-action btn-edit" onclick="abrirModal(${reg.id}, '${reg.hora_entrada}', '${reg.hora_salida || ''}')">⚙️ Editar</button>
                <button class="btn-action btn-delete" onclick="eliminarRegistro(${reg.id})">❌ Eliminar</button>
            </td>
        </tr>
    `).join('');
}

function abrirModal(id, entrada, salida) {
    document.getElementById('editId').value = id;
    document.getElementById('editEntrada').value = entrada;
    document.getElementById('editSalida').value = salida;
    document.getElementById('modalEditar').style.display = 'flex';
}

function cerrarModal() {
    document.getElementById('modalEditar').style.display = 'none';
}

document.getElementById('formEditar').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('editId').value;
    const hora_entrada = document.getElementById('editEntrada').value;
    const hora_salida = document.getElementById('editSalida').value;

    const res = await fetch(`/api/asistencia/editar/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ hora_entrada, hora_salida, rol_solicitante: usuario.rol })
    });
    
    const data = await res.json();
    alert(data.mensaje);
    cerrarModal();
    cargarReporteGeneral();
});

async function eliminarRegistro(id) {
    if (confirm('¿Está seguro de eliminar de forma permanente este registro?')) {
        const res = await fetch(`/api/asistencia/eliminar/${id}`, { method: 'DELETE' });
        const data = await res.json();
        alert(data.mensaje);
        cargarReporteGeneral();
    }
}

cargarReporteGeneral();
