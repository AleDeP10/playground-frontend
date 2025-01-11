import { create, search, update, remove } from './todo_list.js';
import 'dotenv/config';

let id;

test('It should return a number, equivalent to generated id', async () => {
  const response = await create('### Task of test', 'TODO');
  expect(typeof response.id).toBe('number');
  id = response.id;
});

test('It should return a not empty array', async () => {
  const response = await search('TODO');
  expect(typeof response).toBe('object');
  expect(response[0] !== undefined).toBe(true);
});

test('It should find the task and update it with success', async () => {
  const response = await update(id, '### Updated task', 'IN PROGRESS');
  expect(response.message ? response.message : null).toBe('Task updated successfully');
});

test('It should find the task and delete it successfully', async () => {
  const response = await remove(id);
  expect(response.message ? response.message : null).toBe('Task deleted successfully');
});
