import { hello } from "./helloWorld.js";

test("It should greet the entire world!", async () => {
  const response = await hello();
  expect(response).not.toBeNull();
  expect(response.result).toBe("Hello, World!");
});

test("It should greet Gabri", async () => {
  const response = await hello("Gabri");
  expect(response).not.toBeNull();
  expect(response.result).toBe("Hello, Gabri!");
});
