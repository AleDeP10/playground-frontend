import { crea, ricerca, aggiorna, cancella } from './todo_list.js';

let id;

test('Dovrebbe restituire un numero, equivalente all\'id generato', async () => {
  const response = await crea('### Task di Test', 'TODO');
  expect(typeof response.id).toBe('number');
  id = response.id;
});

test('Dovrebbe restituire un object corrispondente ad un array non vuoto', async () => {
  const response = await ricerca('TODO');
  expect(typeof response).toBe('object');
  expect(response[0] !== undefined).toBe(true);
});

test('Dovrebbe trovare il task ed aggiornarlo con successo', async () => {
  const response = await aggiorna(id, '### Task Modificato', 'IN PROGRESS');
  expect(response.message ? response.message : null).toBe('Task aggiornato con successo');
});

test('Dovrebbe trovare il task e cancellarlo con successo', async () => {
  const response = await cancella(id);
  expect(response.message ? response.message : null).toBe('Task eliminato con successo');
});
