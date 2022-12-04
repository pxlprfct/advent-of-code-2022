import { getCalorieCount } from "./index.ts";

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

Deno.test("Calorie counting", async () => {
  assertEquals(await getCalorieCount(), 72602);
});
