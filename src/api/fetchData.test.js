import { fetchData } from "./linkedin_snipplet_01.js";
import 'dotenv/config';

test('Status returned should be OK', async () => {
  const response = await fetchData(`${process.env.SERVER_BASE_URL}/fetch_data`);
  expect(response.status).toBe('OK');
});
