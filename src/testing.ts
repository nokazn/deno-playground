import { assert } from "../deps.ts";

assert.assert(true);
// assert.assert(false);

assert.assertEquals([1, { a: 1, b: [123] }], [1, { a: 1, b: [123] }]);
assert.assertEquals([1, { a: 1, b: [123] }], [], "invalid");
