function calcularEstadoAsistencia(horaEntrada) {
  const horaLimite = '08:00';

  if (horaEntrada <= horaLimite) {
    return 'Puntual';
  }

  return 'Tardanza';
}

module.exports = { calcularEstadoAsistencia };
