//const { dbScan } = require('./db_scan.js');
const { dbScan } = require('./db_scan.js');

test('Dovrebbe restituire 2', async () => {
  const response = await dbScan('SELECT 2');
  expect(response.result).toBe(2);
});

test('Dovrebbe restituire una data valida', async () => {
  const response = await dbScan('SELECT NOW()', 'dataora');

  // Verifica che il campo 'dataora' sia definito
  expect(response['dataora']).toBeDefined();

  // Verifica che il campo 'dataora' possa essere convertito in un oggetto Date valido
  const date = new Date(response['dataora']);
  expect(date.toString()).not.toBe('Invalid Date');
});
