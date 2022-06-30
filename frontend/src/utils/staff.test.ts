import { anyMember } from "./staff";

test("get a default placeholder member", () => {
  expect(anyMember().id).toBe("");
});
