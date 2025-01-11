import { dbScan } from './dbScan.js';
import 'dotenv/config';

test('It should return 2', async () => {
  const response = await dbScan('SELECT 2');
  expect(response.result).toBe(2);
});

test('It should return a valid date', async () => {
  const response = await dbScan('SELECT NOW()', 'dataora');

  // Verifica che il campo 'dataora' sia definito
  expect(response['dataora']).toBeDefined();

  // Verifica che il campo 'dataora' possa essere convertito in un oggetto Date valido
  const date = new Date(response['dataora']);
  expect(date.toString()).not.toBe('Invalid Date');
});
