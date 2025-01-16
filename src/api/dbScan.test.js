import { dbScan } from "./dbScan.js";

test("It should return 2", async () => {
  const response = await dbScan("SELECT 2");
  expect(response.result).toBe(2);
});

test("It should return a valid date", async () => {
  const response = await dbScan("SELECT NOW()", "datetime");

   expect(response["datetime"]).toBeDefined();

  const date = new Date(response["datetime"]);
  expect(date.toString()).not.toBe("Invalid Date");
});
