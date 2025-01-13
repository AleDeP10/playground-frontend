
import { create, search, update, remove } from './todoList.js';
import { apiClient, setupInterceptors } from '../useApiClientInterceptors.js';

let id;

const sendCredentials = async () => {
  try {
    const response = await apiClient.post(
      `${process.env.REACT_APP_SERVER_URL}/login`,
      { username: process.env.REACT_APP_ADMIN_USERNAME, password: process.env.REACT_APP_ADMIN_PASSWORD }
    );

    if (response.data && response.data.token) {
      localStorage.setItem("token", response.data.token);
    }
  } catch (error) {
    if (error.response) {
      // La richiesta è stata effettuata e il server ha risposto con un codice di stato che non rientra nel range 2xx
      switch (error.response.status) {
        case 401:
          console.error("Invalid username or password");
          break;
        case 500:
        default:
          console.error("Internal Server Error");
      }
    } else if (error.request) {
      // La richiesta è stata effettuata ma non è stata ricevuta nessuna risposta
      console.error("No response received from server");
    } else {
      // Qualcosa è andato storto nella configurazione della richiesta
      console.error("Error in setting up the request");
    }
  }
};

// Configura gli intercettori per l'ambiente di test
setupInterceptors(true);

beforeAll(async () => {
  await sendCredentials();
});

test('It should return a number, equivalent to generated id', async () => {
  const response = await create(apiClient, '### Task of test', 'TODO');
  expect(typeof response.id).toBe('number');
  id = response.id;
});

test('It should return a not empty array', async () => {
  const response = await search(apiClient);
  expect(typeof response).toBe('object');
  expect(response[0] !== undefined).toBe(true);
});

test('It should find the task and update it with success', async () => {
  const response = await update(apiClient, id, '### Updated task', 'IN PROGRESS');
  expect(response.message ? response.message : null).toBe('Task updated successfully');
});

test('It should find the task and delete it successfully', async () => {
  const response = await remove(apiClient, id);
  expect(response.message ? response.message : null).toBe('Task deleted successfully');
});
