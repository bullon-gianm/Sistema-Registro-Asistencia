const { registrarEntrada, registrarSalida } = require('../services/asistenciaService');

test('Debe registrar asistencia de entrada correctamente', () => {
  const resultado = registrarEntrada('EMP001', '08:00');
  expect(resultado.estado).toBe('Registrado');
});

test('Debe retornar error si faltan datos de asistencia', () => {
  const resultado = registrarEntrada('', '');
  expect(resultado.estado).toBe('Error');
});

test('Debe registrar salida si existe entrada previa', () => {
  const resultado = registrarSalida('EMP001', true, '17:30');
  expect(resultado.estado).toBe('Salida registrada');
});

test('Debe retornar error si no existe entrada previa', () => {
  const resultado = registrarSalida('EMP001', false, '17:30');
  expect(resultado.estado).toBe('Error');
});
