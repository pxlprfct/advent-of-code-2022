import { getRockPaperScissors } from "./index.ts";

import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

Deno.test("Rock Paper Scissors", async () => {
  assertEquals(await getRockPaperScissors(), 11906);
});
