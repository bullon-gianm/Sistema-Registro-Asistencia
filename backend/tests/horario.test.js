const { calcularEstadoAsistencia } = require('../services/horarioService');

test('Debe marcar como puntual si la entrada es a las 08:00', () => {
  const resultado = calcularEstadoAsistencia('08:00');
  expect(resultado).toBe('Puntual');
});

test('Debe marcar tardanza si la entrada es después de las 08:00', () => {
  const resultado = calcularEstadoAsistencia('08:15');
  expect(resultado).toBe('Tardanza');
});
