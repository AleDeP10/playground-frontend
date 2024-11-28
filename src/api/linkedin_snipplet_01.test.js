const { fetchData } = require('./linkedin_snipplet_01');

test('dovrebbe rispondere con OK', async () => {
  const response = await fetchData('http://localhost:5000/fetch_data');
  console.log({ response });
  expect(response.status).toBe('OK');
});
