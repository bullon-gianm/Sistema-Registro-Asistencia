// Manejar el Registro
if (document.getElementById('registroForm')) {
    document.getElementById('registroForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;
        const rol = document.getElementById('rol').value;

        const res = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre, correo, password, rol })
        });
        const data = await res.json();
        if (data.error) alert(data.error);
        else {
            alert(data.mensaje);
            window.location.href = 'login.html';
        }
    });
}

// Manejar el Login
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const correo = document.getElementById('correo').value;
        const password = document.getElementById('password').value;

        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ correo, password })
        });
        const data = await res.json();
        if (data.error) alert(data.error);
        else {
            localStorage.setItem('usuario', JSON.stringify(data.user));
            window.location.href = 'index.html';
        }
    });
}
