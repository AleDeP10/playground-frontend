import { fetchData } from "./fetchData.js";

test("Status returned should be OK", async () => {
  console.log(`URL: ${process.env.REACT_APP_SERVER_URL}/fetchData`);
  const response = await fetchData(`${process.env.REACT_APP_SERVER_URL}/fetchData`);
  expect(response).not.toBeNull();
  expect(response.status).toBe("OK");
});
