function registrarEntrada(codigoEmpleado, horaEntrada) {
  if (!codigoEmpleado || !horaEntrada) {
    return {
      estado: 'Error',
      mensaje: 'Datos incompletos'
    };
  }

  return {
    empleado: codigoEmpleado,
    hora: horaEntrada,
    estado: 'Registrado'
  };
}

function registrarSalida(codigoEmpleado, existeEntrada, horaSalida) {
  if (!codigoEmpleado || !horaSalida) {
    return {
      estado: 'Error',
      mensaje: 'Datos incompletos'
    };
  }

  if (!existeEntrada) {
    return {
      estado: 'Error',
      mensaje: 'No existe entrada previa'
    };
  }

  return {
    empleado: codigoEmpleado,
    horaSalida: horaSalida,
    estado: 'Salida registrada'
  };
}

module.exports = { registrarEntrada, registrarSalida };
