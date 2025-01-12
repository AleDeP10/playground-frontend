import { fetchData } from "./fetchData.js";

test("Status returned should be OK", async () => {
  console.log(`URL: ${process.env.REACT_APP_SERVER}/fetchData`);
  const response = await fetchData(`${process.env.REACT_APP_SERVER}/fetchData`);
  expect(response).not.toBeNull();
  expect(response.status).toBe("OK");
});
