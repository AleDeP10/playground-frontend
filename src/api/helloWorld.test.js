import { hello } from "./hello_world.js";
import "dotenv/config";

test("It should greet the entire world!", async () => {
  const response = await hello();
  expect(response.result).toBe("Hello, World!");
});

test("It should greet Gabri", async () => {
  const response = await hello("Gabri");
  expect(response.result).toBe("Hello, Gabri!");
});
