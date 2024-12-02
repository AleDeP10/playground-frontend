import hello from './hello_world';

test('Dovrebbe salutare il mondo intero!', async () => {
  const response = await hello();
  expect(response.result).toBe('Hello, World!');
});

test('Dovrebbe salutare Gabri', async () => {
  const response = await hello('Gabri');
  expect(response.result).toBe('Hello, Gabri!');
});
